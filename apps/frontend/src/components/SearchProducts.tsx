import { FaStar } from 'react-icons/fa';
import '../styles/search-products.css';
import { SearchProductsProps } from '../types';

export function SearchProducts({
    books
}: SearchProductsProps) {
    return (
        <section className="products">
            {books.map(book => {
                const {
                    key,
                    title,
                    cover_i
                } = book.openLibraryBook;

                const {
                    rating,
                    review_count
                } = book.googleBooksRating;

                const coverUrl = cover_i
                    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
                    : null;

                const displayedRating =
                    review_count > 0 ? rating : '-.-';

                return (
                    <article className="product" key={key}>
                        <div className="img-container">
                            {coverUrl ? (
                                <img
                                    src={coverUrl}
                                    alt={title}
                                    loading="lazy"
                                />
                            ) : (
                                <span>No cover</span>
                            )}

                            <p className="rating">
                                <FaStar />
                                {displayedRating}
                            </p>
                        </div>

                        <h4>{title}</h4>
                    </article>
                );
            })}
        </section>
    );
}