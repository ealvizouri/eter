import { useQuery } from '@tanstack/react-query';
import axios from './axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Show from './views/Show';
import Login from './views/Login';
import './index.css';
import Create from './views/Create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/list',
    element: <Show />,
  },
  {
    path: '/list/create',
    element: <Create />,
  },
]);

function App() {
  /**
   * Ejemplo de cómo use useQuery con la instancia de axios. Para correr
   * el API ingresa a la carpeta de back-end a través de la terminal y usa "npm start"
   */
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: () => axios.get('products').then(({ data }) => data.data),
  });

  console.log('products', data);

  return (
    <>
      <div>
        <h1 className="text-center text-red-500">React CRUD Operations</h1>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
