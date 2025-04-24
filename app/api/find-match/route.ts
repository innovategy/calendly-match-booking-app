import { NextRequest, NextResponse } from 'next/server';
import { findFirstMatch } from '../../../logic/MatchFinder';

// POST /api/find-match
// Body: { userSlots: string[], calendlySlots: string[] }
// Response: { match: string | null }
export async function POST(req: NextRequest) {
  try {
    const { userSlots, calendlySlots } = await req.json();
    if (!Array.isArray(userSlots) || !Array.isArray(calendlySlots)) {
      return NextResponse.json({ error: 'Invalid input arrays' }, { status: 400 });
    }
    const match = findFirstMatch(userSlots, calendlySlots);
    return NextResponse.json({ match });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to find match' }, { status: 500 });
  }
}
