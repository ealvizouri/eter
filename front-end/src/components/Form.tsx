// Formulario.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  creationDate: string;
  quantity: number;
  productName: string;
  image: string;
}

interface FormularioProps {
  onSubmit: SubmitHandler<FormData>;
}

const Formulario: React.FC<FormularioProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <div className="mb-4">
        <label htmlFor="creationDate" className="block text-gray-600 font-bold mb-2">
          Fecha de Creación
        </label>
        <input
          type="text" // Puedes cambiarlo a "date" si prefieres un campo de fecha
          id="creationDate"
          {...register('creationDate', { required: 'Este campo es obligatorio' })}
          className={`border p-2 rounded-md w-full ${errors.creationDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.creationDate && <p className="text-red-500 text-sm">{errors.creationDate.message}</p>}
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
        <label htmlFor="image" className="block text-gray-600 font-bold mb-2">
          Imagen
        </label>
        <input
          type="text"
          id="image"
          {...register('image', { required: 'Este campo es obligatorio' })}
          className={`border p-2 rounded-md w-full ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
