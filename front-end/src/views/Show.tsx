import React, { useState } from 'react'
//import Modal from 'react-modal' para colocar modal
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'
import Link from '../components/Links'
import { useAuth } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import Button from '../components/Button'
import ConfirmAlert from '../components/ConfirmAlert'
import useModal from '../hooks/useModal'
import { STORAGE_AUTH_TOKEN } from '../defaults/storage_keys'

interface ShowProps {
  token: string | null
}

const Show: React.FC<ShowProps> = () => {
  const { token, setToken } = useAuth()
  const { isOpen, open: openModal, close: closeModal } = useModal()
  const navigate = useNavigate()

  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => axiosInstance.get('/products').then(({ data }) => data.data),
  })

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_AUTH_TOKEN)
    setToken(null)
    navigate('/')
  }

  const confirmDelete = (productId: string) => {
    setDeleteProductId(productId)
    openModal()
  }

  const handleCancelDelete = () => {
    closeModal()
    setDeleteProductId(null)
  }

  const handleConfirmDelete = async () => {
    closeModal()
    if (deleteProductId) {
      try {
        // Lógica para eliminar el producto en el servidor
        await axiosInstance.delete(`/products/${deleteProductId}`)
        refetch()
        // Volver a cargar los datos después de la eliminación
        // ( recargar la página o volver a hacer la consulta para obtener los productos actualizados)
      } catch (error) {
        console.error('Error al eliminar el producto:', error)
        // Manejo de error, por ejemplo, mostrar un mensaje al usuario
      }
    }
  }

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
      {isOpen && (
        <ConfirmAlert
          isOpen={isOpen}
          close={closeModal}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        >
          ¿Estás seguro que deseas eliminar este producto?
        </ConfirmAlert>
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
                      onClick={() => confirmDelete(product.id)}
                      className="text-white bg-red-500 hover:bg-red-600 rounded-md"
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
