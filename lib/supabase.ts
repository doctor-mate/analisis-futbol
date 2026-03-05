import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side client with service role (for admin operations)
// Lazy-initialized to avoid build failures when the key is not set
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;
export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
    _supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key);
  }
  return _supabaseAdmin;
}
