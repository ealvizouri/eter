// Create.tsx
import React from "react";
import { Link } from "react-router-dom";
import Formulario from "../components/Form";
import axios from "axios";

const Create = () => {
  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      console.log('Datos del formulario:', data); // Agrega esta línea

      formData.append('created_at', data.created_at);
      formData.append('quantity', data.quantity);
      formData.append('name', data.name);
      formData.append('image', data.image[0]);

      const response = await axios.post('http://localhost:5008/v1/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar la solicitud front:', error);
    }
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
