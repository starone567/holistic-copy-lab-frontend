// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rumqopnpwlvkhdiurlqk.supabase.co'; // zamijeni svojim
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bXFvcG5wd2x2a2hkaXVybHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjQyNTMsImV4cCI6MjA2MzE0MDI1M30.MF6Dli4oTfJWvWH_3ObBwlVVrhHIVNSLteoif0PXvBA'; // zamijeni svojim

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
