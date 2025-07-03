'use server'

import{redirect}from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createEvent(formData) {
  const supabase = await createClient();
    const user = await supabase.auth.getUser();
  if (!user.data.user) {
    console.error('User not authenticated');
    redirect('/login');
  }

  //generate a unique random code for the event from 5 characters
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const eventData = {
    code : generateRandomCode(),
    name: formData.get('qna-name'),
    admin_id: user.data.user.id,
  };
  console.log(eventData)


  const { data, error } = await supabase
    .from('events')
    .insert([eventData]).select();
    

  if (error) {
    console.error('Error creating event:', error);
    redirect('/error');
  }

  redirect("/q&a/event/dashboard");
}

export async function joinEvent(formData) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    console.error('User not authenticated');
    redirect('/login');
  }

  const eventName = formData.get('name');
  const eventCode = formData.get('code');

  // Check if the event exists
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('name', eventName).eq('code', eventCode)
    .single();

  if (eventError || !event) {
    console.error('Event not found:', eventError);
    redirect('/error');
  }


  // Join the event logic can be added here
  const { data: joinData, error: joinError } = await supabase
    .from('')
    .insert([{ event_id: event.id, user_id: user.data.user.id }]);

  redirect(`/q&a/${eventName}`);
}