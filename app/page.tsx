"use client";
import React, { useState } from 'react';
import CalendarSelector from '../components/CalendarSelector';
import BookingConfirmation from '../components/BookingConfirmation';

// HomePage: Landing page for selecting times and inputting Calendly URL
const HomePage: React.FC = () => {
  const [userSlots, setUserSlots] = useState<string[]>([]);
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [match, setMatch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card-glass w-full max-w-xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center text-textMain tracking-wide" style={{letterSpacing:'0.04em'}}>Calendly Match Booking</h1>
        {/* Calendly URL input */}
        <input
          type="text"
          className="w-full mb-4 p-4 rounded-xl border-none bg-white bg-opacity-60 text-textMain placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-oceanStart"
          placeholder="Paste your Calendly link here"
          value={calendlyUrl}
          onChange={e => setCalendlyUrl(e.target.value)}
        />
        {/* Calendar Selector */}
        <CalendarSelector onChange={setUserSlots} />
        <div className="flex gap-4 mt-4">
          <button
            className="flex-1 py-3 pill-btn bg-buttonBg text-textMain shadow-soft hover:bg-buttonHover active:bg-buttonActive transition disabled:opacity-60 border-none"
            disabled={!calendlyUrl || userSlots.length === 0 || loading}
            onClick={async () => {
              setLoading(true);
              setError('');
              setAvailableSlots([]);
              setMatch(null);
              try {
                const res = await fetch('/api/fetch-availability', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ calendlyUrl }),
                });
                if (!res.ok) throw new Error(await res.text());
                const data = await res.json();
                setAvailableSlots(data.availableSlots || []);
              } catch (err: any) {
                setError(err.message || 'Failed to fetch availability');
              } finally {
                setLoading(false);
              }
            }}
          >
            Fetch Calendly Availability
          </button>
          <button
            className="flex-1 py-3 pill-btn bg-correct text-textMain shadow-soft hover:bg-green-200 active:bg-green-300 transition disabled:opacity-60 border-none"
            disabled={userSlots.length === 0 || availableSlots.length === 0 || loading}
            onClick={async () => {
              setLoading(true);
              setError('');
              setMatch(null);
              try {
                const res = await fetch('/api/find-match', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userSlots, calendlySlots: availableSlots }),
                });
                if (!res.ok) throw new Error(await res.text());
                const data = await res.json();
                setMatch(data.match || null);
              } catch (err: any) {
                setError(err.message || 'Failed to find match');
              } finally {
                setLoading(false);
              }
            }}
          >
            Find Match
          </button>
        </div>
        {/* Show available slots if fetched */}
        {availableSlots.length > 0 && (
          <div className="mt-6">
            <div className="font-semibold mb-2 text-slate-700">Calendly Available Slots:</div>
            <ul className="text-xs text-slate-600 list-disc ml-5">
              {availableSlots.map(slot => (
                <li key={slot}>{new Date(slot).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Booking Confirmation */}
        <BookingConfirmation match={match} calendlyUrl={calendlyUrl} />
        {/* Error & Loading States */}
        {loading && <p className="text-sky-700 mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
      </div>
    </div>
  );
};

export default HomePage;
