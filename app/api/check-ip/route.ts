import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip');

    if (!ip) {
      return NextResponse.json({ isRussianIP: false });
    }

    // Используем ipapi.co для определения страны по IP
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    return NextResponse.json({
      isRussianIP: data.country_code === 'RU'
    });
  } catch (error) {
    console.error('Error checking IP:', error);
    return NextResponse.json({ isRussianIP: false });
  }
} 