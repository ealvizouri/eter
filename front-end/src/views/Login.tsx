import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../index.css';
import Input from '../components/Input';
import { User } from '../entities';

interface FormValues {
    mail: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    values: {
      mail: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: FormValues) => {
    // Hacer la solicitud POST
    axios
      .post<User>('http://localhost:5008/v1/usuarios/login', values)
      .then((response) => {
        // Respuesta del servidor
        console.log('Datos enviados', response.data);
        const userData = response.data; //Token que envia
        navigate('/list');
      })
      .catch((error) => {
        // Manejar errores
        console.error('Error al hacer la solicitud POST:', error);
      });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-5 pb-5 rounded">
        <h1 className="text-center font-bold text-red-500">Inicio de Sesion</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            rules={{
              required: 'Campo requerido',
            }}
            control={control}
            name="mail"
            label="Correo"
          />
          <Input control={control} name="password" label="Contraseña" type="password"/>
          <button className="btn" type="submit">
            Enviar
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
