export interface OpenLibraryBook {
    key: string;
    title: string;
    author_name: string[];
    isbn: string[];
    publish_date: string[];
    number_of_pages_median: number;
}


export interface GoogleBooksRating {
    rating: number;
    review_count: number;
}

export interface OpenLibraryResponse {
    docs: OpenLibraryBook[];
}

export interface GoogleBooksResponse {
    kind: string;
    totalItems: number;
    items?: BookItem[];
}

export interface BookItem {
    id: string;
    volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
    title: string;
    authors?: string[];
    averageRating?: number;
    ratingsCount?: number;
}

export interface Book {
    openLibraryBook: OpenLibraryBook;
    googleBooksRating: GoogleBooksRating;
}