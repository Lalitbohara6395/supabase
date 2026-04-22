'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    fetchTodos();
  }, []);*/

  // ✅ FETCH TODOS
  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos/supabase');
      const json = await res.json();
      if (json.success) setTodos(json.data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD TODO
  const addTodo = async (e) => {
    e.preventDefault();
    if (!input) return;

    try {
      const res = await fetch('/api/todos/supabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input }),
      });

      const json = await res.json();
      if (json.success) {
        setTodos([...json.data, ...todos]); // add on top
        setInput('');
      }
    } catch (error) {
      console.error('Failed to add:', error);
    }
  };

  // ✅ DELETE TODO
  const deleteTodo = async (id) => {
    try {
      const res = await fetch('/api/todos/supabase', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setTodos(todos.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  // ✅ TOGGLE TODO
  const toggleTodo = async (id, is_completed) => {
    try {
      const res = await fetch('/api/todos/supabase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_completed: !is_completed }),
      });

      if (res.ok) {
        setTodos(
          todos.map((t) =>
            t.id === id ? { ...t, is_completed: !is_completed } : t
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
        
        <div className="bg-blue-600 p-8 text-white text-center">
          <h1 className="text-3xl font-bold">Focus Tasks</h1>
          <p className="mt-2 italic">Simple, smooth, and styled.</p>
        </div>

        <div className="p-8">
          {/* ADD FORM */}
          <form onSubmit={addTodo} className="flex gap-3 mb-8">
            <input
              type="text"
              className="flex-1 border-2 p-3 rounded-xl"
              placeholder="What's your next move?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
              Add
            </button>
          </form>

          {/* LIST */}
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="space-y-3">
              {todos.length === 0 ? (
                <p className="text-center">No tasks today.</p>
              ) : (
                todos.map((todo) => (
                  <div key={todo.id} className="flex justify-between p-4 bg-slate-50 rounded-xl">
                    
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={todo.is_completed}
                        onChange={() => toggleTodo(todo.id, todo.is_completed)}
                      />

                      <span
                        className={
                          todo.is_completed
                            ? 'line-through text-gray-400'
                            : 'text-black'
                        }
                      >
                        {todo.title}
                      </span>
                    </div>

                    <button onClick={() => deleteTodo(todo.id)}>
                      ❌
                    </button>

                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <Link href="/about" className="mt-6">About →</Link>
    </div>
  );
}