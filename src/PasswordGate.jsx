import { useState, useEffect } from "react";

// ⚙️ CAMBIA ESTA CLAVE por la que quieras darle a tus compradores
const CLAVE_CORRECTA = "TUREGULAS2025";

// Esta línea recuerda que el usuario ya entró, para que no pida la clave cada vez
const LLAVE_GUARDADA = "tmmm_acceso";

export default function PasswordGate({ children }) {
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [clave, setClave] = useState("");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Al abrir la app, revisa si el usuario ya ingresó antes
  useEffect(() => {
    const guardado = localStorage.getItem(LLAVE_GUARDADA);
    if (guardado === "si") {
      setTieneAcceso(true);
    }
    setCargando(false);
  }, []);

  const verificarClave = () => {
    if (clave.trim().toUpperCase() === CLAVE_CORRECTA.toUpperCase()) {
      localStorage.setItem(LLAVE_GUARDADA, "si");
      setTieneAcceso(true);
      setError(false);
    } else {
      setError(true);
      setClave("");
    }
  };

  // Permite presionar Enter para ingresar
  const alPresionarTecla = (e) => {
    if (e.key === "Enter") verificarClave();
  };

  if (cargando) return null;

  // Si ya tiene acceso, muestra la app normalmente
  if (tieneAcceso) return children;

  // Si no tiene acceso, muestra la pantalla de bienvenida con la clave
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f0eb",
      padding: "1rem",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "2.5rem 2rem",
        maxWidth: "420px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
      }}>

        {/* Logo / emoji de marca */}
        <div style={{ fontSize: "2.8rem", marginBottom: "0.5rem" }}>🌍</div>

        <h1 style={{
          fontSize: "1.3rem",
          fontWeight: "600",
          color: "#1a1a1a",
          margin: "0 0 0.4rem"
        }}>
          Tu Mundo Mi Mundo
        </h1>

        <p style={{
          fontSize: "0.9rem",
          color: "#555",
          marginBottom: "2rem",
          lineHeight: "1.6"
        }}>
          Ingresa la clave que recibiste al comprar el bundle<br />
          <strong>Superpoderes + App</strong> para acceder.
        </p>

        {/* Campo de clave */}
        <input
          type="password"
          placeholder="Tu clave de acceso"
          value={clave}
          onChange={(e) => {
            setClave(e.target.value);
            setError(false);
          }}
          onKeyDown={alPresionarTecla}
          style={{
            width: "100%",
            padding: "0.8rem 1rem",
            border: error ? "1.5px solid #e24b4a" : "1.5px solid #ddd",
            borderRadius: "10px",
            fontSize: "1rem",
            outline: "none",
            boxSizing: "border-box",
            color: "#1a1a1a",
            backgroundColor: "#fafafa"
          }}
        />

        {/* Mensaje de error */}
        {error && (
          <p style={{
            color: "#e24b4a",
            fontSize: "0.82rem",
            marginTop: "0.5rem",
            textAlign: "left"
          }}>
            Clave incorrecta. Revisa el correo que recibiste al comprar.
          </p>
        )}

        {/* Botón de acceso */}
        <button
          onClick={verificarClave}
          style={{
            width: "100%",
            padding: "0.85rem",
            backgroundColor: "#2d6a4f",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "1rem",
            letterSpacing: "0.01em"
          }}
        >
          Acceder →
        </button>

        {/* Link para comprar */}
        <p style={{
          fontSize: "0.78rem",
          color: "#aaa",
          marginTop: "1.5rem"
        }}>
          ¿Aún no tienes acceso?{" "}
          <a
            href="https://www.tumundomimundo.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2d6a4f", textDecoration: "none", fontWeight: "500" }}
          >
            Adquiérelo aquí
          </a>
        </p>

      </div>
    </div>
  );
}
