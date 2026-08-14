import { Request, Response } from "express"
import { fetchBooks } from "../services/book.service"
import logger from "../config/logger"

export const searchBooks = async (req: Request, res: Response) => {
    try {
        const query = req.query.q
        logger.info(`Searching for books: ${query}`);
        const result = await fetchBooks(query as string)
        res.json(result)
    } catch (error) {
        logger.error(`Error searching for books: ${error}`);
        res.status(500).json({ message: 'Internal server error' })
    }
}