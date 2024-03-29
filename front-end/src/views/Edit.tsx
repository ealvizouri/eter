import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Formulario, { ProductFormData } from '../components/Form'
import Link from '../components/Links'
import { useAuth } from '../AuthProvider'
import axiosInstance from '../axiosInstance'
import { useQuery } from '@tanstack/react-query'

const Edit = () => {
  const { token, setToken } = useAuth()
  const { id } = useParams()
  const methods = useForm<ProductFormData>()
  const navigate = useNavigate()

  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: () =>
      axiosInstance
        .get(`/products/${id}`)
        .then((response) => response.data.data),
    enabled: !!id,
  })

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const formData = new FormData()

        // Adjuntar campos al FormData
        formData.append('name', data.name)
        formData.append('quantity', data.quantity)

        // Verificar si hay una imagen antes de adjuntarla
        if (data.image && data.image[0]) {
          formData.append('image', data.image[0])
        }

        // Enviar la solicitud con el FormData
        const response = await axiosInstance.put(`/products/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })

        console.log(
          'Respuesta del servidor después de la modificación:',
          response.data,
        )
        navigate('/list')
      } catch (error) {
        console.error('Error al enviar la solicitud de modificación:', error)
      }
    },
    [id, navigate, token],
  )

  useEffect(() => {
    if (isSuccess && data && Array.isArray(data) && data.length > 0) {
      console.log('Datos de producto:', data[0])
      // Establecer los valores iniciales del formulario
      methods.reset({
        name: data[0].name,
        quantity: data[0].quantity,
        image: data[0].image ? data[0].image : null,
      })
    }
  }, [isSuccess, data, methods.reset])

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
      <FormProvider {...methods}>
        <Formulario onSubmit={onSubmit} />
      </FormProvider>
    </div>
  )
}

export default Edit
