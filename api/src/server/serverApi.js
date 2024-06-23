import express from 'express'
import cors from 'cors'
import { errorsRouter, usuariosRouter } from './router/index.js'
import { serverLog } from './middlewares/serverLog.middleware.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use(serverLog)

app.use(usuariosRouter)
app.use(errorsRouter)

app.listen(PORT, () => console.log(`🔥 Server UP! 🔥 http://localhost:${PORT}`))
