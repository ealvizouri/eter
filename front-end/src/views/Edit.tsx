// Edit.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Formulario from '../components/Form';
import Link from '../components/Links';

const Edit = () => {
    const { id } = useParams();

    // Define la función onSubmit para imprimir en la consola
    const onSubmit = (data: any) => {
        console.log('Valores enviados desde Edit:', data);
        // Agrega aquí la lógica adicional que necesitas para la edición del producto
    };

    const formularioProps = {
        onSubmit,  // Usa la función onSubmit definida arriba
        modo: 'editar',
    };

    return (
        <div className="p-4">
            <Link
                to={`/list`}
                className="font-bold px-4 py-2 bg-red-500 text-white rounded-md"
            >
                Regresar al Listado
            </Link>
            <h2 className="text-2xl font-bold mb-4 text-center">Modificación de Producto</h2>
            <Formulario {...formularioProps} />
        </div>
    );
};

export default Edit;
