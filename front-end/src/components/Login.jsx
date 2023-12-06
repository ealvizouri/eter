import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [values, setValues] = useState({
        mail: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Hacer la solicitud POST
        axios.post("http://localhost:5008/v1/usuarios/login", values)
            .then(response => {
                // Respuesta del servidor
                console.log('Datos enviados', response.data);
                const userData = response.data; //Token que envia
                navigate('/list');

            })
            .catch(error => {
                // Manejar errores
                console.error("Error al hacer la solicitud POST:", error);
            });
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-5 pb-5 rounded">
                <h1>Inicio de Sesion</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="mail">Correo:</label>
                        <input type="text" name="mail" className="form-control" placeholder="Ingresa tu correo"
                            onChange={e => setValues({ ...values, mail: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" name="password" className="form-control" placeholder="Ingresa tu contraseña"
                            onChange={e => setValues({ ...values, password: e.target.value })} />
                    </div>
                    <button className="bg-black text-white p-2 rounded">Enviar</button>
                </form>
            </div>
        </div>
    )


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
}

export default Login