import { eq } from 'drizzle-orm';
import { db } from '../modules/drizzle';
import { Users } from '../schema';
import uuid from '../modules/uuid';
import { hashPassword,comparePasswords } from '../modules/encrypt';


export const getAllUsers = async (req, res, next) => {
    const allUsers = await db.select().from(Users);
  
    res.json({
      data: allUsers,
    });
  };

export const singUp = async (req, res, next) => {
  const pass = req.body.password;
  

    try{ 
        const hashedPassword = await hashPassword(pass);

        const newUser = await db
        .insert(Users)
        .values({
          id: uuid(),
          name: req.body.name,
          mail: req.body.mail,
          password: hashedPassword
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

  
    
    export const loginUser = async (req, res, next) => {
      try {

       const mail = req.body.mail
       const password = req.body.password 
       

        const [user] = await db.select({mail: Users.mail, password: Users.password})

        .from(Users).where(eq(Users.mail, mail));
    
        if ( !user) {
            return res.status(401).json({ error: 'Correo incorrecto' });
          }
     // Comparar la contraseña ingresada con el hash almacenado en la base de datos
            const passwordMatch = await comparePasswords(password, user[0].password);
      
            if (passwordMatch) {
              // Si la comparación es exitosa, puedes generar un token y enviarlo como respuesta
              const token = mail + passwordMatch + 'tokenprovisional';
             return res.json({ token });
            }           
              return res.status(401).json({ error: 'Contraseña incorrecta' });

      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    };

 

    