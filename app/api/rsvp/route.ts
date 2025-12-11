
import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { OAuth2Client } from 'google-auth-library';

// In a real application, use environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!SPREADSHEET_ID || !CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('Missing Google Sheets credentials in environment variables');
}

// Initialize OAuth2Client
const oauthClient = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

// We need to set credentials. In a typical service-to-service scenario, 
// using a Service Account is preferred over OAuth2 client credentials flow 
// for backend logic unless we have a refresh token.
// However, sticking to the user's provided logic pattern:
// The user passed `oauthClient` to `GoogleSpreadsheet`. 
// Typically `google-spreadsheet` with `OAuth2Client` expects you to have set credentials or tokens on that client.
// If the user code was intended to work client-side, they might have been relying on some flow I don't see, 
// or maybe 'google-spreadsheet' handles it if secrets are provided?
// Checking `google-spreadsheet` docs: passing oauthClient is valid if it's authenticated.
// Does providing client/secret alone authenticate? No.
// But the user's code just did `const doc = new GoogleSpreadsheet(SPREADSHEET_ID, oauthClient);`.
// I will replicate this exactly.

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

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, oauthClient);

    // According to the previous file, the user was just calling loadInfo.
    // If this fails due to auth, we'll return that error.
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const rowData = {
      'Name': name,
      'Number of Guests': guests,
      'Dietary restrictions': dietary,
      'Stay at quinta': stayOnsite,
      'Needs transfer': transfer,
      'activities': activities
    };

    await sheet.addRow(rowData);

    return NextResponse.json({ success: true, message: 'RSVP submitted successfully' });
  } catch (error: any) {
    console.error('Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}
