import { Router } from 'express'
import { searchBooks } from '../controllers/book.controller'

const router = Router()

router.get('/search', searchBooks)

export default router
