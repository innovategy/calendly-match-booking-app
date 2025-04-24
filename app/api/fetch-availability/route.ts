import { NextRequest, NextResponse } from 'next/server';
import { fetchCalendlyAvailability } from '../../../utils/CalendlyParser';

// POST /api/fetch-availability
// Body: { calendlyUrl: string }
// Response: { availableSlots: string[] }
export async function POST(req: NextRequest) {
  try {
    const { calendlyUrl } = await req.json();
    if (!calendlyUrl || typeof calendlyUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid Calendly URL' }, { status: 400 });
    }
    const availableSlots = await fetchCalendlyAvailability(calendlyUrl);
    return NextResponse.json({ availableSlots });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch availability' }, { status: 500 });
  }
}
