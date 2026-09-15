/* ===== TripMate Static — Shared App Logic ===== */

// ─────────────────────────────────────────────────────────────
// SVG ICON SPRITE
// ─────────────────────────────────────────────────────────────
const TM_ICONS = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
<symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></symbol>
<symbol id="i-package" viewBox="0 0 24 24"><path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/></symbol>
<symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
<symbol id="i-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.6.7 1.1 1.5 1.1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></symbol>
<symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.4a2.8 2.8 0 1 1 4.1 2.5c-.9.5-1.3 1-1.3 2v.4"/><circle cx="12" cy="17" r=".35" fill="currentColor"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.3-4.3"/></symbol>
<symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 10a6 6 0 1 1 12 0c0 4 1.3 5.6 1.9 6.2H4.1C4.7 15.6 6 14 6 10z"/><path d="M10 19.5a2.2 2.2 0 0 0 4 0"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
<symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
<symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></symbol>
<symbol id="i-eye-off" viewBox="0 0 24 24"><path d="M17.9 17.9A10 10 0 0 1 12 19c-6.4 0-10-7-10-7a17.5 17.5 0 0 1 4.1-5.1M9.9 4.2A10 10 0 0 1 12 4c6.4 0 10 7 10 7a17.5 17.5 0 0 1-2.4 3.4M3 3l18 18"/><circle cx="12" cy="12" r="3"/></symbol>
<symbol id="i-download" viewBox="0 0 24 24"><path d="M12 4v11m0 0-4-4m4 4 4-4M4 19h16"/></symbol>
<symbol id="i-edit" viewBox="0 0 24 24"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="m14.5 7 3 3"/></symbol>
<symbol id="i-plane" viewBox="0 0 24 24"><path d="M10.5 21 12 15.5 4 13v-2l9-3V5a1.6 1.6 0 1 1 3.2 0v3l9 3v2l-8 2.5L20.5 21l-1.7.6L14 17.4l-1.8 4.2z"/></symbol>
<symbol id="i-bed" viewBox="0 0 24 24"><path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 15h18M3 19v2M21 19v2"/><rect x="5" y="9" width="6" height="4" rx="1"/></symbol>
<symbol id="i-food" viewBox="0 0 24 24"><path d="M6 3v9a3 3 0 0 0 6 0V3M9 12v9M18 3c-2 1-2.5 3-2.5 5.5S16 13 18 13v8"/></symbol>
<symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></symbol>
<symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r=".4" fill="currentColor"/></symbol>
<symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
<symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14m0 0-5-5m5 5-5 5"/></symbol>
<symbol id="i-send" viewBox="0 0 24 24"><path d="m3 11 18-7-7 18-3-8z"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.6 5.9L21 9.6l-4.7 4.3L17.6 21 12 17.7 6.4 21l1.3-7.1L3 9.6l6.4-.7z"/></symbol>
<symbol id="i-more" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4.2 4.6-6.5 8-6.5s6.8 2.3 8 6.5"/></symbol>
<symbol id="i-logout" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></symbol>
<symbol id="i-trash" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
<symbol id="i-bot" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><circle cx="9" cy="14" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.2" fill="currentColor" stroke="none"/><path d="M9 18h6"/><path d="M12 2v2"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.3 4 6.3 4c2.2 0 3.7 1.3 4.7 2.6C12 5.3 13.5 4 15.7 4c4 0 5.8 4 4.3 7.7C19.5 16.4 12 21 12 21z"/></symbol>
<symbol id="i-note" viewBox="0 0 24 24"><path d="M4 4h13l3 3v13H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></symbol>
<symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".6" fill="currentColor"/></symbol>
<symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M16.9 16.9l1.4 1.4M5.6 18.4l1.4-1.4M16.9 7.1l1.4-1.4"/><circle cx="12" cy="12" r="4"/></symbol>
<symbol id="i-clip" viewBox="0 0 24 24"><path d="M21 12.5 12.9 20.6a5 5 0 0 1-7.1-7.1L13.6 5.7a3.5 3.5 0 0 1 5 5L10.8 18.5a2 2 0 0 1-2.8-2.8L15.4 8"/></symbol>
<symbol id="i-map" viewBox="0 0 24 24"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><path d="M9 3v15M15 6v15"/></symbol>
</svg>`;

const TM_LOGO_SVG = `<img src="uploads/avatars/Icon.png" alt="TripMate" width="38" height="38" style="border-radius:10px;object-fit:cover;display:block">`;

// ─────────────────────────────────────────────────────────────
// STATE — simple localStorage-backed store
// ─────────────────────────────────────────────────────────────
const TM_STATE_KEY = 'tripmate_state';

function getState() {
  try {
    return JSON.parse(localStorage.getItem(TM_STATE_KEY)) || defaultState();
  } catch { return defaultState(); }
}
function setState(patch) {
  const s = getState();
  Object.assign(s, patch);
  localStorage.setItem(TM_STATE_KEY, JSON.stringify(s));
}

function defaultState() {
  return {
    user: { name: 'Sarah Mitchell', email: 'sarah.mitchell@agency.com', accountType: 'agency', phone: '+1 (555) 012-3456', avatar: '' },
    trips: [
      { id: 1, name: 'SF Summer Getaway 2026', destination: 'San Francisco, California', type: 'Leisure', startDate: '2026-08-10', endDate: '2026-08-16', travelers: 2, budgetMin: 1500, budgetMax: 5000, accommodation: 'Hotel', mealPlan: 'Breakfast Included', status: 'active', notes: '' }
    ],
    activities: [
      { id:1, tripId:1, dayNumber:1, date:'2026-08-10', timeSlot:'08:45 AM', icon:'i-plane', title:'Flight SFO — Delta DL245', description:'Boarding at Gate A12. Economy Class.', location:'SFO Terminal 2', sortOrder:1 },
      { id:2, tripId:1, dayNumber:1, date:'2026-08-10', timeSlot:'01:00 PM', icon:'i-bed',   title:'Hotel Check-In — Grand Hyatt', description:'Confirmation #GH-94820. Standard King room.', location:'345 Stockton St, San Francisco', sortOrder:2 },
      { id:3, tripId:1, dayNumber:1, date:'2026-08-10', timeSlot:'05:00 PM', icon:'i-food',  title:"Welcome Dinner — Fisherman's Wharf", description:'Savor fresh local Dungeness crab.', location:"Scoma's Restaurant", sortOrder:3 },
      { id:4, tripId:1, dayNumber:2, date:'2026-08-11', timeSlot:'09:00 AM', icon:'i-pin',   title:'Golden Gate Bridge Walk', description:'Guided walking tour. Duration: 2 hours.', location:'Golden Gate Bridge', sortOrder:1 },
      { id:5, tripId:1, dayNumber:2, date:'2026-08-11', timeSlot:'12:00 PM', icon:'i-food',  title:'Lunch at Ghirardelli Square', description:'Fresh seafood and famous sundae.', location:'Ghirardelli Square', sortOrder:2 },
      { id:6, tripId:1, dayNumber:2, date:'2026-08-11', timeSlot:'03:00 PM', icon:'i-compass',title:'Alcatraz Island Tour', description:'Ferry departure from Pier 33.', location:'Pier 33', sortOrder:3 },
      { id:7, tripId:1, dayNumber:3, date:'2026-08-12', timeSlot:'10:00 AM', icon:'i-pin',   title:'Apple Park Visitor Center', description:'AR experience and rooftop deck.', location:'Apple Park', sortOrder:1 },
      { id:8, tripId:1, dayNumber:3, date:'2026-08-12', timeSlot:'01:00 PM', icon:'i-info',  title:'Computer History Museum', description:'Self-guided tour through computing history.', location:'Mountain View', sortOrder:2 },
      { id:9, tripId:1, dayNumber:3, date:'2026-08-12', timeSlot:'04:00 PM', icon:'i-star',  title:'SF Museum of Modern Art', description:'Contemporary art galleries.', location:'151 Third St, SF', sortOrder:3 }
    ],
    bookings: [
      { id:1, ref:'BK-9021', type:'Flight',           customer:'Ruben Herwitz',    provider:'Delta Airlines (DL245)',       dates:'Aug 9, 2026',     amount:650,  status:'Confirmed' },
      { id:2, ref:'BK-9022', type:'Hotel',            customer:'Sarah Jenkins',    provider:'Grand Hyatt San Francisco',    dates:'Aug 10–14',       amount:1200, status:'Confirmed' },
      { id:3, ref:'BK-9023', type:'Tour / Excursion', customer:'Michael Chang',    provider:'City Sightseeing Tour',        dates:'Aug 11, 2026',    amount:150,  status:'Pending'   },
      { id:4, ref:'BK-9024', type:'Flight',           customer:'Emily Rodriguez',  provider:'United Airlines (UA789)',      dates:'Aug 12, 2026',    amount:480,  status:'Confirmed' },
      { id:5, ref:'BK-9025', type:'Hotel',            customer:'David Kim',        provider:'Marriott Downtown',            dates:'Aug 13–16',       amount:960,  status:'Cancelled' },
      { id:6, ref:'BK-9026', type:'Tour / Excursion', customer:'Lisa Thompson',    provider:'Harbor Cruise Excursion',      dates:'Aug 14, 2026',    amount:95,   status:'Pending'   }
    ],
    packages: [
      { id:1, name:'Tropical Paradise Retreat', destination:'Maldives',      description:'All-inclusive luxury retreat with spa and water sports.', duration:'7 Days / 6 Nights', price:2100, rating:4.9, image:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&q=80', featured:true  },
      { id:2, name:'Venice Dreams',             destination:'Italy',         description:'Romantic canals, gondola rides, and fine dining.',         duration:'5 Days',            price:1500, rating:4.8, image:'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&q=80', featured:false },
      { id:3, name:'Safari Adventure',          destination:'South Africa',  description:'Wild big-five game drives at sunrise.',                   duration:'8 Days',            price:3200, rating:4.8, image:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&q=80', featured:false },
      { id:4, name:'Alpine Escape',             destination:'Switzerland',   description:'Scenic mountain railways and ski resort stays.',           duration:'6 Days',            price:2400, rating:4.9, image:'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=500&q=80', featured:false },
      { id:5, name:'Caribbean Cruise',          destination:'Caribbean',     description:'Island hopping on a luxury cruise liner.',                duration:'7 Days',            price:1800, rating:4.7, image:'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=500&q=80', featured:false },
      { id:6, name:'Tokyo Cultural',            destination:'Japan',         description:'Ancient temples and cutting-edge technology.',            duration:'8 Days',            price:3500, rating:4.9, image:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80', featured:false },
      { id:7, name:'Bali Beach Escape',         destination:'Indonesia',     description:'Luxury villas, private pools, rice terraces.',            duration:'7 Days',            price:1200, rating:4.7, image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80', featured:false }
    ],
    messages: [
      { id:1, sender:'John Doe',         avatar:'JD', color:'#2563eb', text:"Hi! I think there might be a mistake with the flight number. Can you confirm?",  out:true,  time:'10:30 AM' },
      { id:2, sender:'TripMate Support', avatar:'TS', color:'#059669', text:"Hi John! Everything looks correct. Flight DL245 departs at 2:30 PM.",             out:false, time:'10:32 AM' },
      { id:3, sender:'John Doe',         avatar:'JD', color:'#2563eb', text:"Thank you! Can you help me with the hotel check-in process?",                     out:true,  time:'10:35 AM' },
      { id:4, sender:'TripMate Support', avatar:'TS', color:'#059669', text:"Absolutely! Your check-in is at 3:00 PM. I'll send you the hotel confirmation.",  out:false, time:'10:37 AM' },
      { id:5, sender:'Delta Airlines',   avatar:'DA', color:'#3b63e0', text:'Your boarding pass is ready to download. Flight DL245 - Aug 9, 2:30 PM.',         out:false, time:'9:15 AM'  },
      { id:6, sender:'Grand Hyatt',      avatar:'GH', color:'#d9982a', text:'Welcome! We have upgraded your room to a suite. Check-in from 3:00 PM.',          out:false, time:'8:00 AM'  },
      { id:7, sender:'Travel Alerts',    avatar:'TA', color:'#c96f1f', text:'Weather update: Clear skies expected for your departure. Have a great trip!',      out:false, time:'7:45 AM'  }
    ],
    packingItems: [
      { id:1, name:'Passport',        packed:true  },
      { id:2, name:'Travel Adapter',  packed:false },
      { id:3, name:'Rain Jacket',     packed:true  },
      { id:4, name:'Pocket Money',    packed:false },
      { id:5, name:'Phone Charger',   packed:true  },
      { id:6, name:'Sunscreen',       packed:false }
    ],
    chatHistory: [],
    notifications: [
      { id:1, type:'booking', title:'Booking Confirmed — Delta DL245',       body:'Flight booking BK-9021 confirmed.', read:true  },
      { id:2, type:'booking', title:'New Booking — Grand Hyatt',              body:'Hotel booking BK-9022 created.',    read:true  },
      { id:3, type:'trip',    title:'Trip Created — SF Summer Getaway 2026',  body:'Your trip to San Francisco is ready.', read:false },
      { id:4, type:'message', title:'New message from TripMate Support',       body:'Flight DL245 departs at 2:30 PM.',  read:false }
    ],
    nextBookingId: 7,
    nextTripId: 2,
    nextActivityId: 10,
    nextPackingId: 7
  };
}

// ─────────────────────────────────────────────────────────────
// NAV CONFIG
// ─────────────────────────────────────────────────────────────
const TM_NAV = [
  { key:'dashboard',   label:'Dashboard',      icon:'i-grid',     href:'dashboard.html' },
  { key:'itineraries', label:'My Itineraries', icon:'i-pin',      href:'itineraries.html' },
  { key:'packages',    label:'Packages',       icon:'i-package',  href:'packages.html' },
  { key:'bookings',    label:'Bookings',       icon:'i-calendar', href:'bookings.html' },
  { key:'messages',    label:'Messages',       icon:'i-mail',     href:'messages.html' },
  { key:'settings',    label:'Settings',       icon:'i-settings', href:'settings.html' }
];

// ─────────────────────────────────────────────────────────────
// LAYOUT RENDERING
// ─────────────────────────────────────────────────────────────
function tmRenderSidebar(active) {
  const state = getState();
  const user = state.user;
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  const avatarHtml = user.avatar
    ? `<img src="${user.avatar}" alt="${user.name}">`
    : `<img src="uploads/avatars/avatar_3_1788970879.jpg" alt="${user.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" style="width:100%;height:100%;object-fit:cover;border-radius:50%"><span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:13px;font-weight:700">${initials}</span>`;

  const items = TM_NAV.map(n => `
    <a class="nav-item${n.key === active ? ' active' : ''}" href="${n.href}">
      <svg class="icon"><use href="#${n.icon}"/></svg>
      <span>${n.label}</span>
    </a>`).join('');

  return `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      ${TM_LOGO_SVG}
      <div>
        <div class="sidebar-logo-text"><span class="trip">Trip</span><span class="mate">Mate</span></div>
        <div class="sidebar-tagline">PLAN &middot; TRAVEL &middot; EXPLORE</div>
      </div>
    </div>
    <nav class="nav-list">${items}</nav>
    <div class="sidebar-spacer"></div>
    <button class="sidebar-help" onclick="openHelpModal()">
      <svg class="icon"><use href="#i-help"/></svg>
      <span>Help &amp; Support</span>
    </button>
    <div class="sidebar-profile">
      <div class="sidebar-avatar">${avatarHtml}</div>
      <div class="sidebar-profile-name">${escHtml(user.name)}</div>
      <button class="sidebar-logout" onclick="tmLogout()">Log Out</button>
    </div>
  </aside>
  <div class="sidebar-overlay" id="sidebar-overlay"></div>`;
}

