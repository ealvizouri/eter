import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Formulario from '../components/Form'
import { useAuth } from '../AuthProvider'
import axiosInstance from '../axiosInstance'

const Create = () => {
  const { token, setToken } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData()
      console.log('Datos del formulario:', data)

      formData.append('quantity', data.quantity)
      formData.append('name', data.name)
      formData.append('image', data.image[0])

      // Agrega el token de autorización a la instancia de axios
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Agrega estos console.log para depurar
      console.log(
        'URL de la solicitud:',
        axiosInstance.defaults.baseURL + '/products',
      )

      const response = await axiosInstance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      console.log('Respuesta del servidor:', response.data)
      navigate('/list')
    } catch (error) {
      console.error('Error al enviar la solicitud:', error)
    }
  }

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
  )
}

export default Create
