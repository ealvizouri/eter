import React, { useState } from 'react'
//import Modal from 'react-modal' para colocar modal
import { useQuery } from '@tanstack/react-query'
import axios from '../axios'
import Link from '../components/Links'
import { useAuth } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import Button from '../components/Button'
import DeleteConfirmationAlert from '../components/ConfirmAlert'

interface ShowProps {
  token: string | null
}

const Show: React.FC<ShowProps> = () => {
  const { token, setToken } = useAuth()
  const navigate = useNavigate()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  const handleLogout = () => {
    setToken(null)
    navigate('/')
  }

  const confirmDelete = (productId: string) => {
    setDeleteProductId(productId)
    setIsModalVisible(true)
  }

  const handleCancelDelete = () => {
    setIsModalVisible(false)
    setDeleteProductId(null)
  }

  const handleConfirmDelete = async () => {
    setIsModalVisible(false)
    if (deleteProductId) {
      try {
        // Lógica para eliminar el producto en el servidor
        await axiosInstance.delete(`/products/${deleteProductId}`)
        // Volver a cargar los datos después de la eliminación
        // (puedes recargar la página o volver a hacer la consulta para obtener los productos actualizados)
      } catch (error) {
        console.error('Error al eliminar el producto:', error)
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['prods'],
    queryFn: () => axiosInstance.get('/products').then(({ data }) => data.data),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-600">
          Cargando productos...
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-red-500">
          Error al cargar los productos
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto p-4">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>
      {isModalVisible && (
        <DeleteConfirmationAlert
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      <table className="min-w-full table-auto mt-3 bg-white border rounded">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Fecha y Hora De Creación</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2" colSpan={2}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product: any) => (
            <tr key={product.id} className="border-b">
              <td className="px-4 py-2">{product.id}</td>
              <td className="px-4 py-2">{product.created_at}</td>
              <td className="px-4 py-2">{product.quantity}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/editproduct/${product.id}`}
                  className="text-red-500"
                >
                  Editar
                </Link>
              </td>
              <td className="px-4 py-2">
                <td className="px-4 py-2">
                  <td className="px-4 py-2">
                    <Button
                      border="2px solid #E41A02"
                      color="#E41A02"
                      height="40px"
                      onClick={() => confirmDelete(product.id)}
                      radius="5px"
                      width="100%"
                      className="text-white bg-green-500 rounded-md"
                    >
                      Eliminar
                    </Button>
                  </td>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <Link
          to={`/list/create`}
          className="font-bold px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Crear
        </Link>
      </div>
    </div>
  )
}

export default Show
