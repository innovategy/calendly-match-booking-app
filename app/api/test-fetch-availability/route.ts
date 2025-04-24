import { NextRequest, NextResponse } from 'next/server';
import { fetchCalendlyAvailability } from '../../../utils/CalendlyParser';

// GET /api/test-fetch-availability?url=<calendly_url>
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url') || 'https://calendly.com/sinaghazi/online-meeting';
  try {
    const slots = await fetchCalendlyAvailability(url);
    return NextResponse.json({ slots });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
