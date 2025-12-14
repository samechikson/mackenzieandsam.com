
import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// In a real application, use environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const GOOGLE_SHEET_RESPONSES_ID = process.env.GOOGLE_SHEET_RESPONSES_ID;
const GOOGLE_SHEET_GUEST_LIST_ID = process.env.GOOGLE_SHEET_GUEST_LIST_ID;
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

    await doc.loadInfo();

    const sheetResponses = doc.sheetsById[GOOGLE_SHEET_RESPONSES_ID];
    const sheetGuestList = doc.sheetsById[GOOGLE_SHEET_GUEST_LIST_ID];

    // Fuzzy match check
    if (sheetGuestList) {
        const guestRows = await sheetGuestList.getRows();
        const guestNames = guestRows.map((row: any) => row.get('Names') as string).filter(Boolean);
        const isGuestListed = guestNames.some((guestName) => isFuzzyMatch(name, guestName));

        if (!isGuestListed) {
            return NextResponse.json(
                { error: 'Name not found in guest list. Please check the spelling or contact us.' },
                { status: 400 }
            );
        }
    } else {
        console.warn('Guest list sheet not found. Skipping validation.');
    }

    const rowData = {
      'Name': name,
      'Number of Guests': guests,
      'Dietary restrictions': dietary,
      'Stay at quinta': stayOnsite,
      'Needs transfer': transfer,
      'activities': activities
    };

    await sheetResponses.addRow(rowData);

    return NextResponse.json({ success: true, message: 'rsvp submitted successfully' });
  } catch (error: any) {
    console.error('Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}

function getLevenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function isFuzzyMatch(inputName: string, existingName: string): boolean {
    if (!inputName || !existingName) return false;
    const normalizedInput = inputName.toLowerCase().trim();
    const normalizedExisting = existingName.toLowerCase().trim();
    
    if (normalizedInput === normalizedExisting) return true;
    
    const distance = getLevenshteinDistance(normalizedInput, normalizedExisting);
    const maxLength = Math.max(normalizedInput.length, normalizedExisting.length);
    
    // Strict for short names, looser for long names
    if (maxLength <= 3) return distance === 0;
    return distance <= 3;
}
