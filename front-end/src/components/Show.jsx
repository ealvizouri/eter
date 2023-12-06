import React from "react"
//import { getAll } from '../utilities/api'
import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import {Link} from 'react-router-dom'



const Show = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['prods'],
        queryFn: () =>
            axios.get('products').then(({ data }) => data.data)
    }
    );
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
                    {data.map((products) => (
                        <tr key={products.id}>
                            <td>{products.id}</td>
                            <td>{products.created_at}</td>
                            <td>{products.quantity}</td>
                            <td>{products.name}</td>
                            <td>{products.image}</td>
                            <td>
                                <Link to={`/editproduct/${products.id}`}>
                                Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Show