# Portfolio Website — Content Replacement Checklist

This checklist shows every placeholder you need to replace with your real content.

## File Structure

```
portfolio/
├── index.html          ← Main page (all 10 sections)
├── css/
│   ├── styles.css      ← Main stylesheet
│   └── themes.css      ← Dark mode variables
├── js/
│   └── main.js         ← Theme toggle, project data, filters, modal, animations
├── images/             ← Add your project screenshots here
└── README.md           ← This file
```

## How to Use

1. Open `index.html` in a browser to preview.
2. Replace all `[PLACEHOLDER]` text with your real content.
3. Edit the `projects` array in `js/main.js` to add your real projects.
4. Add project screenshots to `images/` and update the `thumbnail` field.
5. Deploy by uploading the `portfolio/` folder to any static host (GitHub Pages, Netlify, Vercel, etc.).

---

## Checklist — What to Replace

### 1. Global / Branding
- [ ] `[YOUR NAME]` — Your name (appears in nav, hero, footer, title tag)
- [ ] `[YOUR ROLE / TITLE]` — e.g. "Full-Stack Web Developer"
- [ ] `[VALUE PROPOSITION]` — One-line business-outcome statement
- [ ] `[SHORT INTRO]` — 2-3 sentences in the hero
- [ ] `[TRUST LINE]` — e.g. "5+ projects shipped · Full-stack capabilities"
- [ ] Favicon — Uncomment and set `<link rel="icon">` in `<head>`
- [ ] Open Graph image — Uncomment `<meta property="og:image">`

### 2. Capability Cards (Section 2)
- [ ] Each of 6 cards: `[Short explanation]` and `[Key outcome]` fields
- [ ] Adjust card titles if you want different service categories

### 3. Projects (Section 3 + JS data)
In `js/main.js`, edit the `projects` array. For each project:
- [ ] `title` — Project name
- [ ] `category` — Used for filter buttons
- [ ] `summary` — One-line description
- [ ] `thumbnail` — Path to screenshot (e.g. `"images/project1.png"`)
- [ ] `stack` — Array of technologies used
- [ ] `architecture` — `"fe"`, `"fbe"`, or `"full"`
- [ ] `liveDemo` — URL or empty string
- [ ] `githubFrontend` / `githubBackend` — Repo URLs
- [ ] `features` — Array of key features
- [ ] `tags` — Array of capability tags
- [ ] `database`, `hosting`, `payment` — Architecture details
- [ ] `status` — `"live"` or `"in-progress"`
- [ ] Add more project objects to the array to scale

### 4. Case Studies (Section 4)
- [ ] `[PROJECT PROBLEM]` — What challenge was the client facing?
- [ ] `[PROJECT GOAL]` — What was the desired outcome?
- [ ] `[PROJECT SOLUTION]` — What did you build?
- [ ] `[KEY CHALLENGE FACED]` — What was hard?
- [ ] `[PROJECT RESULT]` — What was the outcome?
- [ ] `[WHAT I WOULD IMPROVE NEXT]` — Reflection on next steps
- [ ] `[Add metric later]` / `[Replace with...]` — Add real metrics when available

### 5. Workflow (Section 5)
- [ ] Each of 5 steps: `[Short plain-English explanation]`

### 6. Stack & Systems (Section 6)
- [ ] `[FRONTEND TECH]`, `[BACKEND TECH]`, `[DATABASE TECH]`
- [ ] `[DEPLOYMENT TOOLS]`, `[API / AUTOMATION TOOLS]`

### 7. About (Section 7)
- [ ] `[ABOUT ME]` — Professional introduction
- [ ] `[WHO I HELP]` — Ideal client types
- [ ] `[HOW I WORK]` — Your approach
- [ ] `[PHOTO PLACEHOLDER]` — Add `images/avatar.jpg` and uncomment `<img>` tag
- [ ] `[OPTIONAL PERSONAL NOTE]` — Brief personal touch

