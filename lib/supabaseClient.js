import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lyprkxzylpnzstgrhnae.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5cHJreHp5bHBuenN0Z3JobmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NDc3NTQsImV4cCI6MjEwMDUyMzc1NH0.cg_6yhnjDEH_XqEByZH9v6KnHuxtUdboeVytRcE0uiw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
