// Formulario.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    created_at: string;
    quantity: number;
    productName: string;
    img: FileList; // Cambia el tipo a FileList para manejar archivos
}

interface FormularioProps {
    onSubmit: SubmitHandler<FormData>;
    initialValues?: FormData;
}

const Formulario: React.FC<FormularioProps> = ({ onSubmit, initialValues }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ defaultValues: initialValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md" encType="multipart/form-data">
            <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-600 font-bold mb-2">
                    Nombre del Producto
                </label>
                <input
                    type="text"
                    id="productName"
                    {...register('productName', { required: 'Este campo es obligatorio' })}
                    className={`border p-2 rounded-md w-full ${errors.productName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-600 font-bold mb-2">
                    Cantidad
                </label>
                <input
                    type="number"
                    id="quantity"
                    {...register('quantity', { required: 'Este campo es obligatorio' })}
                    className={`border p-2 rounded-md w-full ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="creationDate" className="block text-gray-600 font-bold mb-2">
                    Fecha de Creación
                </label>
                <input
                    type="date"
                    id="creationDate"
                    {...register('created_at', { required: 'Este campo es obligatorio' })}
                    className={`border p-2 rounded-md w-full ${errors.created_at ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.created_at && <p className="text-red-500 text-sm">{errors.created_at.message}</p>}
            </div>

            <div className="mb-4">
        <label htmlFor="img" className="block text-gray-600 font-bold mb-2">
          Imagen
        </label>
        <input
          type="file"
          id="img"
          {...register('img', { required: 'Este campo es obligatorio' })}
          className={`border p-2 rounded-md w-full ${errors.img ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
      </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Enviar
            </button>
        </form>
    );
};

export default Formulario;
