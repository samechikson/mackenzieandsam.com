'use client';

import React, { useState } from 'react';
import { AsYouType } from 'libphonenumber-js';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const ACTIVITIES = [
  { id: 'foodTour', label: 'Lisbon Food Tour' },
  { id: 'beachDay', label: 'Cascais Beach Day' },
  { id: 'golf', label: 'Oitavos Dunes Golf' },
  { id: 'sintraTour', label: 'Sintra Castle Tour' },
  { id: 'timeoutMarket', label: 'Time Out Market' },
];

const activitySchema = z.object({
  foodTour: z.boolean(),
  beachDay: z.boolean(),
  golf: z.boolean(),
  sintraTour: z.boolean(),
  timeoutMarket: z.boolean(),
});

const baseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

const attendingYesSchema = baseSchema.extend({
  attending: z.literal('yes'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  guests: z.number().min(1),
  additionalGuests: z.array(z.object({
    name: z.string(),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional(),
    dietary: z.string().optional()
  })),
  dietary: z.string().optional(),
  stayOnsite: z.enum(['yes', 'no'] as const),
  transfer: z.enum(['yes', 'no'] as const).optional(),
  activities: activitySchema,
  welcomeDinner: z.enum(['yes', 'no'] as const),
}).superRefine((data, ctx) => {
  // Validate additional guests if count > 1
  if (data.guests > 1) {
    data.additionalGuests.forEach((guest, index) => {
      if (!guest.name || guest.name.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Guest name is required',
          path: ['additionalGuests', index, 'name'],
        });
      }
    });
  }
});

const attendingNoSchema = baseSchema.extend({
  attending: z.literal('no'),
  email: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  guests: z.number().optional(),
  additionalGuests: z.array(z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    dietary: z.string().optional()
  })).optional(),
  dietary: z.string().optional(),
  stayOnsite: z.enum(['yes', 'no'] as const).optional(),
  transfer: z.enum(['yes', 'no'] as const).optional(),
  activities: activitySchema.optional(),
  welcomeDinner: z.enum(['yes', 'no'] as const).optional(),
});

