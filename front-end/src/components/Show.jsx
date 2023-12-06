import React from "react"
//import { getAll } from '../utilities/api'
import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import {Link} from 'react-router-dom'



const Show = () => {
    const { data } = useQuery({
        queryKey: ['prods'],
        queryFn: () =>
            axios.get('products').then(({ data }) => data.data)
    }
    );
    console.log('products', data);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha Creacion</th>
                        <th>Quantity</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.created_at}</td>
                            <td>{product.quantity}</td>
                            <td>{product.name}</td>
                            <td>{product.image}</td>
                            <td>
                                <Link to={`/editproduct/${product.id}`}>
                                Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/create`}> Crear </Link>
        </div>
    )
}

export default Show