import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import Link from '../components/Links';
import { useAuth } from '../AuthProvider';

interface ShowProps {
  token: string | null;
}

const Show: React.FC<ShowProps> = () => {
  const { token } = useAuth(); // Obtén el token del contexto

  console.log('Token en Show:', token);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['prods'],
    queryFn: () =>
      axios
        .get('http://localhost:5008/v1/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data.data),
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Error al cargar los productos</p>;
  }

  console.log('products', data);
  return (
    <div className="overflow-x-auto p-4">
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
                <img src={`uploads/${product.image}`} alt={product.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
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
