'use server'

import{redirct}from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createEvent(formData) {
  const supabase = await createClient();
    const user = await supabase.auth.getUser();
  if (!user.data.user) {
    console.error('User not authenticated');
    redirect('/login');
  }

  const eventData = {
    title: formData.get('title'),
    description: formData.get('description'),
    date: formData.get('date'),
    time: formData.get('time'),
    user_id: user.data.user.id,
  };

  const { data, error } = await supabase
    .from('events')
    .insert([eventData]);

  if (error) {
    console.error('Error creating event:', error);
    redirect('/error');
  }

  redirect(`/q&a/${data[0].id}`);
}

export async function joinEvent(formData) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    console.error('User not authenticated');
    redirect('/login');
  }

  const eventId = formData.get('eventId');

  // Check if the event exists
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (eventError || !event) {
    console.error('Event not found:', eventError);
    redirect('/error');
  }

  // Join the event logic can be added here

  redirect(`/q&a/${eventId}`);
}