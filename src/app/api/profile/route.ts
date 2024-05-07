import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const cookieStore = cookies();

  console.log('path', path);

  if (path.startsWith('/profile')) {
    cookieStore.set('profile', 'true');
  } else {
    cookieStore.delete('profile');
  }

  return NextResponse.json({ message: path });
};
