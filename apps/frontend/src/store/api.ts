import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '@repo/shared/book';
import { VITE_API_URL } from '../config';

export const booksApi = createApi({
    reducerPath: 'booksApi',

    baseQuery: fetchBaseQuery({
        baseUrl: `${VITE_API_URL}/api/books`
    }),

    endpoints: builder => ({
        searchBooks: builder.query<Book[], string>({
            query: searchTerm => ({
                url: '/search',
                params: {
                    q: searchTerm
                }
            }),

            keepUnusedDataFor: 300
        })
    })
});

export const { useLazySearchBooksQuery } = booksApi;