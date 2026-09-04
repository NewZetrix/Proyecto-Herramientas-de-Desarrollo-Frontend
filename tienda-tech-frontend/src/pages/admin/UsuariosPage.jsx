import { useState,useEffect } from "react";
import { listarUsuarios } from "../../services/authService";

export default function UsuariosPage(){
    const [usuarios, setUsuarios] = useState([]);
    
    useEffect(() => {
    setUsuarios(listarUsuarios());
    }, []);
  return (
    <div>
      <h1>Administración de usuarios</h1>
    </div>
  );
}