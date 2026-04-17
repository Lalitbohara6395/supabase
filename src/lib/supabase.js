// lib/superbase.js
import { createClient } from '@supabase/supabase-js';

// Environment variables se URL aur Key lo
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase client create karo
export const supabase = createClient(supabaseUrl, supabaseAnonKey);