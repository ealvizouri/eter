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
import { vanewproduct } from './modules/validation'

const v1 = '/v1'
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
  const usersPrefix = '/usuarios'
  app.get(v1 + usersPrefix, getAllUsers)
  app.post(v1 + usersPrefix, singUp)
  app.post(`${v1}${usersPrefix}/login`, loginUser)

  const productsPrefix = '/products'
  app.get(v1 + productsPrefix, getAllProducts)
  app.post(
    v1 + productsPrefix,
    (req, res, next) => {
      console.log('Datos recibidos en createProduct:', req.body)
      next()
    },
    // vanewproduct,
    upload.single('img'),
    createProduct,
  )
  app.delete(`${v1}${productsPrefix}/:id`, auth, deleteProduct)
  app.put(
    `${v1}${productsPrefix}/:id`,
    auth,
    vanewproduct,
    upload.single('img'),
    updateProduct,
  )
  app.get(`${v1}${productsPrefix}/:id`, getProduct)

  const viewsPrefis = '/html'
  app.get(`${v1}${viewsPrefis}/upload`, (req, res) => {
    const filePath = path.join(__dirname, '../html/upload.html')
    res.sendFile(filePath)
  })
  app.get(`${v1}${viewsPrefis}/update`, (req, res) => {
    const filePath = path.join(__dirname, '../html/update.html')
    res.sendFile(filePath)
  })

  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(
        Object.keys(r.route.methods ?? [])
          .pop()
          ?.toUpperCase(),
        r.route.path,
      )
    }
  })
}
