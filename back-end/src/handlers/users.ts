import { eq } from 'drizzle-orm';
import { db } from '../modules/drizzle';
import { Users } from '../schema';
import uuid from '../modules/uuid';



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