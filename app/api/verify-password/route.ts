import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkGuestName, updateVisitStats } from '../../../services/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, name } = body;
    const correctPassword = process.env.PASSWORD_TO_ENTER;

    if (!correctPassword) {
      console.error('PASSWORD_TO_ENTER is not set in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Case-insensitive comparison
    if (password && password.trim().toUpperCase() === correctPassword.trim().toUpperCase()) {
      
      // Guest list check
      if (name) {
          const isGuestOnList = await checkGuestName(name);
          if (!isGuestOnList) {
             return NextResponse.json({ error: 'Name not found in guest list. Please check spelling.' }, { status: 401 }); 
          }
      } else {
           return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
      }

      // Set session cookie
      (await cookies()).set('wedding_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      // Persist visit stats to Google Sheets
      await updateVisitStats(name);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
