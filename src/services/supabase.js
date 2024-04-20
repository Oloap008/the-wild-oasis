import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fzpajfmipjhmoifszhfa.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6cGFqZm1pcGpobW9pZnN6aGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NDM0MzMsImV4cCI6MjAyMzExOTQzM30.md4QqPkPPALkShdIZLGL9ELnnTUIsy4thV_Qax4cSTQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
