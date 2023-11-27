import { Router } from 'express';
import { createProduct, getAllProducts,deleteProduct } from './handlers/products';

export default (app: any) => {
  const products = Router();
  products.use('/products', [
    products.get('/', getAllProducts),
    products.post('/', createProduct),
    products.delete('/',deleteProduct)
  ]);
  app.use('/v1', [products]);
};
