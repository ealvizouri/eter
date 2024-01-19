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
