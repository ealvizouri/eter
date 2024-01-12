import { eq } from 'drizzle-orm'
import { db } from '../modules/drizzle'
import uuid from '../modules/uuid'
import { Products } from '../schema'
import fs from 'fs';


export const getAllProducts = async (req, res, next) => {
  const allProducts = await db.select().from(Products)

  res.json({
    data: allProducts,
  })
}

export const getProduct = async (req, res, next) => {
  const id = req.body.id
  //const name = req.body.name
  const Product = await db
  .select()
  .from(Products)
  .where(eq(Products.id, id));

  res.json({
    data: Product,
  })
}


export const createProduct = async (req, res, next) => {
  try {
    console.log('Datos recibidos en createProduct:', req.body)

    // Extraer información del archivo de imagen desde la solicitud
    const { filename, path } = req.file

    // Almacena la imagen en el sistema de archivos
    const imagePath = `uploads/${filename}`

    const newProduct = await db
      .insert(Products)
      .values({
        id: uuid(),
        created_at: req.body.created_at,
        quantity: req.body.quantity,
        name: req.body.name,
        image: imagePath, // Guarda la ruta de la imagen en la base de datos
      })
      .returning({
        id: Products.id,
        name: Products.name,
        created_at: Products.created_at,
        quantity: Products.quantity,
        image: Products.image,
      })
    console.log('Nuevo producto insertado:', newProduct);

    res.json({
      data: newProduct,
    })
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteProduct = async (req, res, next) => {
  const id = req.body.id
  //const name = req.body.name
  const deleteProduct = await db.delete(Products).where(eq(Products.id, id))

  res.json({
    data: deleteProduct,
  })
}


export const updateProduct = async (req, res, next) => {
  try {
    console.log('Datos recibidos en update:', req.body);

    // Extraer información del archivo de imagen desde la solicitud
    const { filename, path } = req.file;

    // Almacena la imagen en el sistema de archivos
    const imagePath = `uploads/${filename}`;

    const id = req.body.id;

    // Obtener información del producto existente
    const existingProduct = await db
      .select()
      .from(Products)
      .where(eq(Products.id, id));

    // Eliminar la imagen anterior si existe
    if (existingProduct.length > 0 && existingProduct[0].image) {
      const previousImagePath = `uploads/${existingProduct[0].image}`;
      fs.unlinkSync(previousImagePath);
    }

    // Actualizar el producto en la base de datos
    const editProduct = await db
      .update(Products)
      .set({
        created_at: req.body.created_at,
        quantity: req.body.quantity,
        name: req.body.name,
        image: imagePath,
      })
      .where(eq(Products.id, id))
      .returning({
        id: Products.id,
        name: Products.name,
        created_at: Products.created_at,
        quantity: Products.quantity,
        image: Products.image,
      });

    res.json({
      data: editProduct,
    });
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
