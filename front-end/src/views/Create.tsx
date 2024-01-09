// Create.tsx
import React from "react";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="p-4">
      <Link
        to={`/list`}
        className="font-bold px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Regresar al Listado
      </Link>

      {/* Resto del contenido de tu formulario o componente Create */}
    </div>
  );
};

export default Create;