function tmRenderMobileHeader() {
  return `
  <div class="mobile-header">
    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu">
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
    <div class="mobile-logo"><span class="trip">Trip</span><span class="mate">Mate</span></div>
    <div style="width:36px"></div>
  </div>`;
}

function tmRenderTopbar(opts) {
  opts = opts || {};
  const cta = opts.cta || { label:'+ New Trip', href:'new-trip.html' };
  return `
  <header class="topbar">
    <div class="topbar-search" style="position:relative">
      <svg class="icon"><use href="#i-search"/></svg>
      <input type="text" id="globalSearch" placeholder="Search flights, itineraries, or bookings..." autocomplete="off">
      <div class="search-results" id="searchResults"></div>
    </div>
    <div class="topbar-actions">
      <button class="topbar-icon-btn bell" onclick="toggleNotifPanel()" title="Notifications" aria-label="Notifications">
        <svg class="icon"><use href="#i-bell"/></svg>
        <span class="topbar-dot" id="notifDot"></span>
      </button>
      <button class="topbar-icon-btn help" onclick="openHelpModal()" title="Help" aria-label="Help">
        <svg class="icon"><use href="#i-help"/></svg>
      </button>
      <a class="btn btn-primary" href="${cta.href}">${cta.label}</a>
    </div>
  </header>`;
}

