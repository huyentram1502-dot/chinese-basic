
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gmgtjngxgytuwzxukrim.supabase.co'

const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_LzLoFZp0b39AT4IFxBZQ3Q_fHLJhECp'

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
)
