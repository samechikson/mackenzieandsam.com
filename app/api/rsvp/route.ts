
import { NextResponse } from 'next/server';
import { checkGuestName, submitRsvp } from '../../../services/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      guests, 
      dietary, 
      stayOnsite, 
      transfer, 
      activities 
    } = body;

    // Fuzzy match check
    const isGuestListed = await checkGuestName(name);

    if (!isGuestListed) {
        return NextResponse.json(
            { error: 'Name not found in guest list. Please check the spelling or contact us.' },
            { status: 400 }
        );
    }

    await submitRsvp({
      name,
      guests,
      dietary,
      stayOnsite,
      transfer,
      activities
    });

    return NextResponse.json({ success: true, message: 'rsvp submitted successfully' });
  } catch (error: any) {
    console.error('Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}