function tmMountLayout(active, topbarOpts) {
  document.body.insertAdjacentHTML('afterbegin', TM_ICONS);

  const sMount  = document.getElementById('sidebar-mount');
  const tMount  = document.getElementById('topbar-mount');
  const mhMount = document.getElementById('mobile-header-mount');
  if (sMount)  sMount.outerHTML  = tmRenderSidebar(active);
  if (tMount)  tMount.outerHTML  = tmRenderTopbar(topbarOpts);
  if (mhMount) mhMount.outerHTML = tmRenderMobileHeader();

  if (!document.getElementById('helpModal'))   document.body.insertAdjacentHTML('beforeend', renderHelpModal());
  if (!document.getElementById('toastWrap'))   document.body.insertAdjacentHTML('beforeend', '<div class="tm-toast-wrap" id="toastWrap"></div>');
  if (!document.getElementById('notifPanel'))  document.body.insertAdjacentHTML('beforeend', renderNotifPanel());

  setTimeout(tmInitMobileNavigation, 0);
  setTimeout(tmInitSearch, 0);
  setTimeout(tmInitNotifPanel, 0);
  updateNotifDot();
}

// ─────────────────────────────────────────────────────────────
// MOBILE NAVIGATION
// ─────────────────────────────────────────────────────────────
function tmInitMobileNavigation() {
  const btn     = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!btn || !sidebar || !overlay) return;

  function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; }

  btn.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);
  sidebar.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => { if (window.innerWidth <= 768) closeSidebar(); });
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeSidebar(); });
}

