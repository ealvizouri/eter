import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import Link from '../components/Links';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

interface ShowProps {
  token: string | null;
}

const Show: React.FC<ShowProps> = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);

    navigate('/');
  };
  console.log('Token en Show:', token);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['prods'],
    queryFn: () =>
      axiosInstance
        .get('/products')
        .then(({ data }) => data.data),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-red-500">Error al cargar los productos</p>
      </div>
    );
  }
  console.log('products', data);
  
  return (
    <div className="overflow-x-auto p-4">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>
      <table className="min-w-full table-auto mt-3 bg-white border rounded">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Fecha y Hora De Creación</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Acciones</th>
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
                <img src={`/${product.image}`} alt={product.name} style={{ maxWidth: '500px', maxHeight: '500px' }} />
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/editproduct/${product.id}`}
                  className="text-red-500"
                >
                  Editar
                </Link>
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
  );
};

export default Show;
