import { existsSync, readFileSync } from 'node:fs';

function loadLocalEnv() {
  const envPath = '.env.local';
  if (!existsSync(envPath)) return;

  const env = readFileSync(envPath, 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (!match) continue;

    process.env[match[1].trim()] ??= match[2].trim();
  }
}

async function testConnection() {
  try {
    loadLocalEnv();
    const { supabase, isSupabaseConfigured } = await import('./src/lib/supabase');
    if (!isSupabaseConfigured() || !supabase) {
      console.error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local');
      return false;
    }
    const { data, error } = await supabase.from('teams').select('*').limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    console.log('Supabase connection successful:', data);
    return true;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    return false;
  }
}

testConnection().then((success) => {
  if (success) {
    console.log('Supabase connection test passed');
  } else {
    console.log('Supabase connection test failed');
  }
});