// ─────────────────────────────────────────────────────────────
// GLOBAL SEARCH
// ─────────────────────────────────────────────────────────────
function tmInitSearch() {
  const input = document.getElementById('globalSearch');
  const box   = document.getElementById('searchResults');
  if (!input || !box) return;

  const pages = [
    { label:'Dashboard',       href:'dashboard.html',   icon:'i-grid'     },
    { label:'My Itineraries',  href:'itineraries.html', icon:'i-pin'      },
    { label:'Packages',        href:'packages.html',    icon:'i-package'  },
    { label:'Bookings',        href:'bookings.html',    icon:'i-calendar' },
    { label:'Messages',        href:'messages.html',    icon:'i-mail'     },
    { label:'Settings',        href:'settings.html',    icon:'i-settings' },
    { label:'New Trip',        href:'new-trip.html',    icon:'i-plus'     },
    { label:'New Booking',     href:'new-booking.html', icon:'i-plus'     },
    { label:'Trip Builder',    href:'trip-builder.html',icon:'i-map'      }
  ];

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { box.classList.remove('open'); return; }

    const state = getState();
    let results = [];

    // Page results
    pages.filter(p => p.label.toLowerCase().includes(q)).forEach(p => {
      results.push({ label: p.label, sub: 'Page', href: p.href, icon: p.icon });
    });
    // Booking results
    state.bookings.filter(b =>
      b.provider.toLowerCase().includes(q) || b.ref.toLowerCase().includes(q) || b.customer.toLowerCase().includes(q)
    ).slice(0,3).forEach(b => {
      results.push({ label: b.provider, sub: `Booking #${b.ref}`, href:'bookings.html', icon:'i-calendar' });
    });
    // Trip results
    state.trips.filter(t =>
      t.name.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q)
    ).slice(0,3).forEach(t => {
      results.push({ label: t.name, sub: t.destination, href:'itineraries.html', icon:'i-pin' });
    });

    if (!results.length) {
      box.innerHTML = `<div class="search-result-item" style="color:var(--text-faint)">No results found</div>`;
    } else {
      box.innerHTML = results.map(r => `
        <a class="search-result-item" href="${r.href}">
          <svg class="icon"><use href="#${r.icon}"/></svg>
          <div><div style="font-weight:600">${escHtml(r.label)}</div><div style="font-size:11.5px;color:var(--text-faint)">${escHtml(r.sub)}</div></div>
        </a>`).join('');
    }
    box.classList.add('open');
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !box.contains(e.target)) box.classList.remove('open');
  });
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS PANEL
// ─────────────────────────────────────────────────────────────
function renderNotifPanel() {
  return `
  <div id="notifPanel" style="display:none;position:fixed;top:70px;right:24px;z-index:300;width:340px;background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(16,24,54,.18);border:1px solid var(--border);overflow:hidden;animation:scaleIn .2s ease">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid var(--border)">
      <strong style="font-size:14px">Notifications</strong>
      <button onclick="markAllRead()" style="font-size:12px;color:var(--blue-600);background:none;border:none;cursor:pointer;font-weight:600">Mark all read</button>
    </div>
    <div id="notifList" style="max-height:320px;overflow-y:auto"></div>
    <div style="padding:12px 18px;border-top:1px solid var(--border);text-align:center">
      <a href="dashboard.html" style="font-size:13px;color:var(--blue-600);font-weight:600">View all notifications</a>
    </div>
  </div>`;
}

