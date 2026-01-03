import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const GOOGLE_SHEET_RESPONSES_ID = process.env.GOOGLE_SHEET_RESPONSES_ID;
const GOOGLE_SHEET_GUEST_LIST_ID = process.env.GOOGLE_SHEET_GUEST_LIST_ID;
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
});

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

async function getDoc() {
    if (!SPREADSHEET_ID) {
        throw new Error('GOOGLE_SPREADSHEET_ID is not defined');
    }
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await doc.loadInfo();
    return doc;
}

export async function checkGuestName(name: string): Promise<boolean> {
    const doc = await getDoc();
    
    if (!GOOGLE_SHEET_GUEST_LIST_ID) {
        console.warn('GOOGLE_SHEET_GUEST_LIST_ID is not defined. Skipping validation.');
        return true;
    }

    const sheetGuestList = doc.sheetsById[GOOGLE_SHEET_GUEST_LIST_ID];
    
    if (!sheetGuestList) {
        console.warn('Guest list sheet not found. Skipping validation.');
        return true;
    }

    const guestRows = await sheetGuestList.getRows();
    const guestNames = guestRows.map((row: any) => row.get('Names') as string).filter(Boolean);
    const isGuestListed = guestNames.some((guestName) => isFuzzyMatch(name, guestName));
    
    return isGuestListed;
}

export interface RsvpData {
    name: string;
    email: string;
    phone: string;
    attending: string;
    guests: number;
    guestNames: string[];
    dietary: string;
    stayOnsite: boolean;
    transfer: boolean;
    activities: string;
    welcomeDinner: string;
}

export async function submitRsvp(data: RsvpData): Promise<void> {
    const doc = await getDoc();
    
    if (!GOOGLE_SHEET_RESPONSES_ID) {
        throw new Error('GOOGLE_SHEET_RESPONSES_ID is not defined');
    }

    const sheetResponses = doc.sheetsById[GOOGLE_SHEET_RESPONSES_ID];
    
    if (!sheetResponses) {
         throw new Error('Responses sheet not found');
    }

    const timestamp = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
    const rowData = {
      'Name': data.name,
      'Email': data.email,
      'Phone Number': data.phone,
      'Attending': data.attending,
      'Number of Guests': data.guests,
      'Guest Names': data.guestNames.join(', '),
      'Welcome Dinner': data.welcomeDinner,
      'Dietary restrictions': data.dietary,
      'Stay at quinta': data.stayOnsite,
      'Needs transfer': data.transfer,
      'Activities': data.activities
    };

    const rows = await sheetResponses.getRows();
    const existingRow = rows.find(row => {
        const rowName = row.get('Name');
        return rowName && typeof rowName === 'string' && rowName.toLowerCase() === data.name.toLowerCase();
    });

    if (existingRow) {
      console.log('Guest found in guest list. Updating stats.');
        existingRow.assign({
            ...rowData,
            'Updated': timestamp
        });
        await existingRow.save();
    } else {
        await sheetResponses.addRow({
            ...rowData,
            'Submitted': timestamp,
            'Updated': timestamp
        });
    }
}

export async function updateVisitStats(name: string): Promise<void> {
    const doc = await getDoc();
    
    if (!GOOGLE_SHEET_RESPONSES_ID) {
        throw new Error('GOOGLE_SHEET_RESPONSES_ID is not defined');
    }

    const sheetResponses = doc.sheetsById[GOOGLE_SHEET_RESPONSES_ID];

    if (!sheetResponses) {
        throw new Error('Responses sheet not found');
    }

    const rows = await sheetResponses.getRows();
    const targetRow = rows.find(row => {
        const rowName = row.get('Name');
        return rowName && typeof rowName === 'string' && isFuzzyMatch(name, rowName);
    });

    const formattedDate = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    if (targetRow) {
      console.log('Guest found in guest list. Updating stats.');
      const currentVisits = parseInt(targetRow.get('Visited Times') || '0', 10);
      targetRow.assign({
          'Visited Times': currentVisits + 1,
          'Latest Visit': formattedDate
      });
      await targetRow.save();
    } else {
      console.log('Guest not found in guest list. Adding new guest.');
      await sheetResponses.addRow({
        'Name': name,
        'Visited Times': 1,
        'Latest Visit': formattedDate
      });
    }
}
