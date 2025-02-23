import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json({ error: 'User email required' }, { status: 400 });
    }

    const { data: settings, error } = await supabase
      .from('user_settings')
      .select()
      .eq('user_email', userEmail)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore "not found" errors
      throw error;
    }

    return NextResponse.json({ settings: settings || null });
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_email, ...settings } = body;

    if (!user_email) {
      return NextResponse.json({ error: 'User email required' }, { status: 400 });
    }

    const { data: existingSettings } = await supabase
      .from('user_settings')
      .select()
      .eq('user_email', user_email)
      .single();

    if (existingSettings) {
      const { error } = await supabase
        .from('user_settings')
        .update(settings)
        .eq('user_email', user_email);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('user_settings')
        .insert([{ user_email, ...settings }]);

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 