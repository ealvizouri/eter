import { eq } from 'drizzle-orm';
import { db } from '../modules/drizzle';
import { Users } from '../schema';
import uuid from '../modules/uuid';


export const getAllUsers = async (req, res, next) => {
    const allUsers = await db.select().from(Users);
  
    res.json({
      data: allUsers,
    });
  };

export const createUser = async (req, res, next) => {
    try{ 

        const newUser = await db
        .insert(Users)
        .values({
          id: uuid(),
          name: req.body.name,
          mail: req.body.mail,
          password: req.body.password
        })
        .returning({ id: Users.id, name: Users.name,mail: Users.mail, password: Users.password });
        res.json({
            data: newUser,
           });
    }  catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
     
    };

    //import jwt from 'jsonwebtoken';

    // ...
    
    export const loginUser = async (req, res, next) => {
      try {

       const mail = req.body.mail
       const password = req.body.password    
        // Verificar las credenciales en la base de datos
        const user = await db.select({mail: Users.mail, password: Users.password})
        .from(Users).where(eq(Users.mail, mail));
    
        if (user.length === 0 || user[0].mail !== mail) {
            return res.status(401).json({ error: 'Correo incorrecto' });
          }else if(user[0].password !== password){
            return res.status(401).json({ error: 'Contraseña incorrecta' });
          }
    
        // Generar un token de sesión
        //const token = jwt.sign({ userId: user.id }, 'token');
    const token = mail + password + "tokenprovisional";
        res.json({ token });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    };
    