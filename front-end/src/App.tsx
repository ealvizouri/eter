import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Show from "./components/Show";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Show />
  },
  {
    path: "/editproduct/:id",
    //element: <Edit />
  }
])


function App() {
  /**
   * Ejemplo de cómo use useQuery con la instancia de axios. Para correr
   * el API ingresa a la carpeta de back-end a través de la terminal y usa "npm start"
   */

  return (
    <>
    <div>
    <h1 className="main-header">React CRUD Operations</h1>
    <RouterProvider router={router}/>
    </div>
    </>
  );
}

export default App;
