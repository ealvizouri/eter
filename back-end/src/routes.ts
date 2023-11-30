import { Router } from 'express';
import { createProduct, getAllProducts,updateProduct,deleteProduct } from './handlers/products';
import { getAllUsers,createUser,loginUser } from './handlers/users';


export default (app: any) => {
  const users = Router();
  users.use('/usuarios',[
    users.get('/',getAllUsers),
    users.post('/',createUser),
    users.post('/login', loginUser),

  ]);

  const products = Router();
  products.use('/products', [
    
    products.delete('/',deleteProduct),
    products.get('/', getAllProducts),
    products.post('/', createProduct),
    products.put('/',updateProduct)
  ]);
  app.use('/v1', [products]);
  app.use('/v1', [users]);

};
