import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from './handlers/products'
import { getAllUsers, singUp, loginUser } from './handlers/users'
import path, { dirname } from 'path'
import uuid from './modules/uuid'
import { auth } from './modules/auth'
import os from 'os'

const multer = require('multer')
//const upload = multer({dest:'../uploads/'})

export const uploadsFolder = `${dirname(
  dirname(__dirname),
)}/front-end/public/uploads`

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsFolder)
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuid()}_${file.originalname}`
    cb(null, uniqueFilename)
  },
})

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'img', maxCount: 1 }])

export default (app: any) => {
  const users = Router()
  users.use('/usuarios', [
    users.get('/', getAllUsers),
    users.post('/', singUp),
    users.post('/login', loginUser),
  ])

  const products = Router()
  products.use('/products', [
    products.delete('/', auth, deleteProduct),
    products.get('/', auth, getAllProducts),
    products.post('/', auth,upload.single('img'), createProduct),
    products.put('/', upload.single('img'), updateProduct),
    products.get('/product', getProduct),

  ])

  const views = Router()
  views.use('/html', [
    views.get('/upload', (req, res) => {
      const filePath = path.join(__dirname, '../html/upload.html')
      res.sendFile(filePath)
    }),
    views.get('/update', (req, res) => {
      const filePath = path.join(__dirname, '../html/update.html')
      res.sendFile(filePath)
    }),
  ])

  app.use('/v1', [products])
  app.use('/v1', [users])
  app.use('/v1', [views])
}
