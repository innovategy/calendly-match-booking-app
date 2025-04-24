import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-oceanStart to-oceanEnd font-sans animate-ripple">
          {/* Top indicator placeholder (e.g., step count) */}
          <div className="w-full flex justify-center mt-4 mb-2">
            {/* Example: <span className="text-xs text-gray-500">1/4</span> */}
          </div>
          <main className="w-full max-w-2xl px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
