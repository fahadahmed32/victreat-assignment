import { Request, Response } from "express"
import { fetchBooks } from "../services/book.service"
import logger from "../config/logger"
import axios from "axios"

export const searchBooks = async (req: Request, res: Response) => {
    try {
        const query = req.query.q
        logger.info(`Searching for books: ${query}`);
        const result = await fetchBooks(query as string)
        res.json(result)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            logger.error(
                `Google Books error ${error.response?.status}: ${JSON.stringify(
                    error.response?.data
                )}`
            );
        } else {
            logger.error(`Unexpected error: ${error}`);
        }
        res.status(500).json({ message: 'Internal server error' })
    }
}