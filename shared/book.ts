export interface OpenLibraryBook {
    key: string;
    title: string;
    author_name?: string[];
    isbn?: string[];
    cover_i?: number;
    first_publish_year?: number;
}

export interface GoogleBooksRating {
    rating: number;
    review_count: number;
}

export interface Book {
    openLibraryBook: OpenLibraryBook;
    googleBooksRating: GoogleBooksRating;
}