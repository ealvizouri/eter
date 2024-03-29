import { SubmitHandler, useFormContext } from 'react-hook-form'

export interface ProductFormData {
  quantity: number
  name: string
  image: FileList | null
}

interface Props {
  onSubmit: SubmitHandler<ProductFormData>
}

const Formulario = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ProductFormData>()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md"
      encType="multipart/form-data"
    >
      <div className="mb-4">
        <label
          htmlFor="productName"
          className="block text-gray-600 font-bold mb-2"
        >
          Nombre del Producto
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Este campo es obligatorio' })}
          className={`border p-2 rounded-md w-full ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="block text-gray-600 font-bold mb-2"
        >
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          {...register('quantity', { required: 'Este campo es obligatorio' })}
          className={`border p-2 rounded-md w-full ${
            errors.quantity ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="img" className="block text-gray-600 font-bold mb-2">
          Imagen
        </label>
        <input
          type="file"
          id="image"
          {...register('image', { required: 'Este campo es obligatorio' })}
          className={`border p-2 rounded-md w-full ${
            errors.image ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Enviar
      </button>
    </form>
  )
}

export default Formulario
