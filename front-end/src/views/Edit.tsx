import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Formulario from '../components/Form'
import Link from '../components/Links'
import { useAuth } from '../AuthProvider'
import axiosInstance from '../axiosInstance'

const Edit = () => {
  const { token, setToken } = useAuth()
  const { id } = useParams()
  const { register, handleSubmit, reset, formState } = useForm()
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const productData = response.data.data
        console.log('Datos del producto:', productData)

        if (Array.isArray(productData) && productData.length > 0) {
          const product = productData[0]

          // Establecer los valores iniciales del formulario
          reset({
            name: product.name,
            quantity: product.quantity,
            image: product.image,
          })

        } else {
          console.error('Error: No se encontraron datos del producto.')
        }
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error)
      }
    }

    fetchProductData()
  }, [id, reset, token])

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
  
      // Adjuntar campos al FormData
      formData.append('name', data.name);
      formData.append('quantity', data.quantity);
  
      // Verificar si hay una imagen antes de adjuntarla
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }
  
      // Enviar la solicitud con el FormData
      const response = await axiosInstance.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Respuesta del servidor después de la modificación:', response.data);
      navigate('/list')

    } catch (error) {
      console.error('Error al enviar la solicitud de modificación:', error);
    }
  };

  const formularioProps = {
    onSubmit,
    mode: 'editar',
  }

  return (
    <div className="p-4">
      <Link
        to={`/list`}
        className="font-bold px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Regresar al Listado
      </Link>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Modificación de Producto
      </h2>
      <Formulario {...formularioProps} />
    </div>
  )
}

export default Edit
