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
