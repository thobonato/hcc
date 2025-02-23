import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create a single Supabase admin client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  console.log('API Route hit:', request.url);

  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { action, data } = body;
    const { user_email } = data;

    if (!user_email) {
      return NextResponse.json({ error: 'User email required' }, { status: 400 });
    }

    switch (action) {
      case 'updateSettings': {
        const { ...settings } = data;
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
      }

      case 'getSettings': {
        const { data: settings, error } = await supabase
          .from('user_settings')
          .select()
          .eq('user_email', user_email)
          .single();
        
        if (error && error.code !== 'PGRST116') { // Ignore "not found" errors
          throw error;
        }
        return NextResponse.json({ settings: settings || null });
      }

      case 'createChatSession': {
        const { title } = data;
        const { data: session, error } = await supabase
          .from('chat_sessions')
          .insert([{ 
            user_email,
            title: title || 'New Chat'
          }])
          .select()
          .single();
        
        if (error) throw error;
        return NextResponse.json({ session });
      }

      case 'saveChatMessage': {
        const { session_id, content, is_user } = data;
        const { error } = await supabase
          .from('chat_messages')
          .insert([{
            session_id,
            content,
            is_user
          }]);
        
        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      case 'getChatSession': {
        const { session_id } = data;
        const { data: session, error: sessionError } = await supabase
          .from('chat_sessions')
          .select(`
            *,
            chat_messages (
              id,
              content,
              is_user,
              created_at
            )
          `)
          .eq('id', session_id)
          .eq('user_email', user_email)
          .single();
        
        if (sessionError) throw sessionError;
        return NextResponse.json({ session });
      }

      case 'getRecentChats': {
        const { data: sessions, error } = await supabase
          .from('chat_sessions')
          .select(`
            id,
            title,
            is_favorite,
            created_at,
            chat_messages (
              content,
              is_user,
              created_at
            )
          `)
          .eq('user_email', user_email)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        return NextResponse.json({ sessions: sessions || [] });
      }

      case 'toggleFavorite': {
        const { session_id, is_favorite } = data;
        const { error } = await supabase
          .from('chat_sessions')
          .update({ is_favorite })
          .eq('id', session_id)
          .eq('user_email', user_email);
        
        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}