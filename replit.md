# Todd Brannon Music

## Overview
A personal website for Todd Brannon Music — showcasing music, live performances, services, and guitar lesson inquiry functionality.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS (port 5000)
- **Backend**: Express.js API server (port 3001), proxied through Vite's dev server
- **Email**: Resend SDK for sending inquiry notification emails

## Project Structure
- `src/App.tsx` — Main single-page application with hero, about, featured work, services, and contact sections. Includes a lesson inquiry modal that appears 3 seconds after page load.
- `src/InquiryForm.tsx` — Standalone inquiry form component with dark/gold aesthetic, toggle groups, and submission handling.
- `src/PrivacyPolicy.tsx` — Privacy policy page with site-consistent dark styling.
- `src/index.css` — Tailwind base styles and custom animations.
- `server.js` — Express API server with `/api/inquire` POST endpoint that sends formatted emails via Resend.
- `vite.config.ts` — Vite config with proxy to backend API on port 3001.

## Workflows
- **Start application** (`npm run dev`) — Vite dev server on port 5000
- **API Server** (`node server.js`) — Express API on port 3001

## Environment Variables
- `RESEND_API_KEY` — API key for Resend email service
- `CONTACT_EMAIL` — Recipient email for lesson inquiries

## Key Features
- Hero section with live performance imagery
- Music catalog with streaming platform links
- YouTube video integration (live performances and shorts)
- Lesson inquiry modal with 3-second delayed appearance
- Inquiry form with toggle groups and email notification via Resend
- Privacy policy page accessible from footer link
