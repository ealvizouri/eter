import { Router } from 'express';
import { createProduct, getAllProducts } from './handlers/products';

export default (app: any) => {
  const products = Router();
  products.use('/products', [
    products.get('/', getAllProducts),
    products.post('/', createProduct),
  ]);
  app.use('/v1', [products]);
};
