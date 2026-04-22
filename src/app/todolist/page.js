"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import keycloak from "@/lib/keycloak";
import { CheckCircle, Clock, LogOut } from "lucide-react";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    await supabase
      .from("todos")
      .update({ is_completed: status })
      .eq("id", id);

    fetchTasks();
  };

  // Logout
  const logout = () => {
    keycloak.logout({
      redirectUri: "http://localhost:3000",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📝 My Todo List
        </h1>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            🚀 No tasks yet! Start adding some.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border-b last:border-none py-4 hover:shadow-md hover:bg-gray-50 px-3 rounded-xl transition-all duration-200"
            >

              {/* Task Info */}
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {task.title}
                </p>

                {/* Status */}
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-1 inline-flex items-center gap-1 ${
                    task.is_completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.is_completed ? (
                    <>
                      <CheckCircle size={14} /> Completed
                    </>
                  ) : (
                    <>
                      <Clock size={14} /> Pending
                    </>
                  )}
                </span>
              </div>

              {/* Dropdown */}
              <select
                value={task.is_completed ? "Complete" : "Pending"}
                onChange={(e) =>
                  updateStatus(task.id, e.target.value === "Complete")
                }
                className="border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Pending</option>
                <option>Complete</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}