import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../index.css';
import Input from './Input';
import { User } from '../entities';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    values: {
      email: '',
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
            name="email"
            label="Correo"
          />
          <Input control={control} name="password" label="Contraseña" />
          <button className="underline" type="submit">
            Enviar
          </button>
        </Form>
      </div>
    </div>
  );

  /*
        const [post, setPost] = useState({
            nombre: "",
            correo: ""
        });
    
        console.log(post)
    
        const handleChangeInput = (e) => {
            setPost({
                ...post,
                [e.target.name]: e.target.value
            })
        }
    
        const renderField = (label) => (
            <div>
                <label>{label}</label>
                <input onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={post[label.toLowerCase()]} />
            </div>
        )
    
        return (
            <form>
                {renderField('Nombre')}
                {renderField('Correo')}
                <button type="submit">Enviar</button>
            </form>
        )*/
};

export default Login;
