"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("tecnico");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, tipo })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess("Usuário cadastrado com sucesso!");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(data.error || "Erro ao cadastrar usuário");
      }
    } catch (err) {
      setError("Erro de servidor");
    }
  };

  return (
    <div className="center" style={{ maxWidth: 400, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0002", padding: 32 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Cadastro de Usuário</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label htmlFor="username">Nome de Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }}
          />
        </div>
        <div>
          <label htmlFor="tipo">Tipo de Usuário</label>
          <select
            id="tipo"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }}
          >
            <option value="admin">Admin</option>
            <option value="gerente">Gerente</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>
        <button type="submit" style={{ background: "#3182ce", color: "#fff", border: "none", borderRadius: 6, padding: "10px 18px", fontWeight: 600, cursor: "pointer", fontSize: 16 }}>
          Cadastrar
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: 16 }}>
        Já tem conta? <a href="/login" style={{ color: "#3182ce" }}>Ir para Login</a>
      </p>
    </div>
  );
}
