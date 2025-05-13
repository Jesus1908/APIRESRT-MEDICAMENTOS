import express from 'express'
import medicamentosRoutes from './routes/medicamentos.routes.js'

const app = express()

app.use(express.json())
app.use('/api/', medicamentosRoutes) 

app.use((req, res, next) => {
  res.status(404).json({
    message: 'No existe el endpoint'
  })
})

export default app