"use client";	
import React from "react";

export default function AdminLoginPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Admin Login</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
} 