function renderNotifPanel_items() {
  const state = getState();
  const list = document.getElementById('notifList');
  if (!list) return;
  if (!state.notifications.length) {
    list.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-faint);font-size:13px">No notifications</div>`;
    return;
  }
  const iconMap = { booking:'i-calendar', trip:'i-pin', message:'i-mail', info:'i-info' };
  list.innerHTML = state.notifications.map(n => `
    <div style="display:flex;gap:12px;padding:14px 18px;border-bottom:1px solid var(--border);background:${n.read ? '#fff' : '#f8f9ff'};cursor:pointer" onclick="readNotif(${n.id})">
      <div style="width:34px;height:34px;border-radius:9px;background:var(--blue-100);display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg class="icon" style="width:16px;height:16px;stroke:var(--blue-600)"><use href="#${iconMap[n.type]||'i-info'}"/></svg>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:${n.read ? '500' : '700'}">${escHtml(n.title)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(n.body)}</div>
      </div>
      ${!n.read ? `<div style="width:8px;height:8px;border-radius:50%;background:var(--blue-600);flex-shrink:0;margin-top:4px"></div>` : ''}
    </div>`).join('');
}

function tmInitNotifPanel() {
  renderNotifPanel_items();
  document.addEventListener('click', e => {
    const panel = document.getElementById('notifPanel');
    const bell  = document.querySelector('.topbar-icon-btn.bell');
    if (panel && panel.style.display === 'block' && !panel.contains(e.target) && !bell?.contains(e.target)) {
      panel.style.display = 'none';
    }
  });
}

