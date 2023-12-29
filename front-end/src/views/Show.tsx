import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import { Link } from 'react-router-dom';

const Show = () => {
  const { data } = useQuery({
    queryKey: ['prods'],
    queryFn: () => axios.get('products').then(({ data }) => data.data),
  });
  console.log('products', data);
  return (
    <div className="grid grid-flow-row-dense">
      <table className="table-auto mt-3">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-black">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Fecha Creacion</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product: any) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.created_at}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.image}</td>
              <td>
                <Link to={`/editproduct/${product.id}`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/list/create`}> Crear </Link>
    </div>
  );
};

export default Show;
