// Create.tsx
import React from "react";
import { Link } from "react-router-dom";
import Formulario from "../components/Form";
import axios from "axios";

const Create = () => {
  const onSubmit = async (data: any) => {
    try {
      // Hacer la solicitud POST al backend
      await axios.post('http://localhost:5008/v1/products', data);
    
      // Redirigir al listado después de agregar el producto exitosamente
      console.log('Producto agregado exitosamente!');
    } catch (error: any) {
      // Manejar errores en caso de que la solicitud falle
      console.error('Error al agregar el producto:', error);
    
      // Acceder a las propiedades específicas del error
      console.log('Mensaje de error:', error.message);
    
      // Agrega esta línea para imprimir más detalles sobre la respuesta del servidor
      console.log('Detalles de la respuesta:', error.response);
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
