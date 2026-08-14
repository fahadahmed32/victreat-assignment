import type { Book } from '@repo/shared/book';

export interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    isSearching: boolean;
}

export interface SearchProductsProps {
    books: Book[];
}
