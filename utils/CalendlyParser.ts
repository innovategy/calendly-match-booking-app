import fetch from 'node-fetch';
import { proxyFetch } from './ProxyProvider';

// fetchCalendlyAvailability: Fetches available slots from a Calendly URL using public API endpoints
// Returns array of ISODateTime strings
export async function fetchCalendlyAvailability(calendlyUrl: string): Promise<string[]> {
  // Basic URL validation
  const calendlyRegex = /^https:\/\/(www\.)?calendly\.com\/([^\/]+)\/([^\/]+)/;
  const match = calendlyUrl.match(calendlyRegex);
  if (!match) {
    throw new Error('Invalid Calendly URL');
  }
  const profile_slug = match[2];
  const event_type_slug = match[3];

  // Step 1: Lookup event type and scheduling link UUIDs
  const lookupUrl = `https://calendly.com/api/booking/event_types/lookup?event_type_slug=${event_type_slug}&profile_slug=${profile_slug}`;
  // Use proxyFetch with up to 3 retries for the lookup URL
  const lookupResp = await proxyFetch(lookupUrl, {}, 3);
  if (!lookupResp.ok) {
    throw new Error('Failed to lookup event type: ' + lookupResp.statusText);
  }
  const lookupData = await lookupResp.json();
  const event_type_uuid = lookupData.uuid;
  const scheduling_link_uuid = lookupData.scheduling_link?.uid;
  if (!event_type_uuid || !scheduling_link_uuid) {
    throw new Error('Could not extract event_type_uuid or scheduling_link_uuid');
  }

  // Step 2: Construct range API call
  // Default: 7 day range starting today, user's timezone if available
  const now = new Date();
  const tz = lookupData.availability_timezone || 'UTC';
  const range_start = now.toISOString().slice(0, 10);
  const range_end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const rangeUrl = `https://calendly.com/api/booking/event_types/${event_type_uuid}/calendar/range?timezone=${encodeURIComponent(tz)}&diagnostics=false&range_start=${range_start}&range_end=${range_end}&scheduling_link_uuid=${scheduling_link_uuid}`;
  const rangeResp = await fetch(rangeUrl);
  if (!rangeResp.ok) {
    throw new Error('Failed to fetch availability: ' + rangeResp.statusText);
  }
  const rangeData = await rangeResp.json();

  // Step 3: Extract available slots
  const slots: string[] = [];
  if (Array.isArray(rangeData.days)) {
    for (const day of rangeData.days) {
      if (day.status !== 'available' || !Array.isArray(day.spots)) continue;
      for (const spot of day.spots) {
        if (spot.status === 'available' && spot.start_time) {
          slots.push(spot.start_time);
        }
      }
    }
  }
  return slots;
}