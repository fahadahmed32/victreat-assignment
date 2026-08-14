# Book Search

A small full-stack book search application built with React, Express, TypeScript, and Nx.

The application searches books using the Open Library API and then uses the ISBN of each result to fetch rating information from the Google Books API.

## Project Structure

This repository is an Nx monorepo containing a frontend and backend application.

```text
apps/
├── backend/
└── frontend/

shared/
└── book.ts
```

The shared folder contains the book interfaces used by both applications.

## Backend

The backend is an Express and TypeScript application.

It provides the following endpoint:

```http
GET /api/books/search?q=dune
```

### Backend pipeline

When a search request is received:

1. The backend sends the search term to the Open Library API.
2. Open Library returns book information such as title, author, ISBN, cover ID, and publication year.
3. The backend takes the ISBN from each book.
4. It requests rating information from the Google Books API.
5. The Open Library book and Google rating are combined into one object.
6. Books whose Google request fails are skipped.
7. The combined results are returned to the frontend.

The backend also includes:

- CORS configuration
- Request rate limiting
- Axios instances for external APIs
- Winston logging
- Shared TypeScript interfaces

Example response:

```json
[
  {
    "openLibraryBook": {
      "key": "/works/OL893415W",
      "title": "Dune",
      "author_name": ["Frank Herbert"],
      "isbn": ["9780441172719"],
      "cover_i": 11481354,
      "first_publish_year": 1965
    },
    "googleBooksRating": {
      "rating": 4.5,
      "review_count": 120
    }
  }
]
```

## Frontend

The frontend is a React and Vite application written in TypeScript.

It contains one screen with:

- A book search input
- Debounced searching
- Loading and error states
- Book covers
- Book titles and authors
- Google Books ratings

### Frontend pipeline

When the user types in the search input:

1. The custom search hook stores the current input.
2. The request is delayed by 500 milliseconds using debouncing.
3. If the user types again, the previous timer is cancelled.
4. After the user stops typing, the hook triggers an RTK Query lazy query.
5. RTK Query checks its cache and calls the backend when needed.
6. The returned books are passed to the search products component.
7. The component renders the book cover, title, and rating.

Queries shorter than two characters are not sent.

RTK Query is used for API state, request caching, loading state, and error handling.

## Technologies

### Backend

- Node.js
- Express
- TypeScript
- Axios
- Winston
- Express Rate Limit

### Frontend

- React
- TypeScript
- Vite
- Redux Toolkit Query
- React Redux
- React Icons

### Workspace

- Nx
- npm

## Setup

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd victreat_assignment
```

Install dependencies from the repository root:

```bash
npm install
```

## Environment Variables

Create a backend environment file:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Add the backend variables:

```env
PORT=3000
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
NODE_ENV=development
ALLOWED_ORIGIN=http://localhost:4200
```

The Google Books API must be enabled for the Google Cloud project associated with the API key.

Create a frontend environment file:

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

Add the backend URL:

```env
VITE_API_URL=http://localhost:3000
```

Do not include `/api/books` in `VITE_API_URL` because the frontend API configuration adds that path.

## Running the Project

The backend and frontend should run in separate terminals.

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

Start the frontend:

```bash
npm run dev:fe
```

The frontend runs on:

```text
http://localhost:4200
```

## Building the Project

Build the backend:

```bash
npm run build:backend
```

Build the frontend:

```bash
npm run build:fe
```

The production files are generated inside the `dist` directory.

## Backend Production Start

Build and start the backend:

```bash
npm run build:backend
npm run start:backend
```

## API Testing

The search endpoint can be tested directly in a browser or with curl:

```bash
curl "http://localhost:3000/api/books/search?q=dune"
```

## Notes

Some books may not have ratings in Google Books. In those cases, the rating is returned as zero.

Google Books can also occasionally return temporary errors. A failed rating request is handled per book so that one failure does not prevent the rest of the search results from being returned.