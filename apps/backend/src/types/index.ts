import { OpenLibraryBook } from "@repo/shared/book";

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