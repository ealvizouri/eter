import { useQuery } from '@tanstack/react-query';
import logo from './logo.svg';
import axios from './axios';

function App() {
  /**
   * Ejemplo de cómo use useQuery con la instancia de axios. Para correr
   * el API ingresa a la carpeta de back-end a través de la terminal y usa "npm start"
   */
  const { data } = useQuery({
    queryKey : ['test'], 
    queryFn : () =>
    axios.get('products').then(({ data }) => data.data)
  } 
  );

  console.log('products', data);

  return (
    <div className="h-screen flex justify-center items-center">
      <header className="w-fit flex flex-col items-center gap-3">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-blue-700 hover:text-blue-900"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
