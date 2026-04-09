# Ruta Brava - ATV Rentals & Guided Tours Website

A premium Next.js booking website for ATV rentals and guided adventure tours in Santa Teresa and Mal País, Costa Rica.

## Project Overview

Ruta Brava offers:
- **ATV Rentals**: Flexible self-guided ATV rentals (4 hours to 1 week)
- **Guided ATV Tours**: Expert-led tours including sunset, waterfall, and peninsula experiences
- **Coming Soon**: Luxury shuttles and luxury vehicle rentals

## Tech Stack

- **Frontend**: Next.js 15+ with React
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
- **Deployment Ready**: Vercel-friendly configuration

## Prerequisites

Before running this project, ensure you have:
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or yarn, pnpm, bun)

### Install Node.js

If you don't have Node.js installed:
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Follow the installation wizard
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Images

Place your Ruta Brava images in the `public/images/` directory:

Required images:
- `ruta-brava-atv-river-action.jpg`
- `ruta-brava-atv-water-splash.jpg`
- `ruta-brava-atv-group-river.jpg`
- `ruta-brava-atv-road-tour.jpg`
- `ruta-brava-atv-jungle-trail.jpg`
- `ruta-brava-happy-rider-closeup.jpg`
- `ruta-brava-happy-rider-2.jpg`
- `ruta-brava-atv-beach.jpg`
- `ruta-brava-ocean-view-experience.jpg`
- `ruta-brava-sunset-tour.jpg`
- `ruta-brava-brand-flag.jpg`
- `ruta-brava-group-lifestyle.jpg`

### 3. Run Development Server

```bash
npm run dev
```

The website will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ruta-brava-website/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Main website page
│   └── globals.css        # Global styles with Tailwind
├── public/
│   └── images/            # Hero slides and gallery images
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── .eslintrc.json         # ESLint rules
```

## Features

### Booking Engine
- Real-time ATV availability checking
- Live slot inventory (6 Honda TRX420 4x4 ATVs)
- Booking request form with validation
- Admin dashboard preview for booking requests
- Status tracking (Pending, Confirmed, Cancelled)

### Gallery
- Tabbed gallery (Photos/Videos)
- Responsive grid layout
- Lazy-loaded images
- Video support (placeholder ready)

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Works seamlessly on all screen sizes
- Optimized for hotel partner inquiries

### Backend Integration Ready
- Email booking requests via mailto links
- WhatsApp direct booking links
- Email notification setup (recommended: Supabase + Outlook)
- Payment tracking structure (recommended: Stripe/PayPal)

## Recommended Backend Setup

For production, Ruta Brava should integrate:

### Database & Backend
- **Supabase** (recommended)
  - PostgreSQL database for real inventory control
  - Built-in authentication for admin panel
  - Real-time updates for booking status
  - Scales well for future luxury services

### Infrastructure
- **Admin Dashboard**: Protected views in the same Next.js app
- **Email Notifications**: Supabase + Outlook automation
- **Payment Processing**: Stripe or PayPal integration
- **Calendar Blocking**: Real-time ATV unit assignment

### Environmental Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables
5. Deploy!

### Environment Setup for Production

Ensure the following are configured:
- Image domains in `next.config.js`
- API endpoints for booking submissions
- Email service credentials
- Payment processor API keys

## Booking Form States

The form handles the following submission states:

- **idle**: Default state
- **submitted**: Booking request successfully added to dashboard
- **missing**: Required fields (name, phone, date, time) incomplete
- **soldOut**: Selected time slot has no available ATVs

## Gallery Section

The gallery is ready for:
- Real tour photos (recommended: 12+ high-quality images)
- Tour videos (embed-ready format)
- Lazy loading for performance
- Responsive grid (1-4 columns based on screen size)

## Content Updates

### Pricing
Update in `app/page.js`:
- `rentalPrices` array
- `tourPrices` array

### Services
Update in `app/page.js`:
- `services` array

### Policies
Update in `app/page.js`:
- `policies` array

### Contact Info
Update in footer section:
- WhatsApp link
- Email address
- Instagram handle
- Location

## Performance Optimization

The website includes:
- Image lazy loading in gallery
- Eager loading for hero slides
- Optimized Tailwind CSS (unused styles removed in production)
- Responsive design with minimal breakpoints
- ESLint configuration for code quality

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Customization

### Colors
Primary colors are in `tailwind.config.js`:
- Amber: `#fbbf24` and `#fcd34d` (brand accent)
- Stone: `#0c0a09` (dark background)
- White: With transparency layers for depth

### Fonts
Using system fonts for optimization:
- `-apple-system`
- `BlinkMacSystemFont`
- `Segoe UI`
- `Roboto`

## SEO

The website includes:
- Meta title and description in `layout.js`
- Proper heading hierarchy
- Semantic HTML structure
- Image alt texts

## Future Enhancements

Planned features in the roadmap:
1. Admin dashboard with Supabase Auth
2. Real-time booking confirmations
3. Payment integration (Stripe/PayPal)
4. Automated email notifications
5. Calendar blocking system
6. Luxury shuttle service booking
7. Luxury vehicle rental management

## Support & Contact

For Ruta Brava:
- **WhatsApp**: +506 8389 8404
- **Email**: info@rutabravagroup.com
- **Instagram**: @rutabrava.cr
- **Location**: Santa Teresa & Mal País, Costa Rica

## License

This project is proprietary to Ruta Brava Group. All rights reserved.

---

**Last Updated**: April 2026
**Version**: 1.0.0
