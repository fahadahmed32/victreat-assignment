import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/book.routes'
import rateLimit from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                   // max 100 requests per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
})

app.use(limiter)


app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || '*'
}))

app.use(express.json())

app.use('/api/books', bookRoutes)

export default app
