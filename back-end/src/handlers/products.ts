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
      created_at: req.body.created_at,
      quantity: req.body.quantity,
      name: req.body.name
    })
    .returning({ id: Products.id, name: Products.name,created_at: Products.created_at, quantity: Products.quantity });
  res.json({
    data: newProduct,
  });
};
