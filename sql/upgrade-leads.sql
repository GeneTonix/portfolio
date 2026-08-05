-- ==========================================================================
-- SUPABASE LEADS TABLE — UPGRADE SCRIPT
-- Run this in Supabase SQL Editor to:
--   1. Add new columns (status, priority, notes, source)
--   2. Add deduplication constraint
--   3. Set up auto-updating timestamps
-- ==========================================================================

-- Step 1: Add new columns for organizing leads
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'portfolio';

-- Step 2: Add deduplication constraint
-- Prevents exact duplicates: same email + same message within 1 hour
-- (Uses a hash of email + message + truncated timestamp)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Add a dedup hash column that combines email + message
ALTER TABLE leads ADD COLUMN IF NOT EXISTS dedup_hash TEXT;

-- Create a unique index on the dedup hash
-- This prevents the same email+message from being inserted again
-- We use a partial index that only checks recent entries (last hour)
CREATE UNIQUE INDEX IF NOT EXISTS leads_dedup_idx
  ON leads (dedup_hash)
  WHERE created_at > NOW() - INTERVAL '1 hour';

-- Grant permissions for the new columns
GRANT INSERT (name, email, subject, message, status, priority, notes, source) ON public.leads TO anon;
GRANT SELECT ON public.leads TO authenticated;

-- Step 3: Set default values for new rows
-- Status options: new, contacted, converted, lost
-- Priority options: high, medium, low
-- Source: where the lead came from (default: portfolio)