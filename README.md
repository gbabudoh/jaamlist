# Jaamlist - Live Streaming Platform

Jaamlist is a modern live streaming platform that connects performers with global audiences. Stream concerts, interviews, stage dramas, and comedy shows to viewers worldwide.

## Features

- **Live Streaming** - HD quality streaming with ultra-low latency
- **Global Reach** - Stream to 150+ countries via global CDN
- **Multiple Event Types** - Concerts, Interviews, Stage Dramas, Comedy Shows
- **Monetization** - Paid per-viewer streams and sponsored events
- **Country-based Discovery** - Find events by country
- **Real-time Analytics** - Track viewers and engagement

## Revenue Model

Jaamlist is free to use for creators. We earn when you earn:

- **Paid Live Streams** - Set your ticket price, keep 85% of revenue
- **Sponsored Streams** - Partner with brands for additional income
- **Free Streams** - $150 per event to offer free viewer access

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gbabudoh/jaamlist.git

# Navigate to project directory
cd jaamlist

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
jaamlist/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── events/            # Events listing page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── stream/            # Stream/Creator page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── footer.tsx        # Footer component
│   └── navbar.tsx        # Navigation component
├── lib/                  # Utility functions
├── prisma/               # Database schema
└── public/               # Static assets
```

## Pages

- **/** - Homepage with hero, features, and call-to-actions
- **/events** - Browse live events with country/category filters
- **/stream** - Creator page with streaming features and revenue info
- **/about** - About page with company mission and values
- **/login** - User login
- **/signup** - User registration

## Brand Colors

- Primary Yellow: `#f7e774`
- Dark Gray: `#2d2d2a`
- Accent: `#d4a500`

## License

MIT License

## Contact

For support, email support@jaamlist.com
