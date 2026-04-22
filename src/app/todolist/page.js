"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import keycloak from "@/lib/keycloak";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);

  // 🔥 FETCH FROM SUPABASE
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("todos") // 👈 table name
      .select("*");

    if (error) {
      console.error("Error fetching:", error);
    } else {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔄 UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", id);

    fetchTasks(); // refresh
  };

  // 🚪 LOGOUT
  const logout = () => {
    keycloak.logout({
      redirectUri: "http://localhost:3000",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border-b py-3"
            >
              <span>{task.title}</span> {/* 👈 column name check karo */}

              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option>Pending</option>
                <option>Complete</option>
                <option>Rejected</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}