import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Show from './components/Show';
import Login from './components/Login';
import './index.css';
import Create from './components/Create';
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
