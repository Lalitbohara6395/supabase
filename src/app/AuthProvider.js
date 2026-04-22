"use client";

import { useEffect, useState } from "react";
import keycloak from "@/lib/keycloak";

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "login-required", // 👈 important
        checkLoginIframe: false,
      })
      .then((auth) => {
        if (auth) {
          setAuthenticated(true);
        }
      });
  }, []);

  if (!authenticated) return <div>Redirecting to login...</div>;

  return children;
}