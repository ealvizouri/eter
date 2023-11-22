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
  const newProduct = await db
    .insert(Products)
    .values({
      id: uuid(),
      name: req.body.name,
    })
    .returning({ id: Products.id, name: Products.name });

  res.json({
    data: newProduct,
  });
};
