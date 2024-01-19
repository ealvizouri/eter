import { NextFunction, Request, Response } from 'express'

export const vaproduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req

  if (!body.id) {
    return res.status(400).json({ message: 'El campo "id" es obligatorio.' })
  }

  next()
}

export const vanewproduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req

  if (!body.quantity) {
    return res
      .status(400)
      .json({ message: 'El campo "quantity" es obligatorio.' })
  }

  if (!body.name) {
    return res.status(400).json({ message: 'El campo "name" es obligatorio.' })
  }

  // @ts-ignore
  if (!req.file) {
    return res.status(400).json({ message: 'El campo "image" es obligatorio.' })
  }

  next()
}


interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

declare global {
  namespace Express {
    interface Request {
      file: MulterFile;
    }
  }
}


export const vanewproduct2 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body);
  console.log(req.file);  // Acceder a req.file para obtener la información del archivo

  const { body, file } = req;

  if (!body.quantity) {
    return res
      .status(400)
      .json({ message: 'El campo "quantity" es obligatorio.' });
  }

  if (!body.name) {
    return res.status(400).json({ message: 'El campo "name" es obligatorio.' });
  }

  // Verificar req.file en lugar de body.image
  if (!file) {
    return res.status(400).json({ message: 'El campo "img" es obligatorio.' });
  }

  next();
};