function toggleNotifPanel() {
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  renderNotifPanel_items();
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function readNotif(id) {
  const state = getState();
  const n = state.notifications.find(x => x.id === id);
  if (n) n.read = true;
  setState({ notifications: state.notifications });
  renderNotifPanel_items();
  updateNotifDot();
}

function markAllRead() {
  const state = getState();
  state.notifications.forEach(n => n.read = true);
  setState({ notifications: state.notifications });
  renderNotifPanel_items();
  updateNotifDot();
  showToast('All notifications marked as read', 'success');
}

function updateNotifDot() {
  const dot   = document.getElementById('notifDot');
  const state = getState();
  const unread = state.notifications.filter(n => !n.read).length;
  if (dot) dot.style.display = unread > 0 ? '' : 'none';
}

// ─────────────────────────────────────────────────────────────
// TOAST NOTIFICATIONS
// ─────────────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) {
    document.body.insertAdjacentHTML('beforeend', '<div class="tm-toast-wrap" id="toastWrap"></div>');
    wrap = document.getElementById('toastWrap');
  }
  const iconMap = {
    success: '<path d="M20 6L9 17l-5-5"/>',
    error:   '<circle cx="12" cy="12" r="9.5"/><path d="M15 9l-6 6M9 9l6 6"/>',
    warning: '<path d="M10.3 3.3L2 20h20L13.7 3.3a2 2 0 0 0-3.4 0z"/><path d="M12 9v5"/><circle cx="12" cy="17" r=".5" fill="currentColor"/>',
    info:    '<circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r=".4" fill="currentColor"/>'
  };
  const toast = document.createElement('div');
  toast.className = `tm-toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconMap[type] || iconMap.info}</svg></div>
    <span>${escHtml(message)}</span>`;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ─────────────────────────────────────────────────────────────
// ACCORDIONS
// ─────────────────────────────────────────────────────────────
function tmInitAccordions() {
  document.querySelectorAll('.acc-head').forEach(h => {
    h.addEventListener('click', () => h.closest('.acc-item').classList.toggle('open'));
  });
}

