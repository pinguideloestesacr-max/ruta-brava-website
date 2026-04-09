# Ruta Brava Website - Development Instructions

## Project Status: Setup Complete ✓

This Next.js project for Ruta Brava is fully scaffolded and ready for development.

## Quick Start

### 1. Install Node.js (if needed)
- Download from [nodejs.org](https://nodejs.org/) - get the LTS version
- Verify installation: `node --version`

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Visit http://localhost:3000 in your browser

## Project Structure

- `app/` - Next.js app directory with layout and main page
- `public/images/` - Hero slides and gallery images (add your images here)
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Dependencies and NPM scripts

## Key Features Implemented

✓ Booking Engine with real-time inventory checking
✓ Responsive hero slider (auto-rotates every 4 seconds)
✓ Pricing displays (rentals and guided tours)
✓ Gallery with photo/video tabs
✓ Hotel partnerships section
✓ Admin dashboard preview
✓ Backend blueprint and platform recommendations
✓ Contact section with WhatsApp and email integration

## Next Steps

### Images Setup
Add 12 hero slide images to `public/images/`:
- ruta-brava-atv-river-action.jpg
- ruta-brava-atv-water-splash.jpg
- ruta-brava-atv-group-river.jpg
- ruta-brava-atv-road-tour.jpg
- ruta-brava-atv-jungle-trail.jpg
- ruta-brava-happy-rider-closeup.jpg
- ruta-brava-happy-rider-2.jpg
- ruta-brava-atv-beach.jpg
- ruta-brava-ocean-view-experience.jpg
- ruta-brava-sunset-tour.jpg
- ruta-brava-brand-flag.jpg
- ruta-brava-group-lifestyle.jpg

### Backend Integration
When ready for production:
1. Set up Supabase PostgreSQL database
2. Create admin authentication
3. Integrate booking form with API
4. Set up email notifications
5. Add payment processing

## Building for Production

```bash
npm run build
npm start
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

Edit `app/page.js` to update:
- Pricing information
- Services descriptions
- Policies
- Contact information
- Hero slide descriptions
- Fleet status

Edit `tailwind.config.js` to:
- Change brand colors
- Adjust spacing scales
- Add custom fonts

## Important Files

- `app/layout.js` - HTML structure, title, metadata
- `app/page.js` - Main website component with all sections
- `app/globals.css` - Global styles and Tailwind directives
- `public/images/` - Image assets directory

## Deployment Ready

The project is configured for Vercel deployment:
1. Push to GitHub
2. Connect to Vercel
3. Environment variables auto-configured
4. Deploy with one click

## Support Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel Deployment: https://vercel.com/docs

## Notes

- All component logic is in a single page component for simplicity
- Can be split into separate components as needed
- Booking form is demo-only (shows state changes, no backend)
- Ready for Supabase or custom backend integration
- Images are optimized with `loading="lazy"` for gallery and `loading="eager"` for hero

---

**Project Type**: Next.js 15+ with React & Tailwind CSS
**Language**: JavaScript
**Template**: Ruta Brava ATV Booking Website
