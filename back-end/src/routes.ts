import { Router } from 'express';
import { createProduct, getAllProducts,updateProduct } from './handlers/products';

export default (app: any) => {
  const products = Router();
  products.use('/products', [
    products.get('/', getAllProducts),
    products.post('/', createProduct),
    products.put('/',updateProduct)
  ]);
  app.use('/v1', [products]);
};
