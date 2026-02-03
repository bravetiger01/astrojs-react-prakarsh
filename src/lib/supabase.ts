import { createClient } from "@supabase/supabase-js";

// In Astro, use PUBLIC_ prefix for client-side environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const missing: string[] = [];
  if (!supabaseUrl) missing.push("PUBLIC_SUPABASE_URL");
  if (!supabaseAnonKey) missing.push("PUBLIC_SUPABASE_ANON_KEY");
  
  console.error("Environment variables:", {
    supabaseUrl: supabaseUrl ? "✓ Set" : "✗ Missing",
    supabaseAnonKey: supabaseAnonKey ? "✓ Set" : "✗ Missing",
    allEnvVars: import.meta.env
  });
  
  throw new Error(
    `Missing Supabase env: ${missing.join(", ")}. Add them to .env.local at project root with PUBLIC_ prefix and restart the dev server.`,
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
