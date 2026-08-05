# Supabase Setup Guide — Complete

This guide covers everything you need to set up in Supabase for:
1. New columns for organizing leads
2. Email notifications to you (with Gmail "Lead" category)
3. Auto-respond emails to clients
4. Telegram notifications
5. Database-level deduplication

---

## PART 1: Add New Columns + Deduplication (SQL)

### Step 1: Run the upgrade SQL
1. Go to Supabase dashboard → **SQL Editor** → **New Query**
2. Paste this SQL:

```sql
-- Add new columns
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'portfolio';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS dedup_hash TEXT;

-- Add dedup unique index (prevents same email+message within 1 hour)
CREATE UNIQUE INDEX IF NOT EXISTS leads_dedup_idx
  ON leads (dedup_hash)
  WHERE created_at > NOW() - INTERVAL '1 hour';

-- Grant insert permissions for new columns
GRANT INSERT (name, email, subject, message, status, priority, source, dedup_hash) ON public.leads TO anon;
```

3. Click **Run**
4. You should see "Success. No rows returned"

### Step 2: Verify columns
1. Go to **Table Editor** → **leads**
2. You should now see these columns:
   - id, name, email, subject, message, created_at
   - **status** (default: "new")
   - **priority** (default: "medium")
   - **notes** (default: empty)
   - **source** (default: "portfolio")
   - **dedup_hash** (used internally for dedup)

---

## PART 2: Email Notifications (via Resend — free)

### Step 1: Create a Resend account (free, 3000 emails/month)
1. Go to [resend.com](https://resend.com) → Sign up (free)
2. Go to **API Keys** → **Create API Key**
3. Copy your API key (starts with `re_...`)
4. Go to **Domains** → you'll see `onboarding@resend.dev` is already verified (free testing domain)

### Step 2: Add Resend key to Supabase
1. Go to Supabase dashboard → **Project Settings** (gear icon)
2. Go to **Edge Functions** → **Secrets**
3. Click **Add Secret**
4. Name: `RESEND_API_KEY`
5. Value: paste your Resend API key
6. Click **Save**

### Step 3: Add your email for notifications
1. Same Secrets page → **Add Secret**
2. Name: `NOTIFY_EMAIL`
3. Value: `gchuazj@gmail.com`
4. Click **Save**

---

## PART 3: Telegram Notifications

### Step 1: Get your Telegram bot token
You already have a bot (@kimagez_bot). If you want to use a SEPARATE bot for portfolio notifications:
1. Open Telegram → search `@BotFather` → send `/newbot`
2. Follow the prompts to name it (e.g. "Portfolio Leads Bot")
3. Copy the bot token (looks like `123456789:ABCdefGHIjklMNO...`)

OR use your existing bot token — it's in your Hermes config at:
`C:\Users\gchua\AppData\Local\hermes\config.yaml` under `bot_token`

### Step 2: Add Telegram secrets to Supabase
1. Go to Supabase → **Project Settings** → **Edge Functions** → **Secrets**
2. Add two secrets:
   - Name: `TELEGRAM_BOT_TOKEN` → Value: your bot token
   - Name: `TELEGRAM_CHAT_ID` → Value: `683970124`

---

## PART 4: Deploy the Edge Function

The Edge Function code is already written at:
`C:\Users\gchua\portfolio\supabase\functions\new-lead-notification\index.ts`

### Step 1: Deploy it
You have two options:

**Option A: Via Supabase Dashboard (easiest)**
1. Go to Supabase → **Edge Functions** (left sidebar)
2. Click **New Function**
3. Name: `new-lead-notification`
4. Paste the entire contents of the file:
   `C:\Users\gchua\portfolio\supabase\functions\new-lead-notification\index.ts`
5. Click **Deploy**

**Option B: Via Supabase CLI**
```bash
cd C:\Users\gchua\portfolio
npx supabase functions deploy new-lead-notification
```

### Step 2: Set up the database webhook
This makes the function run automatically when a new lead arrives:
1. Go to Supabase → **Database** → **Webhooks** (left sidebar)
2. Click **Create Webhook**
3. Name: `new-lead-webhook`
4. Table: `leads`
5. Event: `INSERT`
6. Function: `new-lead-notification`
7. Click **Save**

---

## PART 5: Gmail Filter for Lead Emails

After you receive the first email notification, set up a Gmail filter:

1. Open Gmail
2. Search: `subject:[NEW LEAD]`
3. Click the **three dots** (right of search bar) → **Create filter**
4. Check: **Apply the label** → Create new label → name it "Leads"
5. Check: **Skip Inbox (Archive it)** — OPTIONAL (if you want leads to go straight to the label, not inbox)
6. Check: **Also apply filter to matching conversations**
7. Click **Create filter**

Result: All lead notification emails (with `[NEW LEAD]` in subject) go straight to your "Leads" label/category. Supabase system emails (updates, billing) stay in your normal inbox.

---

## Testing

After all setup is complete:
1. Open your portfolio website
2. Fill in the contact form with test data
3. You should receive:
   - An email to gchuazj@gmail.com with `[NEW LEAD]` in subject
   - A Telegram message on your phone
   - The client email gets an auto-respond confirmation
4. Check Supabase → Table Editor → leads → verify the new lead is there

---

## Summary of What's Set Up

| Feature | Status | How |
|---------|--------|-----|
| Contact form → Supabase | ✅ Done | Form sends to leads table via REST API |
| New columns (status, priority, notes, source) | ⬜ Run SQL in Part 1 | Organize and track leads |
| Deduplication (frontend) | ✅ Done | Button disable + 30-second same-message block |
| Deduplication (database) | ⬜ Run SQL in Part 1 | Unique index on dedup_hash |
| Email notification to you | ⬜ Add Resend key + deploy function | [NEW LEAD] in subject → Gmail "Leads" label |
| Auto-respond to client | ⬜ Same edge function | Sends confirmation email |
| Telegram notification | ⬜ Add bot token + deploy function | Sends message to your Telegram |
| Gmail "Leads" label filter | ⬜ Create filter in Gmail | Auto-categorize lead emails |