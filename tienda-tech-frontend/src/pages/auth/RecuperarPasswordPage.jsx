import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import { listarUsuarios } from "../../services/authService";

// RF-03: solicitar la recuperacion de contrasena mediante correo.
//
// Nota para el equipo: como todavia no hay backend ni envio real de correos,
// esta vista simula el paso 1 del flujo. En vez de enviar un email de verdad,
// muestra un mensaje generico (buena practica: no confirmar si el correo existe
// o no) y da un enlace de "modo demo" para continuar directo a restablecer
// la contrasena. Cuando conecten Spring Boot, aqui solo cambia la llamada:
// en vez de leer el mock, se le pega al endpoint que envia el correo real.
export default function RecuperarPasswordPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo.trim()) {
      setError("Ingresa tu correo");
      return;
    }
    setError("");
    setEnviado(true);
  };

  const existeCuenta = listarUsuarios().some((u) => u.correo === correo.trim());

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="card p-8">
        <h1 className="text-2xl">Recupera tu contraseña</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ingresa tu correo y te enviaremos instrucciones para restablecerla.
        </p>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <FormField
              label="Correo electrónico"
              name="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              error={error}
              placeholder="tucorreo@ejemplo.com"
              required
            />
            <Button type="submit" className="w-full">
              Enviar instrucciones
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-brand-50 px-3.5 py-3 text-sm text-brand-800">
              Si <strong>{correo}</strong> está registrado, te enviaremos un correo con
              instrucciones.
            </div>

            {existeCuenta && (
              <div className="rounded-lg border border-dashed border-slate-300 px-3.5 py-3 text-xs text-slate-500">
                Modo demo (sin envío real de correo):{" "}
                <button
                  onClick={() =>
                    navigate(`/reset-password?correo=${encodeURIComponent(correo.trim())}`)
                  }
                  className="font-medium text-brand-600 hover:underline"
                >
                  continuar a restablecer contraseña
                </button>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
