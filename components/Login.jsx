"use client";
import { useState } from "react";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleLogin} style={{ width: "100%", padding: "10px" }}>
        Iniciar Sesión
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
