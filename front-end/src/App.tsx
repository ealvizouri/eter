import { useQuery } from '@tanstack/react-query';
import axios from './axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Show from './views/Show';
import Login from './views/Login';
import './index.css';
import Create from './views/Create';
import Edit from './views/Edit';
import { useAuth } from './AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/list',
    element: <Show token={null} />,
  },
  {
    path: '/list/create',
    element: <Create />,
  },
  {
    path: '/editproduct/:id',
    element: <Edit />,
  },
]);

function App() {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: () => axios.get('products').then(({ data }) => data.data),
  });

  console.log('products', data);

  const { token } = useAuth(); // Obtén el token desde el contexto AuthProvider
  
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