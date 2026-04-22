"use client";

import AuthProvider from "../AuthProvider";

export default function TodoLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}