// ─────────────────────────────────────────────────────────────
// TAB GROUPS
// ─────────────────────────────────────────────────────────────
function tmInitTabs() {
  document.querySelectorAll('[data-tabgroup]').forEach(group => {
    const gName = group.getAttribute('data-tabgroup');
    const triggers = group.querySelectorAll('[data-tab]');
    triggers.forEach(t => {
      t.addEventListener('click', () => {
        triggers.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        document.querySelectorAll(`[data-tabpanel][data-tabgroup-for="${gName}"]`).forEach(p => {
          p.style.display = p.getAttribute('data-tabpanel') === t.getAttribute('data-tab') ? '' : 'none';
        });
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────
// PILL TABS (booking filter etc.)
// ─────────────────────────────────────────────────────────────
function tmInitPillTabs() {
  document.querySelectorAll('.pill-tabs').forEach(group => {
    group.querySelectorAll('.pill-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        group.querySelectorAll('.pill-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.filter;
        if (target) {
          document.querySelectorAll('[data-filter-row]').forEach(row => {
            row.style.display = (target === 'all' || row.dataset.filterRow === target) ? '' : 'none';
          });
        }
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────
// HELP MODAL
// ─────────────────────────────────────────────────────────────
function renderHelpModal() {
  return `
  <div class="tm-modal-overlay" id="helpModal">
    <div class="tm-modal tm-modal-wide">
      <button class="tm-modal-close" onclick="closeHelpModal()">&times;</button>
      <div class="tm-modal-icon" style="background:var(--blue-100)">
        <svg class="icon" style="stroke:var(--blue-600)" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.4a2.8 2.8 0 1 1 4.1 2.5c-.9.5-1.3 1-1.3 2v.4"/><circle cx="12" cy="17" r=".35" fill="currentColor"/></svg>
      </div>
      <div class="tm-modal-h">Help &amp; Support</div>
      <div class="tm-modal-sub">Get assistance with TripMate or contact our support team</div>
      <div class="help-tabs">
        <button class="help-tab active" onclick="switchHelpTab('faq',this)">FAQ</button>
        <button class="help-tab" onclick="switchHelpTab('contact',this)">Contact Support</button>
      </div>
      <div class="help-content active" id="help-faq">
        <div class="faq-group">
          <h4>Getting Started</h4>
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">How do I create my first trip? <svg class="icon chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="faq-a"><p>Click the "+ New Trip" button in the topbar or go to <a href="new-trip.html" style="color:var(--blue-600)">New Trip</a>. You can also browse Packages to book a pre-built itinerary.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">How do I book flights and hotels? <svg class="icon chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="faq-a"><p>Use the Quick Actions on your <a href="dashboard.html" style="color:var(--blue-600)">Dashboard</a> or go to <a href="new-booking.html" style="color:var(--blue-600)">New Booking</a> to log a flight, hotel, or excursion.</p></div>
          </div>
        </div>
        <div class="faq-group">
          <h4>Trip Management</h4>
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">Can I modify my itinerary after creating it? <svg class="icon chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="faq-a"><p>Yes! Visit <a href="itineraries.html" style="color:var(--blue-600)">My Itineraries</a> and click Edit on any trip, or open the <a href="trip-builder.html" style="color:var(--blue-600)">Trip Builder</a> to add/remove activities.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">How does the packing list work? <svg class="icon chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="faq-a"><p>Your packing list appears on the Dashboard. Click checkboxes to mark items packed, and use "+ Add Item" to add new ones.</p></div>
          </div>
        </div>
        <div class="faq-group">
          <h4>Account &amp; Settings</h4>
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">How do I update my profile? <svg class="icon chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="faq-a"><p>Go to <a href="settings.html" style="color:var(--blue-600)">Settings</a> to update your name, email, phone, avatar, and password.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">Is my data secure? <svg class="icon chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="faq-a"><p>Yes — all data in this demo is stored locally in your browser using localStorage. Nothing is sent to a server in this static version.</p></div>
          </div>
        </div>
        <div class="faq-group">
          <h4>AI Chatbot</h4>
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">How do I use the AI Assistant? <svg class="icon chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="faq-a"><p>Click the purple gradient button at the bottom-right of any app page. The assistant uses the Gemini API. You need to enter your Gemini API key in the chat settings (gear icon) — get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--blue-600)">aistudio.google.com</a>.</p></div>
          </div>
        </div>
      </div>
      <div class="help-content" id="help-contact" style="display:none">
        <form id="helpContactForm" onsubmit="submitHelpContact(event)">
          <div class="contact-form">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required placeholder="your@email.com">
            </div>
            <div class="form-group">
              <label>Subject</label>
              <select name="subject" required>
                <option value="">Select a topic</option>
                <option value="booking">Booking Issues</option>
                <option value="account">Account Problems</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Questions</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea name="message" required rows="5" placeholder="Please describe your issue in detail..."></textarea>
            </div>
            <div class="contact-methods">
              <h5>Other Ways to Reach Us</h5>
              <div class="contact-method"><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> support@tripmate.com</div>
              <div class="contact-method"><svg class="icon" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z"/></svg> 1-800-874-7628</div>
              <div class="contact-method"><svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r=".4" fill="currentColor"/></svg> Live Chat: Click the AI button (bottom-right)</div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}

function openHelpModal()  { document.getElementById('helpModal')?.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeHelpModal() { document.getElementById('helpModal')?.classList.remove('open'); document.body.style.overflow = ''; }

function switchHelpTab(tab, btn) {
  document.querySelectorAll('.help-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ['faq','contact'].forEach(id => {
    const el = document.getElementById(`help-${id}`);
    if (el) el.style.display = id === tab ? '' : 'none';
    const el2 = document.getElementById(`help-${id}`);
    if (el2) el2.className = 'help-content' + (id === tab ? ' active' : '');
  });
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  item.classList.toggle('open');
}

function submitHelpContact(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  if (!fd.get('email') || !fd.get('subject') || !fd.get('message')) {
    showToast('Please fill in all fields', 'error'); return;
  }
  // Simulate sending
  const ticketId = 'TK-' + Math.floor(10000 + Math.random() * 90000);
  showToast(`Message sent! Ticket ID: ${ticketId}`, 'success');
  e.target.reset();
  closeHelpModal();
}

// ─────────────────────────────────────────────────────────────
// BOOKING DETAIL MODAL
// ─────────────────────────────────────────────────────────────
function openBookingModal(id) {
  const state = getState();
  const bk = state.bookings.find(b => b.id === id);
  if (!bk) return;
  const statusClass = bk.status === 'Confirmed' ? 'badge-green' : bk.status === 'Pending' ? 'badge-amber' : 'badge-red';
  showModal({
    icon: '🗓️', iconBg: 'var(--blue-100)',
    title: `Booking #${bk.ref}`,
    subtitle: bk.provider,
    content: `
      <div class="booking-detail-row"><span class="label">Type</span><span class="value">${escHtml(bk.type)}</span></div>
      <div class="booking-detail-row"><span class="label">Customer</span><span class="value">${escHtml(bk.customer)}</span></div>
      <div class="booking-detail-row"><span class="label">Provider</span><span class="value">${escHtml(bk.provider)}</span></div>
      <div class="booking-detail-row"><span class="label">Travel Dates</span><span class="value">${escHtml(bk.dates)}</span></div>
      <div class="booking-detail-row"><span class="label">Amount</span><span class="value">$${bk.amount.toLocaleString()}</span></div>
      <div class="booking-detail-row"><span class="label">Status</span><span class="value"><span class="badge ${statusClass}">${bk.status}</span></span></div>`,
    actions: `<button class="btn btn-outline" onclick="closeModal()">Close</button>
              <a href="bookings.html" class="btn btn-primary">View All Bookings</a>`
  });
}

// ─────────────────────────────────────────────────────────────
// GENERIC MODAL
// ─────────────────────────────────────────────────────────────
function showModal({ icon, iconBg, title, subtitle, content, actions, wide }) {
  let overlay = document.getElementById('genericModal');
  if (!overlay) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="tm-modal-overlay" id="genericModal">
        <div class="tm-modal" id="genericModalBox">
          <button class="tm-modal-close" onclick="closeModal()">&times;</button>
          <div id="genericModalContent"></div>
        </div>
      </div>`);
    overlay = document.getElementById('genericModal');
  }
  const box = document.getElementById('genericModalBox');
  box.className = 'tm-modal' + (wide ? ' tm-modal-wide' : '');
  document.getElementById('genericModalContent').innerHTML = `
    ${icon ? `<div class="tm-modal-icon" style="background:${iconBg||'var(--blue-100)'};font-size:22px">${icon}</div>` : ''}
    <div class="tm-modal-h">${title}</div>
    ${subtitle ? `<div class="tm-modal-sub">${subtitle}</div>` : ''}
    ${content || ''}
    ${actions ? `<div class="tm-modal-footer">${actions}</div>` : ''}`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('genericModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────────────────────────
// CONFIRM MODAL
// ─────────────────────────────────────────────────────────────
function showConfirm(message, onConfirm) {
  showModal({
    icon: '⚠️', iconBg: 'var(--red-50)',
    title: 'Confirm Action',
    subtitle: message,
    actions: `
      <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="closeModal();(${onConfirm.toString()})()">Confirm</button>`
  });
}

// ─────────────────────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────────────────────
function tmLogout() {
  showConfirm('Are you sure you want to log out?', function() {
    showToast('Logged out successfully', 'info');
    setTimeout(() => window.location.href = 'login.html', 800);
  });
}

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────
function escHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function daysUntil(dateStr) {
  if (!dateStr) return '';
  const now  = new Date(); now.setHours(0,0,0,0);
  const then = new Date(dateStr + 'T00:00:00');
  const diff = Math.round((then - now) / 86400000);
  if (diff > 0)  return `Departs in ${diff} day${diff !== 1 ? 's' : ''}`;
  if (diff === 0) return 'Departing today!';
  return `Departed ${Math.abs(diff)} day${Math.abs(diff) !== 1 ? 's' : ''} ago`;
}

function starRating(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<svg class="icon ${i <= Math.round(rating) ? 'star-on' : 'star-off'}" viewBox="0 0 24 24"><use href="#i-star"/></svg>`;
  }
  return html;
}

// ─────────────────────────────────────────────────────────────
// KEYBOARD / GLOBAL EVENT HANDLERS
// ─────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeHelpModal();
    const panel = document.getElementById('notifPanel');
    if (panel) panel.style.display = 'none';
  }
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('tm-modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ─────────────────────────────────────────────────────────────
// DOMContentLoaded — init common behaviors
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  tmInitAccordions();
  tmInitTabs();
  tmInitPillTabs();
});
