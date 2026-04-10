'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

export default function RutaBravaWebsite() {
  const initialRequests = [
    {
      id: 1,
      service: 'Guided ATV Tour',
      date: '2026-04-12',
      time: '15:00',
      quantity: 2,
      name: 'Sunset Guest',
      phone: '+506 8888 1111',
      hotel: 'Beach Hotel',
      comments: 'Sunset route requested',
      status: 'Confirmed',
    },
    {
      id: 2,
      service: 'ATV Rental',
      date: '2026-04-12',
      time: '09:00',
      quantity: 1,
      name: 'Rental Guest',
      phone: '+506 8888 2222',
      hotel: 'Villa in Santa Teresa',
      comments: '24-hour rental',
      status: 'Confirmed',
    },
    {
      id: 3,
      service: 'ATV Rental',
      date: '2026-04-12',
      time: '10:00',
      quantity: 1,
      name: 'Pending Guest',
      phone: '+506 8888 3333',
      hotel: 'Mal País Airbnb',
      comments: 'Waiting for approval',
      status: 'Confirmed',
    },
  ];

  const [bookingRequests, setBookingRequests] = useState(initialRequests);
  const [formData, setFormData] = useState({
    service: 'ATV Rental',
    date: '',
    time: '',
    quantity: '1',
    name: '',
    phone: '',
    hotel: '',
    comments: '',
  });
  const [submissionState, setSubmissionState] = useState('idle');
  const [activeGalleryTab, setActiveGalleryTab] = useState('photos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalFleet = 6;
  const selectedQuantity = Number(formData.quantity || 0);

  const slotUsage = useMemo(() => {
    if (!formData.date || !formData.time) {
      return { confirmed: 0, pending: 0, available: totalFleet };
    }

    const matching = bookingRequests.filter(
      (request) => request.date === formData.date && request.time === formData.time && (request.service === 'ATV Rental' || request.service === 'Guided ATV Tour')
    );

    const confirmed = matching.filter((request) => request.status === 'Confirmed').reduce((sum, request) => sum + request.quantity, 0);
    const pending = matching.filter((request) => request.status === 'Pending').reduce((sum, request) => sum + request.quantity, 0);
    const available = Math.max(totalFleet - confirmed - pending, 0);

    return { confirmed, pending, available };
  }, [bookingRequests, formData.date, formData.time]);

  const availabilityMessage = useMemo(() => {
    if (!formData.date || !formData.time) {
      return 'Select a date and time to check live availability';
    }
    if (slotUsage.available <= 0 || selectedQuantity > slotUsage.available) {
      return 'Sold out';
    }
    return `Only ${slotUsage.available} ATV${slotUsage.available === 1 ? '' : 's'} left for this slot`;
  }, [formData.date, formData.time, selectedQuantity, slotUsage.available]);

  const dashboardStats = useMemo(() => {
    const booked = bookingRequests.filter((request) => request.status === 'Confirmed').reduce((sum, request) => sum + request.quantity, 0);
    const pending = bookingRequests.filter((request) => request.status === 'Pending').reduce((sum, request) => sum + request.quantity, 0);
    const available = Math.max(totalFleet - booked - pending, 0);
    return [
      { label: 'Booked', value: `${Math.round((booked / totalFleet) * 100)}%` },
      { label: 'Pending Requests', value: `${Math.round((pending / totalFleet) * 100)}%` },
      { label: 'Available Now', value: `${Math.round((available / totalFleet) * 100)}%` },
    ];
  }, [bookingRequests]);

  const handleChange = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    setSubmissionState('idle');
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (!formData.date || !formData.time || !formData.name || !formData.phone) {
      setSubmissionState('missing');
      return;
    }

    if (availabilityMessage === 'Sold out') {
      setSubmissionState('soldOut');
      return;
    }

    const newRequest = {
      id: Date.now(),
      service: formData.service,
      date: formData.date,
      time: formData.time,
      quantity: Number(formData.quantity),
      name: formData.name,
      phone: formData.phone,
      hotel: formData.hotel,
      comments: formData.comments,
      status: 'Pending',
    };

    setBookingRequests((current) => [newRequest, ...current]);
    setSubmissionState('submitted');
  };

  const bookingEmailHref = useMemo(() => {
    const subject = encodeURIComponent('Ruta Brava Booking Request');
    const body = encodeURIComponent(
      `Service: ${formData.service}
Date: ${formData.date || '-'}
Time: ${formData.time || '-'}
Quantity: ${formData.quantity} ATV(s)
Name: ${formData.name || '-'}
Phone: ${formData.phone || '-'}
Hotel or pickup location: ${formData.hotel || '-'}
Comments: ${formData.comments || '-'}

Availability shown on website: ${availabilityMessage}`
    );
    return `mailto:info@rutabravagroup.com?subject=${subject}&body=${body}`;
  }, [formData, availabilityMessage]);

  const services = [
    {
      title: 'ATV Rentals',
      subtitle: 'Explore at your own pace',
      details:
        'Flexible ATV rentals for guests who want freedom, adventure, and easy automatic driving around Santa Teresa, Mal País, and nearby beaches.',
    },
    {
      title: 'Guided ATV Tours',
      subtitle: 'Adventure with expert local guidance',
      details:
        'Sunset, waterfall, and peninsula experiences designed for travelers who want to discover hidden gems in a safe and exciting way.',
    },
    {
      title: 'Luxury Shuttles',
      subtitle: 'Coming soon',
      details:
        'Private luxury shuttle service for airport transfers, hotel pickups, and premium transportation experiences. This service is planned for a future launch and is not currently available.',
    },
    {
      title: 'Luxury Vehicle Rentals',
      subtitle: 'Coming soon',
      details:
        'Luxury vehicle rental options created for travelers looking for comfort, style, and high-end mobility. This service is planned for a future launch and is not currently available.',
    },
  ];

  const rentalPrices = [
    { label: '4 Hours', price: '$60', note: 'Taxes not included' },
    { label: '24 Hours', price: '$90', note: 'Taxes not included' },
    { label: '3 Days', price: '$230', note: 'Taxes not included' },
    { label: '1 Week', price: '$500', note: 'Taxes not included' },
  ];

  const tourPrices = [
    { label: 'Sunset Jungle Tour', duration: '3 hours', price: '$120', note: 'Taxes not included' },
    { label: 'Waterfall Adventure', duration: '5 hours', price: '$150', note: 'Taxes not included' },
    { label: 'Ultimate Peninsula Tour', duration: '7 hours', price: '$200', note: 'Taxes not included' },
  ];

  const highlights = [
    '6 Honda TRX420 4x4 automatic ATVs',
    'ATV rentals and guided tours',
    'Luxury shuttles coming soon',
    'Luxury vehicle rentals coming soon',
    'Gas included for tours',
    'Hotel and concierge partnerships',
  ];

  const policies = [
    'All listed prices are shown before taxes; applicable taxes will be added at checkout or final confirmation',
    'Deposit required: US$500',
    'Cancellations with at least 24 hours notice may qualify for refund',
    'No-show reservations are non-refundable',
    'Weather-related changes may be rescheduled based on availability',
    'Valid identification and requirements apply before riding',
  ];

  const fleetStatus = [
    { id: 'ATV 01', status: 'Booked', client: 'Sunset Tour', date: 'Apr 12' },
    { id: 'ATV 02', status: 'Booked', client: '24 Hour Rental', date: 'Apr 12' },
    { id: 'ATV 03', status: 'Pending', client: 'Booking Request', date: 'Apr 12' },
    { id: 'ATV 04', status: 'Available', client: 'Ready to assign', date: 'Apr 12' },
    { id: 'ATV 05', status: 'Available', client: 'Ready to assign', date: 'Apr 12' },
    { id: 'ATV 06', status: 'Available', client: 'Ready to assign', date: 'Apr 12' },
  ];

  const bookingStats = dashboardStats;

  const backendTables = [
    {
      title: 'users_admin',
      description: 'Stores admin users allowed to log in and manage the booking system.',
      fields: 'id, full_name, email, password_hash, role, is_active, last_login',
    },
    {
      title: 'fleet_units',
      description: 'Stores each ATV as an individual unit so the system can assign real availability.',
      fields: 'id, unit_code, type, model, status, notes, active',
    },
    {
      title: 'booking_requests',
      description: 'Stores every reservation request submitted from the website form.',
      fields: 'id, service, date, time, quantity, customer_name, phone, hotel, comments, status, source, created_at',
    },
    {
      title: 'booking_assignments',
      description: 'Links each confirmed booking with the exact ATV units assigned to it.',
      fields: 'id, booking_id, fleet_unit_id, assigned_by, assigned_at',
    },
    {
      title: 'payments',
      description: 'Tracks payment status and transaction references for future online payments.',
      fields: 'id, booking_id, amount, currency, payment_status, payment_method, transaction_reference, paid_at',
    },
  ];

  const backendFlow = [
    'Website form sends a booking request to the backend API.',
    'API validates date, time, and requested ATV quantity against real inventory.',
    'If units are available, the request is saved as Pending.',
    'Admin logs in, reviews the request, and changes status to Confirmed or Cancelled.',
    'When confirmed, the system assigns specific ATV units and blocks them on the calendar.',
    'Payment can be tracked now and fully integrated later without changing the booking structure.',
  ];

  const platformOptions = [
    {
      title: 'Supabase',
      verdict: 'Recommended for Ruta Brava',
      description:
        'Great balance between speed, cost, flexibility, and real database structure. It fits a booking engine that needs tables, relationships, admin auth, and future growth.',
      pros: [
        'Real PostgreSQL database with clean relational structure',
        'Easy admin authentication and role control',
        'Works very well for bookings, fleet assignments, and dashboards',
        'Scales better when luxury services and payments are added later',
      ],
    },
    {
      title: 'Firebase',
      verdict: 'Fast but less ideal for this structure',
      description:
        'Good for quick apps and real-time updates, but the booking model for Ruta Brava will be easier to manage in a relational system than in a document-based structure.',
      pros: [
        'Fast setup for forms and notifications',
        'Good real-time behavior',
        'Useful if the project stayed very lightweight',
        'Can work, but becomes less elegant for assignments and calendar logic',
      ],
    },
    {
      title: 'Custom Backend',
      verdict: 'Best for enterprise scale later',
      description:
        'A custom backend gives maximum control, but it costs more and takes longer. It is the strongest long-term option only if Ruta Brava grows into a much larger mobility platform.',
      pros: [
        'Maximum flexibility',
        'Best for complex future integrations',
        'Can support advanced operations and business rules',
        'Requires more time, budget, and technical maintenance',
      ],
    },
  ];

  const recommendedStack = [
    'Frontend: current React website',
    'Backend: Supabase',
    'Database: PostgreSQL inside Supabase',
    'Admin login: Supabase Auth',
    'Dashboard: protected admin views inside the same app',
    'Email notifications: Outlook via server-side email service or automation',
    'Payments later: PayPal or Stripe integration connected to bookings table',
  ];

  const galleryTabs = [
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
  ];

  const galleryItems = {
    photos: [
      { title: 'River Action', type: 'Image', src: '/images/ruta-brava-atv-river-action.jpg' },
      { title: 'Water Splash', type: 'Image', src: '/images/ruta-brava-atv-water-splash.jpg' },
      { title: 'Group River Tour', type: 'Image', src: '/images/ruta-brava-atv-group-river.jpg' },
      { title: 'Road Tour', type: 'Image', src: '/images/ruta-brava-atv-road-tour.jpg' },
      { title: 'Jungle Trail', type: 'Image', src: '/images/ruta-brava-atv-jungle-trail.jpg' },
      { title: 'Beach Ride', type: 'Image', src: '/images/ruta-brava-atv-beach.jpg' },
      { title: 'Ocean View', type: 'Image', src: '/images/ruta-brava-ocean-view-experience.jpg' },
      { title: 'Sunset Tour', type: 'Image', src: '/images/ruta-brava-sunset-tour.jpg' },
      { title: 'Brand Flag', type: 'Image', src: '/images/ruta-brava-brand-flag.jpg' },
      { title: 'Group Lifestyle', type: 'Image', src: '/images/ruta-brava-group-lifestyle.jpg' },
      { title: 'Happy Rider', type: 'Image', src: '/images/ruta-brava-happy-rider-closeup.jpg' },
      { title: 'Happy Rider 2', type: 'Image', src: '/images/ruta-brava-happy-rider-2.jpg' },
    ],
    videos: [
      { title: 'River Tour Reel', type: 'Video', src: 'Add your video thumbnail here' },
      { title: 'Sunset Tour Clip', type: 'Video', src: 'Add your video thumbnail here' },
      { title: 'Jungle Trail Reel', type: 'Video', src: 'Add your video thumbnail here' },
      { title: 'Group Experience Reel', type: 'Video', src: 'Add your video thumbnail here' },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-24 md:pb-0">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.20),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 sm:px-5 backdrop-blur">
            <div className="flex-1 sm:flex-initial">
              <p className="text-base sm:text-lg font-black tracking-[0.25em] uppercase">Ruta Brava</p>
              <p className="text-xs text-white/60">Live the wild route</p>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden gap-6 text-sm text-white/80 md:flex">
              <a href="#services" className="hover:text-amber-300 transition">Services</a>
              <a href="#pricing" className="hover:text-amber-300 transition">Pricing</a>
              <a href="#booking" className="hover:text-amber-300 transition">Booking</a>
              <a href="#gallery" className="hover:text-amber-300 transition">Gallery</a>
              <a href="#hotel-partners" className="hover:text-amber-300 transition">Hotels</a>
              <a href="#about" className="hover:text-amber-300 transition">About</a>
              <a href="#policies" className="hover:text-amber-300 transition">Policies</a>
              <a href="#contact" className="hover:text-amber-300 transition">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition z-50"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-stone-900/95 backdrop-blur p-4 space-y-3 animate-in fade-in duration-200">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">Services</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">Pricing</a>
              <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">Booking</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">Gallery</a>
              <a href="#hotel-partners" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">Hotels</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">About</a>
              <a href="#policies" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">Policies</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 rounded-lg transition">Contact</a>
            </div>
          )}

          <div className="flex flex-col gap-10 py-20 md:py-24 items-center text-center">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                ATV Rentals & Tours · Santa Teresa & Mal País
              </span>
              <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
                The Ultimate ATV Adventure Awaits
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg text-white/75">
                Experience the thrill of Costa Rica&apos;s wild routes with premium Honda TRX420 ATVs. From river crossings to jungle trails, guided tours to self-drive rentals – your adventure starts here. Gas included, expert guides, and unforgettable memories guaranteed.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#booking"
                  className="rounded-2xl bg-amber-400 px-6 sm:px-8 py-4 sm:py-5 text-center font-bold text-stone-950 shadow-lg shadow-amber-400/20 transition hover:scale-[1.02] active:scale-[0.98] min-h-[48px] sm:min-h-[52px] flex items-center justify-center"
                >
                  Check Availability Now
                </a>
                <a
                  href="https://wa.me/50683898404"
                  className="rounded-2xl bg-amber-400 px-6 sm:px-8 py-4 sm:py-5 text-center font-bold text-stone-950 shadow-lg shadow-amber-400/20 transition hover:scale-[1.02] active:scale-[0.98] min-h-[48px] sm:min-h-[52px] flex items-center justify-center"
                >
                  Book via WhatsApp
                </a>
                <a
                  href="#hotel-partners"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 sm:px-8 py-4 sm:py-5 text-center font-semibold transition hover:bg-white/10 active:bg-white/20 min-h-[48px] sm:min-h-[52px] flex items-center justify-center"
                >
                  For Hotels & Partners
                </a>
              </div>
              <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-center text-sm text-white/80 sm:hidden mt-6">
                <p className="font-semibold text-white">Instant Booking from Your Phone</p>
                <p className="mt-2 text-xs text-white/60">Select date, time, and ATV quantity to check real-time availability.</p>
                <div className="mt-4 grid gap-3">
                  <a href="#booking" className="rounded-2xl bg-amber-400 px-5 py-3 text-sm font-bold text-stone-950 transition hover:scale-[1.02]">
                    Book Now
                  </a>
                  <a href="https://wa.me/50683898404" className="rounded-2xl border border-white/15 bg-black/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    WhatsApp Booking
                  </a>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 text-xs sm:text-sm">
                {highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 text-white/85 text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-300">Services</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black">Built for adventure seekers</h2>
          </div>
          <p className="text-xs sm:text-sm text-white/60 sm:max-w-xs">
            Ruta Brava currently offers ATV rentals and guided tours, while luxury shuttles and luxury vehicle rentals are part of the brand&apos;s future expansion and are not available yet.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => (
            <div key={item.title} className="rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-6 shadow-lg shadow-black/20">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-300">Ruta Brava</p>
              <h3 className="mt-3 text-lg sm:text-2xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-white/70">{item.subtitle}</p>
              <p className="mt-5 text-xs sm:text-sm leading-6 text-white/60">{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-2">
          <div className="rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-300">ATV Rental Pricing</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black">Current ATV rental rates</h2>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {rentalPrices.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-5 gap-3">
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-bold">{item.label}</p>
                    <p className="text-xs sm:text-sm text-white/50">{item.note}</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-amber-300 flex-shrink-0">{item.price}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs sm:text-sm text-white/55">
              Helmet included, easy automatic driving, local route tips, and delivery included. Taxes will be added to all listed prices at checkout or final confirmation.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-300">Guided Tour Pricing</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black">Current guided tour rates</h2>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {tourPrices.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-5 gap-3">
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-bold">{item.label}</p>
                    <p className="text-xs sm:text-sm text-white/50">{item.duration} · {item.note}</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-amber-300 flex-shrink-0">{item.price}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-white/55">
              Routes may include Mal País, secret beaches, Cabuya, Montezuma waterfalls, and jungle trails depending on the selected experience. Taxes will be added to all listed prices at checkout or final confirmation.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Gallery</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Photos and videos from the Ruta Brava experience</h2>
          </div>
          <p className="max-w-2xl text-sm text-white/60">
            This gallery section is ready to receive your real tour images and videos. Once you upload them, we can replace these placeholders with a premium media showcase for rentals, guided tours, and destination content.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="flex flex-wrap gap-3">
            {galleryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGalleryTab(tab.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeGalleryTab === tab.id
                    ? 'bg-amber-400 text-stone-950'
                    : 'border border-white/10 bg-black/20 text-white/75 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems[activeGalleryTab].map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
                <div className="flex h-56 items-center justify-center border-b border-white/10 bg-white/5 text-center text-white/35">
                  {item.type === 'Image' ? <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  /> : item.type}
                </div>
                <div className="p-5">
                  <p className="text-lg font-bold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-white/55">{item.type === 'Image' ? 'Optimized media ready for gallery display.' : 'Replace with your uploaded video thumbnail or embed preview.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Booking Engine</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Smart reservation control for a growing fleet</h2>
          </div>
          <p className="max-w-2xl text-sm text-white/60">
            This section is designed as the base for a more robust booking engine that can scale with ATV rentals and guided tours first, and later expand to luxury shuttles and luxury vehicle rentals once those services become available. The reservation form should connect to a live database so every request checks actual inventory before being confirmed.
          </p>
        </div>

        <div className="mb-8 rounded-[2rem] border border-white/10 bg-black/20 p-6 sm:p-8 text-white/80">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Reserva rápida</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Paso 1</p>
              <p className="mt-2 text-lg font-bold">Selecciona tu ATV</p>
              <p className="mt-2 text-sm text-white/60">Elige servicio, fecha, hora y cantidad.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Paso 2</p>
              <p className="mt-2 text-lg font-bold">Llena tu info</p>
              <p className="mt-2 text-sm text-white/60">Nombre, teléfono y lugar de recogida.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Paso 3</p>
              <p className="mt-2 text-lg font-bold">Confirma y listo</p>
              <p className="mt-2 text-sm text-white/60">Recibirás confirmación rápida del equipo.</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-white/90">
            ¿Quieres reservar ahora mismo? Usa WhatsApp para una atención más rápida.
            <a href="https://wa.me/50683898404" className="ml-1 font-semibold text-stone-950 underline">Book via WhatsApp</a>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">System Overview</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {bookingStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-white/50">{item.label}</p>
                    <p className="mt-2 text-3xl font-black text-amber-300">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
                <p className="font-bold text-white">Booking engine logic:</p>
                <ul className="mt-3 space-y-2">
                  <li>• Guest selects service, date, time, and quantity of ATVs.</li>
                  <li>• System checks real inventory against the 6 available units.</li>
                  <li>• If units are available, the request can continue to payment or approval.</li>
                  <li>• If the fleet is full, the slot is blocked automatically.</li>
                  <li>• Confirmed reservations reduce available inventory instantly.</li>
                  <li>• Pending requests remain visible for admin follow-up.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Live Fleet Calendar Mockup</p>
              <h3 className="mt-2 text-2xl font-black">Availability by unit</h3>
              <div className="mt-6 space-y-3">
                {fleetStatus.map((item) => (
                  <div key={item.id} className="grid items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[120px_120px_1fr_90px]">
                    <p className="font-bold">{item.id}</p>
                    <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === 'Booked'
                        ? 'bg-red-500/15 text-red-300'
                        : item.status === 'Pending'
                        ? 'bg-amber-400/15 text-amber-300'
                        : 'bg-green-500/15 text-green-300'
                    }`}>
                      {item.status}
                    </span>
                    <p className="text-white/70">{item.client}</p>
                    <p className="text-sm text-white/45">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Reservation Form</p>
                <h3 className="mt-2 text-2xl font-black">Request your booking</h3>
              </div>
              <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300">
                Real-time inventory concept
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Service</label>
                <select value={formData.service} onChange={handleChange('service')} className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white outline-none touch-target">
                  <option>ATV Rental</option>
                  <option>Guided ATV Tour</option>
                  <option disabled>Luxury Shuttle · Coming soon</option>
                  <option disabled>Luxury Vehicle Rental · Coming soon</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Date</label>
                <input value={formData.date} onChange={handleChange('date')} type="date" className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white outline-none touch-target" />
              </div>
              <div>
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Time</label>
                <input value={formData.time} onChange={handleChange('time')} type="time" className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white outline-none touch-target" />
              </div>
              <div>
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Quantity of ATVs</label>
                <select value={formData.quantity} onChange={handleChange('quantity')} className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white outline-none touch-target">
                  <option value="1">1 ATV</option>
                  <option value="2">2 ATVs</option>
                  <option value="3">3 ATVs</option>
                  <option value="4">4 ATVs</option>
                  <option value="5">5 ATVs</option>
                  <option value="6">6 ATVs</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Full name</label>
                <input value={formData.name} onChange={handleChange('name')} type="text" placeholder="Your name" className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white placeholder:text-white/30 outline-none touch-target" />
              </div>
              <div>
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Phone</label>
                <input value={formData.phone} onChange={handleChange('phone')} type="tel" placeholder="+506 ..." className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white placeholder:text-white/30 outline-none touch-target" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Hotel or pickup location</label>
                <input value={formData.hotel} onChange={handleChange('hotel')} type="text" placeholder="Hotel, Airbnb, or meeting point" className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white placeholder:text-white/30 outline-none touch-target" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs sm:text-sm text-white/60">Comments</label>
                <textarea value={formData.comments} onChange={handleChange('comments')} rows="4" placeholder="Add special requests or trip details" className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 px-4 py-3 sm:py-4 text-white placeholder:text-white/30 outline-none resize-none" />
              </div>
              <div className="sm:col-span-2 mt-2 rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5 text-xs sm:text-sm text-white/70">
                <p className="font-bold text-white">Live slot summary</p>
                <div className="mt-3 grid gap-2 sm:gap-3 grid-cols-3">
                  <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                    <p className="text-white/45 text-xs sm:text-sm">Confirmed on slot</p>
                    <p className="mt-1 text-xl sm:text-2xl font-black text-amber-300">{slotUsage.confirmed}</p>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                    <p className="text-white/45 text-xs sm:text-sm">Pending on slot</p>
                    <p className="mt-1 text-xl sm:text-2xl font-black text-amber-300">{slotUsage.pending}</p>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                    <p className="text-white/45 text-xs sm:text-sm">Available on slot</p>
                    <p className="mt-1 text-xl sm:text-2xl font-black text-amber-300">{slotUsage.available}</p>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">Availability status</p>
              <p className="mt-2 text-2xl font-black text-white">{availabilityMessage}</p>
              <p className="mt-2 text-sm text-white/65">
                This message changes dynamically based on selected date, time, service, and ATV quantity. If availability reaches zero, or the requested quantity is greater than the remaining units, the booking engine should block the request automatically.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="submit" className="w-full rounded-2xl bg-amber-400 px-6 py-4 font-bold text-stone-950 shadow-lg shadow-amber-400/20 transition hover:scale-[1.02] active:scale-[0.98]">
                Book now
              </button>
              <a
                href="https://wa.me/50683898404"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Book on WhatsApp
              </a>
              <a
                href={bookingEmailHref}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10 sm:col-span-2"
              >
                Send request by Email
              </a>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/65">
              {submissionState === 'submitted' && (
                <p className="mb-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-300">
                  Booking request added to the dashboard as pending and ready to be reviewed by the Ruta Brava team.
                </p>
              )}
              {submissionState === 'missing' && (
                <p className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300">
                  Please complete name, phone, date, and time before submitting the request.
                </p>
              )}
              {submissionState === 'soldOut' && (
                <p className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300">
                  This slot is sold out for the selected ATV quantity. Please choose another time or reduce the number of units.
                </p>
              )}
              Booking requests can also be routed directly to <span className="font-semibold text-white">info@rutabravagroup.com</span> so the team can review the request in Outlook, confirm availability, and follow up with the guest.
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/5 p-5 text-sm text-white/60">
              Recommended long-term setup: website front-end + booking form + live database + admin dashboard + automatic inventory deduction per ATV + approval/payment workflow. In production, the submit button should create a real database record and notify info@rutabravagroup.com automatically.
            </div>

            <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Admin Dashboard Preview</p>
                  <h4 className="mt-2 text-2xl font-black">Recent booking requests</h4>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/60">
                  Stored in dashboard concept
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {bookingRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-bold text-white">{request.name} · {request.service}</p>
                        <p className="text-sm text-white/55">{request.date} · {request.time} · {request.quantity} ATV(s)</p>
                        <p className="text-sm text-white/55">{request.hotel || 'No hotel provided'} · {request.phone}</p>
                      </div>
                      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${request.status === 'Confirmed' ? 'bg-green-500/15 text-green-300' : 'bg-amber-400/15 text-amber-300'}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Backend Blueprint</p>
              <h4 className="mt-2 text-2xl font-black">Production-ready system structure</h4>
              <p className="mt-3 text-sm text-white/65">
                This is the recommended backend architecture for Ruta Brava so the website can evolve from a visual booking concept into a real reservation platform with admin control, calendar blocking, and future payment integration.
              </p>

              <div className="mt-6 space-y-4">
                {backendTables.map((table) => (
                  <div key={table.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-lg font-bold text-white">{table.title}</p>
                        <p className="mt-1 text-sm text-white/60">{table.description}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-amber-300">Core fields</p>
                    <p className="mt-1 text-sm text-white/65">{table.fields}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-bold text-white">Recommended logic flow</p>
                <div className="mt-4 space-y-3">
                  {backendFlow.map((step, index) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 font-bold text-stone-950">
                        {index + 1}
                      </div>
                      <p className="pt-1 text-sm text-white/70">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-lg font-bold text-white">Admin authentication</p>
                  <p className="mt-2 text-sm text-white/65">
                    The admin panel should require secure login so only Ruta Brava staff can review requests, change statuses, assign ATVs, and manage calendar blocks.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-lg font-bold text-white">Status workflow</p>
                  <p className="mt-2 text-sm text-white/65">
                    Requests should move through Pending, Confirmed, Cancelled, or Completed. Confirmed bookings should reserve real ATV units and reflect instantly on the live calendar.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-bold text-white">Technical platform recommendation</p>
                <p className="mt-2 text-sm text-white/65">
                  Ruta Brava needs a solution that is strong enough for real inventory control, admin access, booking assignments, and future payment integration without becoming unnecessarily expensive from day one.
                </p>

                <div className="mt-5 space-y-4">
                  {platformOptions.map((option) => (
                    <div key={option.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-lg font-bold text-white">{option.title}</p>
                          <p className="mt-1 text-sm text-amber-300">{option.verdict}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-white/65">{option.description}</p>
                      <div className="mt-4 grid gap-2">
                        {option.pros.map((item) => (
                          <div key={item} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
                <p className="text-lg font-bold text-white">Recommended stack for launch</p>
                <div className="mt-4 grid gap-3">
                  {recommendedStack.map((item) => (
                    <div key={item} className="rounded-xl border border-amber-400/20 bg-black/20 px-4 py-3 text-sm text-white/80">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">About Ruta Brava</p>
            <h2 className="mt-3 text-3xl font-black">Adventure, local knowledge, and confidence on every route.</h2>
            <p className="mt-5 max-w-2xl text-white/70">
              Ruta Brava was created to offer high-quality ATV experiences in Santa Teresa and Mal País, combining the thrill of the ride with responsible operation, clear policies, and a premium guest experience. As the brand grows, luxury shuttles and luxury vehicle rentals are planned as future services, but they are not available yet.
            </p>
            <p className="mt-4 max-w-2xl text-white/70">
              Our focus is simple: strong machines, scenic routes, reliable guidance, upscale service, and a brand experience that makes hotels, travelers, concierges, and local partners feel confident booking with us.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Booking Flow</p>
            <div className="mt-5 space-y-4">
              {[
                'Choose your rental or tour',
                'Check live calendar availability',
                'Assign an available ATV automatically or manually',
                'Confirm date and availability',
                'Receive booking details by WhatsApp',
                'Review requirements and safety terms',
                'Enjoy the ride',
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 font-black text-stone-950">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-white/80">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="policies" className="mx-auto max-w-7xl px-6 py-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Important policies</p>
          <h2 className="mt-3 text-3xl font-black">Clear terms. Safer rides.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {policies.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Contact</p>
            <h2 className="mt-3 text-4xl font-black">Ready to ride?</h2>
            <p className="mt-4 max-w-xl text-white/70">
              Contact Ruta Brava for ATV bookings, guided tour inquiries, hotel partnerships, and upcoming premium transportation updates in Santa Teresa.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="space-y-4 text-white/80">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">WhatsApp</p>
                <a href="https://wa.me/50683898404" className="mt-1 block text-xl font-bold hover:text-amber-300">+506 8389 8404</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">Email</p>
                <a href="mailto:info@rutabravagroup.com" className="mt-1 block text-xl font-bold hover:text-amber-300">info@rutabravagroup.com</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">Instagram</p>
                <a href="https://instagram.com/rutabrava.cr" className="mt-1 block text-xl font-bold hover:text-amber-300">@rutabrava.cr</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">Location</p>
                <p className="mt-1 text-xl font-bold">Santa Teresa & Mal País, Costa Rica</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">Services</p>
                <p className="mt-1 text-xl font-bold">ATV Rentals · Guided Tours · Luxury Shuttles (coming soon) · Luxury Vehicle Rentals (coming soon)</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="https://wa.me/50683898404" className="rounded-2xl bg-amber-400 px-6 py-4 text-center font-bold text-stone-950">
                Book now
              </a>
              <a href="mailto:info@rutabravagroup.com?subject=Ruta%20Brava%20Inquiry" className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold transition hover:bg-white/10">
                Contact via Email
              </a>
              <a href="https://instagram.com/rutabrava.cr" className="rounded-2xl border border-white/15 px-6 py-4 text-center font-semibold">
                See more on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="hotel-partners" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Hotel & Concierge Partners</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">A premium activity partner for hotels, villas, and concierge teams</h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Ruta Brava is positioned to work with hotels, luxury villas, property managers, and concierge teams looking for a reliable ATV activity partner in Santa Teresa and Mal País.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
                Premium brand presentation for guest-facing recommendations.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
                Guided tours and rentals that can fit curated guest itineraries.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
                Professional communication via WhatsApp and Outlook.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
                Future scalability for luxury shuttles and premium mobility services.
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-stone-900 via-stone-800 to-black p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Partner Inquiry</p>
            <h3 className="mt-2 text-2xl font-black">Let&apos;s build a referral relationship</h3>
            <p className="mt-4 text-sm text-white/65">
              Perfect for hotels, boutique stays, villas, and concierge teams who want a trusted adventure experience to recommend.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">Custom coordination for guest bookings</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">Premium route storytelling and brand presentation</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">Direct contact for commissions and concierge support</div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="mailto:info@rutabravagroup.com?subject=Ruta%20Brava%20Hotel%20Partnership" className="rounded-2xl bg-amber-400 px-6 py-4 text-center font-bold text-stone-950">
                Contact Partnerships
              </a>
              <a href="https://wa.me/50683898404" className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10">
                WhatsApp Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-7xl px-4 pb-4 sm:px-6 md:hidden">
        <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-stone-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Reserva rápida</p>
            <p className="text-sm font-bold text-white">rutabrava.cr</p>
          </div>
          <a href="#booking" className="rounded-2xl bg-amber-400 px-4 py-3 text-sm font-bold text-stone-950 transition hover:scale-[1.02]">
            Book now
          </a>
        </div>
      </div>
    </div>
  );
}
