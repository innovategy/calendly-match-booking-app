import React from 'react';

// BookingConfirmation: Displays matched time and triggers booking
// TODO: Implement booking confirmation UI and logic
interface BookingConfirmationProps {
  match: string | null;
  calendlyUrl?: string; // for constructing booking link
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ match, calendlyUrl }) => {
  // Helper to construct booking link
  function buildBookingUrl(baseUrl: string, slot: string) {
    // baseUrl: https://calendly.com/user/type
    // slot: ISO string (with timezone)
    const dt = new Date(slot);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    const monthStr = `${yyyy}-${mm}`;
    const dateStr = `${yyyy}-${mm}-${dd}`;
    // Use the original ISO string for the slot path
    return `${baseUrl}/${slot}?back=1&month=${monthStr}&date=${dateStr}`;
  }

  if (!match) {
    return (
      <div className="card-glass mt-6">
        <p className="text-textMain">No matching slot found.</p>
      </div>
    );
  }

  // Fallback Calendly URL if not provided
  const baseUrl = calendlyUrl?.replace(/\/?$/, '').split('?')[0] || '';
  const bookingUrl = buildBookingUrl(baseUrl, match);

  return (
    <div className="card-glass mt-6">
      <h2 className="text-xl font-semibold text-textMain mb-2 tracking-wide">Matched Slot</h2>
      <p className="mb-4 text-textMain">{new Date(match).toLocaleString()}</p>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pill-btn bg-buttonBg text-textMain px-6 py-2 shadow-soft hover:bg-buttonHover active:bg-buttonActive"
      >
        Book
      </a>
      <div className="mt-2 text-xs text-gray-400 break-all">{bookingUrl}</div>
    </div>
  );
};

export default BookingConfirmation;
