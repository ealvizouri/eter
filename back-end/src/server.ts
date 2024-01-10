import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import setUpRoutes from './routes'

const app = express()

app.use(
  cors({
    origin: '*',
  }),
)
app.use(morgan('dev'))
app.use(express.json()) // allows a client to send JSON to the server, basically it parses request data into JSON
app.use(express.urlencoded({ extended: true })) // it will parse the query string into an object.  ?var1=a&var2=b -> { var1: 'a', var2: 'b' }

app.get('/', (req, res) => {
  res.json({ status: 'Ok' })
})

setUpRoutes(app)

app.use((err, req, res, _) => {
  console.error(err)
  res.status(404).json({ message: `not found` })
})

export default app
