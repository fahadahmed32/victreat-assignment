import { useEffect, useState } from 'react';
import { useLazySearchBooksQuery } from '../store/api';

const DEBOUNCE_DELAY = 500;
const MINIMUM_QUERY_LENGTH = 2;

export function useBookSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [executedSearchTerm, setExecutedSearchTerm] = useState('');

    const [
        searchBooks,
        {
            currentData,
            isLoading,
            isFetching,
            isError,
            error,
            reset
        }
    ] = useLazySearchBooksQuery();

    useEffect(() => {
        const normalizedSearchTerm = searchTerm.trim();

        if (normalizedSearchTerm.length < MINIMUM_QUERY_LENGTH) {
            setExecutedSearchTerm('');
            reset();
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setExecutedSearchTerm(normalizedSearchTerm);

            searchBooks(normalizedSearchTerm, true);
        }, DEBOUNCE_DELAY);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [searchTerm, searchBooks, reset]);

    const isDebouncing =
        searchTerm.trim().length >= MINIMUM_QUERY_LENGTH &&
        searchTerm.trim() !== executedSearchTerm;

    return {
        searchTerm,
        setSearchTerm,

        books: isDebouncing ? [] : currentData ?? [],

        isDebouncing,
        isLoading,
        isFetching,
        isError,
        error,

        hasSearchTerm:
            searchTerm.trim().length >= MINIMUM_QUERY_LENGTH,

        hasCompletedSearch:
            executedSearchTerm.length >= MINIMUM_QUERY_LENGTH &&
            !isDebouncing &&
            !isLoading &&
            !isFetching
    };
}