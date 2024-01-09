// Create.tsx
import React from "react";
import { Link } from "react-router-dom";
import Formulario from "../components/Form";

const Create = () => {
  const onSubmit = (data: any) => {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(data);
  };

  return (
    <div className="p-4">
      <Link
        to={`/list`}
        className="font-bold px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Regresar al Listado
      </Link>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Producto</h2>
        <Formulario onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Create;
