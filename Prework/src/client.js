import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dmnatohfmwpajukiqisu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbmF0b2hmbXdwYWp1a2lxaXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODAyOTMsImV4cCI6MjA3MTQ1NjI5M30.0G0s6aMDvpu2tM8_e1IX3zokoHu3ZpDHrYssAm2Mlg4';

export const supabase = createClient(supabaseUrl, supabaseKey);
