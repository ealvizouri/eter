// Edit.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Formulario from '../components/Form'; // Asegúrate de importar el componente Formulario desde su ubicación correcta.

const Edit = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID del parámetro de la URL

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <Formulario modo="editar" id={id} />
    </div>
  );
};

export default Edit;
