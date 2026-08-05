/* ==========================================================================
   SUPABASE CONFIG
   ==========================================================================
   This file stores your Supabase connection details.

   HOW TO GET THESE VALUES:
   1. Go to https://supabase.com and sign up (free)
   2. Create a new project (any name, e.g. "portfolio-leads")
   3. Wait ~2 minutes for the database to provision
   4. Go to Settings → API
   5. Copy your "Project URL" → paste below as SUPABASE_URL
   6. Copy your "anon public" key → paste below as SUPABASE_ANON_KEY

   SECURITY NOTE:
   The "anon public" key is SAFE to include in frontend code.
   It only allows inserts to tables you explicitly permit.
   It cannot read, modify, or delete data unless you allow it.
   Your database is protected by Row Level Security (RLS) policies.

   HOW TO CREATE THE LEADS TABLE:
   Go to Supabase → SQL Editor → paste and run:

   CREATE TABLE leads (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     subject TEXT,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Allow anyone to insert new leads (for the contact form)
   ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Anyone can submit a lead"
     ON leads FOR INSERT
     TO anon
     WITH CHECK (true);

   -- Optional: only allow YOUR authenticated sessions to read leads
   CREATE POLICY "Only authenticated users can read leads"
     ON leads FOR SELECT
     TO authenticated
     USING (true);
   ========================================================================== */

// ┌─────────────────────────────────────────────────────────┐
// │  REPLACE THESE WITH YOUR OWN SUPABASE VALUES              │
// │  Get them from: Supabase → Settings → API                 │
// └─────────────────────────────────────────────────────────┘
const SUPABASE_URL = 'https://brmjunwijnwoljeypnik.supabase.co';       // e.g. https://abcdefgh.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJybWp1bndpam53b2xqZXlwbmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MTkwMzEsImV4cCI6MjEwMTM5NTAzMX0.HQqGijektZyfiajj14eJsKd2sfsZTAdgZBUE8fV8-gg'; // long string starting with "eyJ..."

// Table name in your Supabase database
const LEADS_TABLE = 'leads';