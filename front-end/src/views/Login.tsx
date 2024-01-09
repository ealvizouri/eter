import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../index.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { User } from '../entities';

interface FormValues {
  mail: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      mail: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (values: FormValues) => {
    // Hacer la solicitud POST
    axios
      .post<User>('http://localhost:5008/v1/usuarios/login', values)
      .then((response) => {
        // Respuesta del servidor
        console.log('Datos enviados', response.data);
        const token = response.data.token; // Acceder al token
        console.log('Token:', token);
  
        // Incluir el token en el encabezado de autorización para futuras solicitudes
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        // Redirigir a la página de listado de productos
        navigate('/list');
      })
      .catch((error) => {
        // Manejar errores
        console.error('Error al hacer la solicitud POST:', error);
      });
  };


  return (
    <div className="flex items-center justify-center h-screen bg-light bg-slate-700">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 border bg-white shadow p-8 rounded">
        <h1 className="text-center font-bold text-black text-2xl mb-6">Inicio de Sesión</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              rules={{
                required: 'Campo requerido',
              }}
              control={control}
              name="mail"
              label="Correo"
            />
          </div>
          <div className="mb-4">
            <Input
              rules={{
                required: 'Campo requerido',
              }}
              control={control}
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
            >
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-justify text-gray-400 cursor-pointer focus:outline-none"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </Input>
          </div>
          <div className="mb-6">
            <Button
              border="2px solid #4CAF50"
              color="#4CAF50"
              height="40px"
              onClick={() => console.log("Ingresando...")}
              radius="5px"
              width="100%"
              className='text-white bg-green-500 rounded-md'
            >
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

