import { googleBooksAxiosInstance, openLibraryAxiosInstance } from "../config/axios";
import config from "../config/config";
import { OpenLibraryResponse, GoogleBooksResponse } from "../types";
import logger from "../config/logger"

async function fetchOpenLibraryBooks(query: string): Promise<OpenLibraryResponse> {
    const res = await openLibraryAxiosInstance.get(`/search.json?q=${query}&limit=10`);
    const data = res.data;
    return data;
}

async function fetchGoogleBooksRatings(isbn: string): Promise<GoogleBooksResponse> {
    const res = await googleBooksAxiosInstance.get(`/volumes?q=isbn:${isbn}&key=${config.googleBooksApiKey}`);
    const data = res.data;
    return data;
}

export async function fetchBooks(query: string) {
    const openLibraryBooks = await fetchOpenLibraryBooks(query);
    logger.info(`Fetched ${openLibraryBooks.docs.length} books from Open Library`);
    logger.debug(`Fetched books from Open Library: ${JSON.stringify(openLibraryBooks)}`);

    const booksWithRatings = openLibraryBooks.docs.map(async (book) => {
        const isbn = book.isbn?.[0] || '';
        let googleBooksRatings = { rating: 0, review_count: 0 };
        logger.info(`Fetching ratings for book: ${book.title}`);
        logger.debug(`Fetching ratings for book: ${JSON.stringify(book)}`);
        if (isbn) {
            const data = await fetchGoogleBooksRatings(isbn);
            googleBooksRatings = {
                rating: data.items?.[0]?.volumeInfo.averageRating || 0,
                review_count: data.items?.[0]?.volumeInfo.ratingsCount || 0
            }
            logger.info(`Fetched ratings for book: ${book.title}`);
            logger.debug(`Fetched ratings for book: ${JSON.stringify(googleBooksRatings)}`);
        }
        else {
            logger.warn(`Book: ${book.title} has no ISBN`);
        }

        return {
            openLibraryBook: book,
            googleBooksRating: googleBooksRatings
        }
    })

    const books = await Promise.all(booksWithRatings);
    return books;
}