// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://odcpfxyvnwgumopkjhnp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kY3BmeHl2bndndW1vcGtqaG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTMzMTksImV4cCI6MjA2NTU4OTMxOX0.3OeJsErsnsMzW60NewKUrrhHUMe4xMvefyZlx5kJFtI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);