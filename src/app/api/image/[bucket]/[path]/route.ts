import { env } from '@/libs/env';
import { imagePath } from '@/libs/utils/image/get';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { bucket: string; path: string } },
) => {
  try {
    const { bucket, path } = params;

    const image = await fetch(imagePath(`${bucket}/${path}`));

    const headers = new Headers();

    headers.set('Content-Type', 'image/*');

    return new NextResponse(await image.body, {
      status: image.status,
      statusText: image.statusText,
      headers: image.headers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.response?.data }, { status: 400 });
  }
};
