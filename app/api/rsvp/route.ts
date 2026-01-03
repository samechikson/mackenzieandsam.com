
import { NextResponse } from 'next/server';
import { submitRsvp } from '../../../services/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await submitRsvp(body);

    return NextResponse.json({ success: true, message: 'rsvp submitted successfully' });
  } catch (error: any) {
    console.error('Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}
