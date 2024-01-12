import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Form'
import Link from '../components/Links'
import { useAuth } from '../AuthProvider'
import axiosInstance from '../axiosInstance'

const Edit = () => {
  const { token, setToken } = useAuth()
  const { id } = useParams()
  const { register, handleSubmit, reset, formState } = useForm()

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const productData = response.data.data

        // Establecer los valores iniciales del formulario
        reset({
          name: productData.name,
          quantity: productData.quantity,
          created_at: productData.created_at,
          // Traer imagen?
        })
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error)
      }
    }

    fetchProductData()
  }, [id, token, reset])

  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log(
        'Respuesta del servidor después de la modificación:',
        response.data,
      )
    } catch (error) {
      console.error('Error al enviar la solicitud de modificación:', error)
    }
  }

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
