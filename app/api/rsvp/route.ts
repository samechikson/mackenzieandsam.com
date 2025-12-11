
import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// In a real application, use environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SCOPES = [
'https://www.googleapis.com/auth/spreadsheets',
'https://www.googleapis.com/auth/drive.file',
];

export async function POST(request: Request) {

  const jwt = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });

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

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);

    console.log(doc);
    // According to the previous file, the user was just calling loadInfo.
    // If this fails due to auth, we'll return that error.
    await doc.loadInfo();

    const sheet = doc.sheetsById[GOOGLE_SHEET_ID];

    const rowData = {
      'Name': name,
      'Number of Guests': guests,
      'Dietary restrictions': dietary,
      'Stay at quinta': stayOnsite,
      'Needs transfer': transfer,
      'activities': activities
    };

    await sheet.addRow(rowData);

    return NextResponse.json({ success: true, message: 'rsvp submitted successfully' });
  } catch (error: any) {
    console.error('Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}
