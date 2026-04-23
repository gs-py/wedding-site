# Wedding Photo Sharing Site

A public celebration site for the couple. Guests upload photos (name only, no signup), heart their favourites, leave wishes, and the couple can download everything at the end.

## Stack

- **React + Vite**, **Tailwind CSS**, **React Router v6**
- **Supabase** (Postgres + Storage + Auth for admin only)
- `browser-image-compression`, `lucide-react`, `react-hot-toast`, `jszip` + `file-saver`, `framer-motion`

## Quick start

```bash
npm install
cp .env.example .env.local      # fill in Supabase URL + anon key
npm run dev                     # http://localhost:5173
```

## Setup steps

### 1. Create a Supabase project
- Go to https://supabase.com → new project.
- From **Project Settings → API** copy:
  - `Project URL` → `VITE_SUPABASE_URL`
  - `anon public` key → `VITE_SUPABASE_ANON_KEY`

### 2. Run the schema
- Open **SQL editor** in Supabase.
- Paste the full contents of [`supabase/schema.sql`](supabase/schema.sql) and **Run**.
- This creates the `photos`, `hearts`, `wishes` tables, indexes, hearts-count trigger, RLS policies, the `wedding-photos` + `couple-photos` storage buckets (public), and storage RLS policies.

### 3. Create the admin account
- **Authentication → Users → Add user** (email + password). Disable email confirmation in dev if you like.
- Optional hardening: turn **off** "Allow new signups" so only you can sign in at `/admin`.

### 4. Configure env
Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_WEDDING_DATE=2025-12-15T18:00:00
VITE_BRIDE_NAME=Priya
VITE_GROOM_NAME=Arjun
VITE_VENUE_NAME=Grand Hyatt, Kochi
VITE_VENUE_ADDRESS=CP-1/390, Bristow Road, Willingdon Island, Kochi
VITE_VENUE_MAP_QUERY=Grand Hyatt Kochi Bolgatty
VITE_CONTACT_NAME=Rhea (Maid of Honor)
VITE_CONTACT_PHONE=+91 98765 43210
VITE_DRESS_CODE=Traditional Indian attire preferred
```

### 5. (Optional) Add couple photos
Swap the placeholders in `src/components/home/Hero.jsx` (`<Portrait />`) with `<img src="/couple/bride.jpg" />` etc., and drop the real photos in `src/assets/couple/` or `public/couple/`.

### 6. Run / deploy
```bash
npm run dev       # local
npm run build     # production build → dist/
npm run preview   # preview the prod build
```

Deploy `dist/` to Netlify, Vercel, Cloudflare Pages, or any static host. Make sure the env vars are configured in the deploy platform.

## Routes

| Path       | What                                         |
| ---------- | -------------------------------------------- |
| `/`        | Hero · countdown · welcome note              |
| `/event`   | Schedule · Google Map · dress code · contact |
| `/gallery` | Masonry grid · lightbox · heart · sort       |
| `/upload`  | Name + drag-drop · 10-photo cap per guest    |
| `/wishes`  | Guestbook form + wall of notes               |
| `/admin`   | Supabase Auth login · dashboard · zip export |

## How the limits work

Each browser generates a `guest_id` on first visit and stores it in `localStorage` ([`src/utils/guestId.js`](src/utils/guestId.js)). Before an upload we query `photos` by `guest_id` for a count and cap at **10 photos** total (across sessions on the same device). This is friendly-not-bulletproof — someone can clear storage and restart. Good enough for a wedding 🙂

## Storage layout

- `wedding-photos/<guest_id>/<timestamp>_<i>_<rand>.<ext>` — guest uploads
- `couple-photos/…` — bride/groom featured images (admin only)

## Color palette

- Blush `#F8E1E4` · Champagne `#D4AF7A` · Cream `#FFF8F0`
- Burgundy `#722F37` (accent) · Charcoal `#3D3D3D` (text)

## Project structure

```
src/
├── assets/couple/             bride.jpg, groom.jpg
├── components/
│   ├── layout/                Navbar, Footer
│   ├── home/                  Hero, Countdown, WelcomeMessage
│   ├── event/                 EventSchedule, VenueMap
│   ├── gallery/               PhotoGrid, PhotoCard, Lightbox, HeartButton
│   ├── upload/                UploadForm, Dropzone, PhotoPreview, UploadProgress
│   ├── wishes/                WishForm, WishCard, WishesWall
│   ├── admin/                 AdminLogin, AdminDashboard, DownloadAllButton
│   └── ui/                    Button, Input, Modal, Loader
├── pages/                     Home, Event, Gallery, Upload, Wishes, Admin
├── lib/supabase.js
├── hooks/                     usePhotos, useWishes, useUpload, useHearts
├── utils/                     compressImage, validateFile, guestId, downloadZip
├── context/GuestContext.jsx
├── App.jsx · main.jsx · index.css
supabase/schema.sql            ← run this in SQL editor
```

## Troubleshooting

- **Uploads 401/403** — check the `wedding-photos` bucket exists and is public, and that storage policies from `schema.sql` ran.
- **Admin can't delete photos** — ensure you're signed in at `/admin`. Public role can't delete.
- **Countdown shows wrong time** — `VITE_WEDDING_DATE` is parsed as local time if no zone; use ISO with offset, e.g. `2025-12-15T18:00:00+05:30`.
- **Map doesn't load** — tweak `VITE_VENUE_MAP_QUERY` to a more specific place name.