### 8. Proof (Section 8)
- [ ] `[NUMBER OF PROJECTS]`
- [ ] `[YEARS OF EXPERIENCE]`
- [ ] `[GITHUB PROFILE LINK]` and `[GITHUB USERNAME]`
- [ ] `[CURRENT PROJECT]` — What you're building now
- [ ] `[TESTIMONIAL 1]` / `[TESTIMONIAL 2]` — Client quotes (or remove blocks)

### 9. Contact (Section 9)
- [ ] `[EMAIL]` — Your email (also in `mailto:` link)
- [ ] `[GITHUB]` — GitHub profile URL
- [ ] `[LINKEDIN]` — LinkedIn profile URL
- [ ] `[WHATSAPP OR TELEGRAM]` — Messaging app link
- [ ] Supabase keys — Add to `js/supabase-config.js` (see "Supabase Setup" above)
- [ ] `[RESPONSE TIME]` — e.g. "24 hours" (shown under the form)

### 10. Footer
- [ ] `[SHORT CLOSING LINE]` — Tagline
- [ ] All social links (same as contact section)
- [ ] Copyright name

---

## Deployment Quick-Start (GitHub Pages)

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio site"
git remote add origin https://github.com/[YOUR_USERNAME]/portfolio.git
git push -u origin main
```
Then in GitHub repo Settings → Pages → Source → `main` branch → `/root` folder.

---

## Supabase Setup — Connect Your Contact Form (Free, ~5 minutes)

Your contact form is wired to send leads to **Supabase** — a free cloud database that's always online, so it works perfectly with GitHub Pages. No server, no PHP, no monthly fees.

### Step 1: Create a Supabase account
1. Go to [supabase.com](https://supabase.com) → Sign up (free with GitHub or email)
2. Click **New Project**
3. Name it whatever you like (e.g. `portfolio-leads`)
4. Set a database password (save this somewhere — you won't need it often)
5. Choose a region close to you (e.g. `Southeast Asia (Singapore)`)
6. Wait ~2 minutes for the database to provision

### Step 2: Create the leads table
1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste this SQL and click **Run**:

```sql
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone (the contact form) to INSERT new leads
CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only allow authenticated users (you, logged into Supabase) to READ leads
CREATE POLICY "Only authenticated users can read leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);
```

### Step 3: Get your API keys
1. Go to **Settings** (gear icon, bottom left) → **API**
2. Copy your **Project URL** — looks like `https://abcdefgh.supabase.co`
3. Copy your **anon public** key — a long string starting with `eyJ...`

### Step 4: Add keys to your portfolio
1. Open `js/supabase-config.js`
2. Replace the two placeholders:

```js
const SUPABASE_URL = 'https://abcdefgh.supabase.co';        // YOUR URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5...';   // YOUR KEY
```

3. Save the file. Done — your form is now connected.

### Step 5: View your leads
- Go to your Supabase dashboard → **Table Editor** (left sidebar) → **leads**
- Every form submission appears here as a new row
- You can sort, filter, and export to CSV

### How it works
```
Client fills form → Portfolio JS → Supabase REST API → leads table
                                                   → You view in dashboard
```

- No server to maintain
- No laptop needed (works even when your computer is off)
- Works on GitHub Pages, Netlify, Vercel — any free static host
- The `anon` key is safe for frontend code — it can only INSERT, not read/delete (unless you allow it)

### Optional: Move leads to your LeadFlow CRM later
If you want leads in your existing MySQL CRM:
1. Export from Supabase as CSV (Table Editor → Export → CSV)
2. Import into LeadFlow
3. Or I can write a script that auto-copies Supabase → MySQL on a schedule

## Adding New Projects Later

1. Open `js/main.js`
2. Find the `projects` array
3. Copy an existing project object
4. Paste it at the end of the array
5. Update all fields with the new project's details
6. Refresh — the card, filter, and modal all update automatically