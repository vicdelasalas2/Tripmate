# ✈️ TripMate — Travel Planning Web App

A fully static, client-side travel planning dashboard built with pure **HTML, CSS, and JavaScript** — no backend, no build tools, no dependencies. Works locally with XAMPP or live on **GitHub Pages**.

![TripMate Dashboard](https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80)

---

## 🌐 Live Demo

https://vicdelasalas2.github.io/Tripmate/

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Dashboard** | Flight status, weather, today's itinerary, stats, packing list, quick actions |
| 📅 **Itineraries** | Day-by-day timeline view, add/remove activities, export to PDF |
| 🏗️ **Trip Builder** | Build trips day by day with a budget tracker and quick-add chips |
| 📦 **Packages** | Browse featured and curated travel packages, view details, book directly |
| 🗓️ **Bookings** | Track flights, hotels, and excursions with filter tabs and status badges |
| 💬 **Messages** | Split-pane inbox with live auto-replies and new message modal |
| ⚙️ **Settings** | Profile, team management, payment gateways, notification preferences |
| 🤖 **AI Chatbot** | Powered by Google Gemini — context-aware travel assistant |
| 🔔 **Notifications** | Live notification panel with unread badge and mark-all-read |
| 🔍 **Global Search** | Searches pages, trips, and bookings instantly |
| 📱 **Responsive** | Fully mobile-friendly with slide-out sidebar and touch support |

---

## 🤖 AI Chatbot Setup

The chatbot uses the **Google Gemini API** — free to use with a Google account.

### Get a free API key

1. Visit [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API key**
4. Copy the key: AQ.Ab8RN6I7fCazZh34kElqu0mqQiG05_OH-lmmOK_QKqZa3qXxWg

### Set the key in TripMate

**Option A — In the chat window:**
1. Open any app page and click the **purple bot button** (bottom-right)
2. Click **⚙️ API Key** at the bottom of the chat
3. Paste your key and press OK

**Option B — In Settings:**
1. Go to `settings.html`
2. Find the **🤖 AI Chatbot Key** card under the Profile tab
3. Paste your key → click **Save Key**

> The API key is stored in your browser's `localStorage` only. It never leaves your device and is not sent anywhere except directly to Google's API.

---

## 📁 Project Structure

```
tripmate-static/
│
├── index.html              # Landing page
├── login.html              # Sign in page
├── signup.html             # Create account page
├── forgot-password.html    # Password reset page
│
├── dashboard.html          # Main dashboard
├── itineraries.html        # Trip itinerary viewer
├── trip-builder.html       # Day-by-day trip builder
├── new-trip.html           # Create / edit a trip
│
├── bookings.html           # All bookings table
├── new-booking.html        # Create / edit a booking
│
├── packages.html           # Travel packages browser
├── messages.html           # Messaging inbox
├── settings.html           # Account settings (4 tabs)
│
├── css/
│   └── styles.css          # Complete design system (~54 KB)
│
├── js/
│   ├── app.js              # Shared layout, state, modals, search, toasts (~48 KB)
│   └── chatbot.js          # Gemini AI chatbot logic (~19 KB)
│
└── README.md               # This file
```

---

## 🗄️ Data & State

All app data is stored in **`localStorage`** under the key `tripmate_state`. This includes:

- User profile
- Trips and activities
- Bookings
- Packages
- Messages
- Packing list
- Notifications
- Chat history
- Notification preferences

Data persists across page reloads and browser sessions. To reset to demo data, open your browser's DevTools → Application → Local Storage → delete the `tripmate_state` key, then refresh.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary blue | `#2563eb` |
| Coral accent | `#f2684f` |
| Navy sidebar | `#0f1e45` |
| Background | `#f2f4f9` |
| Font | Inter (Google Fonts) |
| Border radius | `16px` (cards), `10px` (inputs) |

All design tokens are CSS custom properties in `css/styles.css` under `:root`.

---

## 🔑 Demo Credentials

The login page is pre-filled with demo credentials:

| Field | Value |
|---|---|
| Email | `sarah.mitchell@agency.com` |
| Password | `password123` |

Since there's no real backend, any email/password combination will log you in.

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Mobile (iOS/Android) | ✅ Full |

---

## 🛠️ Tech Stack

- **HTML5** — semantic markup, no frameworks
- **CSS3** — custom properties, flexbox, grid, animations
- **Vanilla JavaScript** — ES6+, no libraries or bundlers
- **Google Gemini API** — AI chatbot via `fetch()`
- **localStorage** — client-side data persistence
- **Google Fonts** — Inter typeface

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Travel photography from [Unsplash](https://unsplash.com)
- Icons drawn as inline SVG symbols
- AI powered by [Google Gemini](https://ai.google.dev)
