import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Show from "./components/Show";
import Login from './components/Login';
import './index.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/list",
    element: <Show />
  }
])


function App() {


  return (
    <>
    <div>
    <h1>React CRUD Operations</h1>
    <RouterProvider router={router}/>
    </div>
    </>
  );
}

export default App;
