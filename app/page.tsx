import { HeroSection } from '@/components/HeroSection';
import { EnvelopeSection } from '@/components/EnvelopeSection';
import { DetailsSection } from '@/components/DetailsSection';
import { OurStory } from '@/components/OurStory';
import { BasicDetails } from '@/components/BasicDetails';
import { RSVP } from '@/components/RSVP';

export default function Home() {
  return <>
    <HeroSection />
    <EnvelopeSection />
    <OurStory />
    <BasicDetails />
    <RSVP />
  </>;
}
