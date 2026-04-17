import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: fetch all todos
export async function GET() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}

// POST: add new todo
export async function POST(request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          title: body.title,
          is_completed: false
        }
      ])
      .select(); // 👈 important

   if (error) {
  console.log("SUPABASE ERROR:", error); // 👈 ye add karo
  return NextResponse.json({ success: false, error: error.message }, { status: 500 });
}

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: remove todo
export async function DELETE(req) {
  const { id } = await req.json();

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// PUT: update todo (toggle checkbox)
export async function PUT(req) {
  const { id, is_completed } = await req.json();

  const { error } = await supabase
    .from('todos')
    .update({ is_completed })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}