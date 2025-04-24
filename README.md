# Calendly Match Booking App — Proof of Concept (POC)

This project is a **POC (Proof of Concept)**, built for a client to demonstrate advanced booking automation and proxy handling with a calming, modern UI. It matches user-selected time slots with a public Calendly link and automates the booking process, with robust proxy rotation and client-side privacy.

---

## ✨ Features & Flow Overview

1. **User Flow**
   - User selects preferred time slots via a custom calendar UI.
   - User enters a public Calendly availability URL.
   - App fetches available slots from Calendly (with proxy rotation for reliability and privacy).
   - App matches user preferences with Calendly's available slots.
   - First matching slot is suggested to the user.
   - User confirms and is redirected to Calendly for booking (with pre-filled details if supported).

2. **Proxy Rotation & Network Layer**
   - Outbound requests to Calendly use a rotating list of public HTTP proxies.
   - Proxy list is automatically fetched and updated at runtime from a reputable public proxy source.
   - If a proxy fails, another is tried (up to 3 attempts per request), with detailed logging for troubleshooting.
   - Fallback to a static proxy list if fetching fails.

3. **Component Structure**
   - `HomePage.tsx`: Landing page for time selection and Calendly URL input.
   - `CalendarSelector.tsx`: Multi-slot calendar picker.
   - `BookingConfirmation.tsx`: Shows matched slot and handles booking redirection.
   - `GlassmorphismPanel.tsx`: Reusable glass-effect UI container.
   - `utils/CalendlyParser.ts`: Handles Calendly URL parsing and slot fetching.
   - `utils/ProxyProvider.ts`: Manages proxy list, rotation, and request retries.
   - `utils/fetchProxies.ts`: Fetches fresh proxies from a public API.

4. **Design & UX**
   - Calming, minimalist UI with glassmorphism, oceanic color palette, and Inter font.
   - Responsive, accessible, and visually appealing.
   - Focus on clarity, ease of use, and smooth transitions.

5. **Security & Privacy**
   - No user data is stored server-side or in a database.
   - All computations and matching are in-memory or client-side.
   - Only public Calendly links are accessed; no scraping beyond intended use.

6. **Extensibility**
   - Modular structure for easy integration of new features (OAuth, batch booking, etc).
   - Proxy logic can be expanded for country filtering or speed checks.
   - Placeholder for Puppeteer-based scraping if needed for advanced scenarios.

---

## 🛠️ Developer Guide

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open the app:**
   [http://localhost:3000](http://localhost:3000)

### Proxy Handling
- Proxy list is fetched automatically on server start from a public source.
- You can manually refresh the proxy list by calling `updateProxyList()` from `ProxyProvider.ts`.
- All outbound requests to Calendly's API are routed through randomly selected proxies for reliability and privacy.
- Logs for proxy selection, failures, and updates are output to the server console.

### Main Modules
- **`utils/CalendlyParser.ts`**: Parses Calendly URLs, fetches slot data, and performs matching logic.
- **`utils/ProxyProvider.ts`**: Handles proxy selection, retry logic, and auto-updating proxy list.
- **`utils/fetchProxies.ts`**: Fetches a fresh proxy list from a public API (plain text, IP:PORT per line).

### UI/UX
- All styling is in `app/globals.css` and Tailwind config.
- Glassmorphism and calming colors are used throughout.
- Accessible, responsive, and minimalist.

### Security & Compliance
- No persistent user data.
- Only public APIs and links are accessed.
- Designed for demonstration and not for production use without further review.

---

## 🚧 Limitations & Next Steps
- This is a POC: not production-hardened, and proxies are public/open (not guaranteed stable).
- Future extensions: OAuth calendar integration, batch booking, country-aware proxy selection.

---

## 📂 File Structure (Key Files)
- `app/` — Next.js app directory (UI, pages)
- `components/` — React UI components
- `utils/` — Proxy logic, Calendly parsing, helpers
- `public/` — Static assets

---

## 🤝 Attribution & License
- Built as a POC for client demonstration purposes only.
- Uses open-source libraries: Next.js, React, Tailwind CSS, node-fetch, https-proxy-agent.
- Proxy list courtesy of [TheSpeedX/PROXY-List](https://github.com/TheSpeedX/PROXY-List).

---

For questions or to discuss productionizing this POC, please contact  [Sina Ghazi](https://www.upwork.com/freelancers/sinaghazi).
