import { NextFunction, Request, Response } from "express";
//import { singUp } from "../handlers/users"
import jwt from "jsonwebtoken";



export const generarToken = (usuarioId: string): string => {
    const claveSecreta = 'ETER'; 
    const token = jwt.sign({ usuarioId }, claveSecreta); 
    return token;
  };
  

  export const auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
  
    const [, token] = authorization.split(' ');
  
    if (!token) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'ETER'); 
  
      next();
    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };