import { eq } from 'drizzle-orm';
import { db } from '../modules/drizzle';
import uuid from '../modules/uuid';
import { Products } from '../schema';


export const getAllProducts = async (req, res, next) => {
  const allProducts = await db.select().from(Products);

  res.json({
    data: allProducts,
  });
};


export const createProduct = async (req, res, next) => {
  try {
    // Extraer información del archivo de imagen desde la solicitud
    const { filename, path } = req.file;
    

    // Almacena la imagen en el sistema de archivos
    const imagePath = `uploads/${uuid()}_${filename}`;

    const newProduct = await db
      .insert(Products)
      .values({
        id: uuid(),
        created_at: req.body.created_at,
        quantity: req.body.quantity,
        name: req.body.name,
        image: imagePath, // Guarda la ruta de la imagen en la base de datos
      })
      .returning({ id: Products.id, name: Products.name, created_at: Products.created_at, quantity: Products.quantity, image: Products.image });

    res.json({
      data: newProduct,
    });
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const deleteProduct = async (req, res, next) =>{


  const id = req.body.id
  //const name = req.body.name
  const deleteProduct = await db.delete(Products)
  .where(eq(Products.id, id));

  res.json({
    data: deleteProduct
  });
  
  };
	

  export const updateProduct = async (req, res, next) => {
    try{  
// Extraer archivo de imagen desde la solicitud
const image = req.body.image;

    // Almacena la imagen en el sistema de archivos (ajusta la ruta según tus necesidades)
    const imagePath = `uploads/${uuid()}_${image}`;

    const id = req.body.id;
    
const editProduct = await db.update(Products)
  .set({
    created_at: req.body.created_at,
    quantity: req.body.quantity,
    name: req.body.name,
   image: imagePath // Guarda la ruta de la imagen en la base de datos

   })
  .where(eq(Products.id, id))
  .returning({ id: Products.id, name: Products.name,created_at: Products.created_at,
    quantity: Products.quantity,image: Products.image });
res.json({
 data: editProduct,
});

    }  catch (error) {
      console.error('Error al crear un nuevo producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
   
  };
