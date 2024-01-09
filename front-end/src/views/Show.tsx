import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import Link from '../components/Links';

const Show = () => {
  const { data } = useQuery({
    queryKey: ['prods'],
    queryFn: () => axios.get('products').then(({ data }) => data.data),
  });

  console.log('products', data);
  
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto mt-3 bg-white border rounded hover:">
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
              <td className="px-4 py-2">{product.image}</td>
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
