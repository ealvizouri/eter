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
  try{

// Extraer archivo de imagen desde la solicitud
const image = req.body.image;

    // Almacena la imagen en el sistema de archivos (ajusta la ruta según tus necesidades)
    const imagePath = `uploads/${uuid()}_${image}`;

     const newProduct = await db
    .insert(Products)
    .values({
      id: uuid(),
      created_at: req.body.created_at,
      quantity: req.body.quantity,
      name: req.body.name,
     image: imagePath // Guarda la ruta de la imagen en la base de datos

    
    })
    .returning({ id: Products.id, name: Products.name,created_at: Products.created_at,
       quantity: Products.quantity,image: Products.image });
  res.json({
    data: newProduct,
  });
  }  catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
 
};


