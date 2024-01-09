import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import axios from 'axios';
import '../index.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { User } from '../entities';
import { useAuth } from '../AuthProvider';

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

  const { setToken } = useAuth();
  const navigate = useNavigate(); // Utiliza useNavigate desde react-router-dom
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post<User>('http://localhost:5008/v1/usuarios/login', values);
      const token = response.data.token;
      console.log('Token:', token);

      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate('/list');
    } catch (error) {
      console.error('Error al hacer la solicitud POST:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-light bg-slate-700">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 border bg-white shadow p-8 rounded">
        <h1 className="text-center font-bold text-black text-2xl mb-6">Inicio de Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              onClick={handleSubmit(onSubmit)} // Utiliza handleSubmit directamente
              radius="5px"
              width="100%"
              className='text-white bg-green-500 rounded-md'
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
