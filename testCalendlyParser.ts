import { fetchCalendlyAvailability } from './utils/CalendlyParser';

(async () => {
  const url = 'https://calendly.com/sinaghazi/online-meeting';
  try {
    const slots = await fetchCalendlyAvailability(url);
    console.log('Available slots:', slots);
  } catch (err) {
    console.error('Error fetching slots:', err);
  }
  process.exit(0);
})();
