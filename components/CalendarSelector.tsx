import React, { useState } from 'react';

// Helper to get days in month
function getDaysInMonth(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Example time slots per day (customize as needed)
const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00',
];

export interface CalendarSelectorProps {
  onChange?: (selectedSlots: string[]) => void;
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({ onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [activeDay, setActiveDay] = useState<Date | null>(null);

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  // Change month
  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setActiveDay(null);
  };

  // Select/deselect slot
  const toggleSlot = (date: Date, time: string) => {
    const iso = new Date(date.getFullYear(), date.getMonth(), date.getDate(), +time.split(":")[0], +time.split(":")[1]).toISOString();
    setSelectedSlots(prev => {
      const exists = prev.includes(iso);
      const updated = exists ? prev.filter(s => s !== iso) : [...prev, iso];
      // Only call onChange after state update, not inside updater
      setTimeout(() => onChange?.(updated), 0);
      return updated;
    });
  };

  // Render
  return (
    <div className="card-glass w-full mb-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="pill-btn bg-buttonBg text-textMain px-3 py-1 hover:bg-buttonHover active:bg-buttonActive">&#8592;</button>
        <span className="font-semibold text-lg text-textMain tracking-wide">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => changeMonth(1)} className="pill-btn bg-buttonBg text-textMain px-3 py-1 hover:bg-buttonHover active:bg-buttonActive">&#8594;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="text-xs text-gray-500 text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array(days[0].getDay()).fill(null).map((_, i) => <div key={i}></div>)}
        {days.map(day => (
          <button
            key={day.toISOString()}
            className={`pill-btn text-sm px-0.5 py-2 font-medium transition ${activeDay?.toDateString() === day.toDateString() ? 'bg-buttonBg text-textMain' : 'hover:bg-buttonHover active:bg-buttonActive'} ${selectedSlots.some(slot => slot.startsWith(day.toISOString().slice(0,10))) ? 'ring-2 ring-correct' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
      {activeDay && (
        <div className="mt-4">
          <div className="font-semibold mb-2">Select time slots for {activeDay.toLocaleDateString()}</div>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map(time => {
              const iso = new Date(activeDay.getFullYear(), activeDay.getMonth(), activeDay.getDate(), +time.split(":")[0], +time.split(":")[1]).toISOString();
              const selected = selectedSlots.includes(iso);
              return (
                <button
                  key={time}
                  className={`pill-btn px-3 py-1 font-medium transition ${selected ? 'bg-correct text-textMain' : 'bg-glass text-textMain hover:bg-buttonHover active:bg-buttonActive'}`}
                  onClick={() => toggleSlot(activeDay, time)}
                  type="button"
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {selectedSlots.length > 0 && (
        <div className="mt-4 text-xs text-gray-500">
          Selected slots:
          <ul className="list-disc ml-5">
            {selectedSlots.map(slot => (
              <li key={slot}>{new Date(slot).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarSelector;