const rsvpSchema = z.discriminatedUnion('attending', [attendingYesSchema, attendingNoSchema]);

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export const RSVP: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      attending: undefined,
      guests: 1,
      additionalGuests: [],
      dietary: '',
      stayOnsite: undefined,
      transfer: undefined,
      activities: {
        foodTour: false,
        beachDay: false,
        golf: false,
        sintraTour: false,
        timeoutMarket: false,
      },
      welcomeDinner: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalGuests',
  });

  // Watch values for conditional rendering
  const attending = watch('attending');
  const guests = watch('guests');
  const stayOnsite = watch('stayOnsite');

  React.useEffect(() => {
    const savedName = localStorage.getItem('guestName');
    if (savedName) {
      setValue('name', savedName);
    }
  }, [setValue]);

  // Sync additional guests array with number input
  React.useEffect(() => {
    const currentCount = fields.length + 1;
    const targetCount = guests || 1;

    if (targetCount > currentCount) {
      const toAdd = targetCount - currentCount;
      for (let i = 0; i < toAdd; i++) {
        append({ name: '', email: '', phone: '', dietary: '' });
      }
    } else if (targetCount < currentCount) {
      const toRemove = currentCount - targetCount;
      // Remove from the end
      for (let i = 0; i < toRemove; i++) {
        remove(fields.length - 1 - i);
      }
    }
  }, [guests, fields.length, append, remove]);

  const onSubmit = async (data: RsvpFormValues) => {
    setSubmitError(null);
    try {
      const formatActivities = () => {
        const activityLabels: Record<string, string> = ACTIVITIES.reduce((acc, activity) => {
          acc[activity.id] = activity.label;
          return acc;
        }, {} as Record<string, string>);

        return Object.entries(data.activities)
          .filter(([key, isSelected]) => isSelected)
          .map(([key]) => activityLabels[key] || key)
          .join(', ');
      };

      const submitToGoogleSheets = async (name: string, phone: string, email: string, dietary: string) => {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            attending: data.attending,
            dietary: dietary,
            stayOnsite: data.attending === 'yes' ? data.stayOnsite : '',
            transfer: data.attending === 'yes' ? data.transfer : '',
            activities: data.attending === 'yes' ? formatActivities() : '',
            welcomeDinner: data.attending === 'yes' ? data.welcomeDinner : '',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit RSVP');
        }
      };

      // 1. Submit for the main guest
      await submitToGoogleSheets(
        data.name,
        data.phone,
        data.email,
        data.attending === 'yes' ? (data.dietary || '') : ''
      );

      // 2. Submit for additional guests
      if (data.attending === 'yes' && data.additionalGuests.length > 0) {
        const additionalGuestSubmissions = data.additionalGuests
          .map((guest) => {
            if (guest.name && guest.name.trim() !== '') {
              return submitToGoogleSheets(
                guest.name,
                guest.phone || '',
                guest.email || '',
                guest.dietary || ''
              );
            }
            return null;
          })
          .filter((submission): submission is Promise<void> => submission !== null);

        if (additionalGuestSubmissions.length > 0) {
          await Promise.all(additionalGuestSubmissions);
        }
      }

      console.log('Form Submitted', data);
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong submitting your RSVP. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-wedding-paper p-8 md:p-12 shadow-2xl rounded-sm transform rotate-1 text-center"
        >
          <h1 className="font-script text-5xl md:text-6xl text-wedding-green mb-8 lowercase">Thank You!</h1>
          <p className="font-mono text-wedding-brown text-lg">
            We've received your RSVP. {watch('attending') === 'yes' ? 'We can\'t wait to see you in Portugal! If you need to change anything about your RSVP, please re-submit this form or contact us.' : 'Thank you for letting us know - you will be missed!'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="absolute -top-13 right-6">
          <Image src="/images/otis-head.png" alt="Otis" width={60} height={60} />
        </div>
        <div className="bg-wedding-paper shadow-2xl px-8 pb-8 rounded-sm relative lg:-rotate-1 border border-wedding-green/10">
          <div className="text-center mb-10">
            <h1 className="font-script text-7xl md:text-9xl mb-12 text-wedding-green lowercase">RSVP</h1>
            <p className="font-mono text-wedding-brown text-lg font-light tracking-wide">
              Please let us know if you can make it by <span className="font-bold">12/1/2026</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-mono text-wedding-brown">

            {submitError && (
              <div className="bg-red-50 text-red-800 p-4 rounded text-center border border-red-200">
                {submitError}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                placeholder="Jane Doe"
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Attending */}
            <div className="space-y-3">
              <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                Will you be attending?
              </p>
              <Controller
                name="attending"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'yes' ? 'border-wedding-green' : ''}`}>
                        {field.value === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                      </div>
                      <input
                        type="radio"
                        {...field}
                        value="yes"
                        checked={field.value === 'yes'}
                        className="hidden"
                      />
                      <span className="group-hover:text-wedding-green transition-colors">Joyfully Accept</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'no' ? 'border-wedding-green' : ''}`}>
                        {field.value === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                      </div>
                      <input
                        type="radio"
                        {...field}
                        value="no"
                        checked={field.value === 'no'}
                        className="hidden"
                      />
                      <span className="group-hover:text-wedding-green transition-colors">Regretfully Decline</span>
                    </label>
                  </div>
                )}
              />
              {errors.attending && <p className="text-red-500 text-sm">{errors.attending.message}</p>}
            </div>

            <motion.div
              initial={false}
              animate={{
                height: attending === 'yes' ? 'auto' : 0,
                opacity: attending === 'yes' ? 1 : 0,
                overflow: 'visible'
              }}
              style={{ overflow: 'hidden' }}
              className="space-y-8"
            >
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                  placeholder="jane@example.com"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Phone Number <span className="block normal-case font-normal text-xs mt-1">For wedding event updates</span>
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                      placeholder="+1 (555) 123-4567"
                      onChange={(e) => {
                        const formatted = new AsYouType().input(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              {/* Guests */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="guests" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                    Number of Guests in Your Party
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg"
                    {...register('guests', { valueAsNumber: true })}
                  />
                  {errors.guests && <p className="text-red-500 text-sm">{errors.guests.message}</p>}
                </div>

                {fields.length > 0 && (
                  <div className="space-y-4 pl-4 border-l-2 border-wedding-green/20">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-4 pt-4 border-t border-wedding-brown/10 first:border-0 first:pt-0"
                      >
                        <div className="space-y-2">
                          <label htmlFor={`guest-name-${index}`} className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                            Guest {index + 2} Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                            placeholder="Full Name"
                            {...register(`additionalGuests.${index}.name`)}
                          />
                          {errors.additionalGuests?.[index]?.name && <p className="text-red-500 text-sm">{errors.additionalGuests[index]?.name?.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor={`guest-email-${index}`} className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                            Guest {index + 2} Email Address <span className="block normal-case font-normal text-xs mt-1">Optional</span>
                          </label>
                          <input
                            type="email"
                            className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                            placeholder="jane@example.com"
                            {...register(`additionalGuests.${index}.email`)}
                          />
                          {errors.additionalGuests?.[index]?.email && <p className="text-red-500 text-sm">{errors.additionalGuests[index]?.email?.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor={`guest-phone-${index}`} className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                            Guest {index + 2} Phone Number <span className="block normal-case font-normal text-xs mt-1">Optional</span>
                          </label>
                          <Controller
                            control={control}
                            name={`additionalGuests.${index}.phone`}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="tel"
                                className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                                placeholder="+1 (555) 123-4567"
                                onChange={(e) => {
                                  const formatted = new AsYouType().input(e.target.value);
                                  field.onChange(formatted);
                                }}
                              />
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor={`guest-dietary-${index}`} className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                            Guest {index + 2} Dietary Restrictions <span className="block normal-case font-normal text-xs mt-1">Optional</span>
                          </label>
                          <textarea
                            rows={1}
                            className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30 resize-none"
                            placeholder="Allergies, vegetarian, etc."
                            {...register(`additionalGuests.${index}.dietary`)}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Welcome Dinner */}
              <div className="space-y-3">
                <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Will you be attending the welcome dinner on May 5th?
                </p>
                <Controller
                  control={control}
                  name="welcomeDinner"
                  render={({ field }) => (
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'yes' ? 'border-wedding-green' : ''}`}>
                          {field.value === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          {...field}
                          value="yes"
                          checked={field.value === 'yes'}
                          className="hidden"
                        />
                        <span className="group-hover:text-wedding-green transition-colors">Yes, I'll be there!</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'no' ? 'border-wedding-green' : ''}`}>
                          {field.value === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          {...field}
                          value="no"
                          checked={field.value === 'no'}
                          className="hidden"
                        />
                        <span className="group-hover:text-wedding-green transition-colors">No, I can't make it</span>
                      </label>
                    </div>
                  )}
                />
                {errors.welcomeDinner && <p className="text-red-500 text-sm">{errors.welcomeDinner.message}</p>}
              </div>

              {/* Dietary */}
              <div className="space-y-2">
                <label htmlFor="dietary" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Dietary Restrictions <span className="block normal-case font-normal text-xs mt-1">For yourself</span>
                </label>
                <textarea
                  id="dietary"
                  rows={2}
                  className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30 resize-none"
                  placeholder="Allergies, vegetarian, vegan, etc."
                  {...register('dietary')}
                />
                {errors.dietary && <p className="text-red-500 text-sm">{errors.dietary.message}</p>}
              </div>

              {/* Stay Onsite */}
              <div className="space-y-3">
                <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Would you like to stay onsite at Quinta da Bichinha? <span className="normal-case font-normal text-xs block mt-1">Space permitting</span>
                </p>
                <Controller
                  control={control}
                  name="stayOnsite"
                  render={({ field }) => (
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'yes' ? 'border-wedding-green' : ''}`}>
                          {field.value === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          {...field}
                          value="yes"
                          checked={field.value === 'yes'}
                          className="hidden"
                        />
                        <span className="group-hover:text-wedding-green transition-colors">Yes, please!</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'no' ? 'border-wedding-green' : ''}`}>
                          {field.value === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          {...field}
                          value="no"
                          checked={field.value === 'no'}
                          className="hidden"
                        />
                        <span className="group-hover:text-wedding-green transition-colors">No, I'll stay elsewhere</span>
                      </label>
                    </div>
                  )}
                />
                {errors.stayOnsite && <p className="text-red-500 text-sm">{errors.stayOnsite.message}</p>}
              </div>

              {/* Transfer - Conditional */}
              {stayOnsite === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 bg-wedding-green/5 p-4 rounded-md"
                >
                  <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                    Do you need a transfer from Lisbon to the venue?
                  </p>
                  <Controller
                    control={control}
                    name="transfer"
                    render={({ field }) => (
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'yes' ? 'border-wedding-green' : ''}`}>
                            {field.value === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                          </div>
                          <input
                            type="radio"
                            {...field}
                            value="yes"
                            checked={field.value === 'yes'}
                            className="hidden"
                          />
                          <span className="group-hover:text-wedding-green transition-colors">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${field.value === 'no' ? 'border-wedding-green' : ''}`}>
                            {field.value === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                          </div>
                          <input
                            type="radio"
                            {...field}
                            value="no"
                            checked={field.value === 'no'}
                            className="hidden"
                          />
                          <span className="group-hover:text-wedding-green transition-colors">No</span>
                        </label>
                      </div>
                    )}
                  />
                </motion.div>
              )}

              {/* Activities */}
              <div className="space-y-4">
                <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Interested Activities before the wedding <span className="block normal-case font-normal text-xs mt-1">Informal gatherings the few days before the wedding. Check all that you are interested in, and we will send more details as the date approaches.</span>
                </p>

                <div className="grid md:grid-cols-1 gap-3">
                  {ACTIVITIES.map((activity) => (
                    <Controller
                      key={activity.id}
                      control={control}
                      name={`activities.${activity.id}` as any}
                      render={({ field: { value, onChange, ...field } }) => (
                        <label className="flex items-start gap-3 cursor-pointer group hover:bg-wedding-green/5 p-2 rounded transition-colors -ml-2">
                          <div className={`mt-1 w-5 h-5 border border-wedding-brown flex items-center justify-center shrink-0 transition-colors ${value ? 'bg-wedding-green border-wedding-green' : 'bg-white'}`}>
                            {value && (
                              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                            className="hidden"
                            {...field}
                          />
                          <span className="text-wedding-brown group-hover:text-wedding-green transition-colors leading-snug">{activity.label}</span>
                        </label>
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Submit */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-wedding-green text-white font-mono uppercase tracking-widest text-sm font-bold py-4 px-12 rounded-full hover:bg-wedding-brown transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Response'}
              </button>
            </div>

          </form>
        </div>
      </motion.div >
    </div >
  );
};
