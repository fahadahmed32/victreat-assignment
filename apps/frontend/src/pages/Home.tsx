import { Search } from '../../../frontend/src/components/Search';
import { SearchProducts } from '../../../frontend/src/components/SearchProducts';
import { useBookSearch } from '../../../frontend/src/hooks/useBookSearch';
import '../styles/home.css';

export function Homepage() {
    const {
        searchTerm,
        setSearchTerm,
        books,
        isDebouncing,
        isLoading,
        isFetching,
        isError,
        hasSearchTerm,
        hasCompletedSearch
    } = useBookSearch();

    const isSearching =
        isDebouncing || isLoading || isFetching;

    const hasNoResults =
        hasCompletedSearch &&
        !isError &&
        books.length === 0;

    return (
        <main className="homepage">
            <Search
                value={searchTerm}
                onChange={setSearchTerm}
                isSearching={isSearching}
            />

            {searchTerm.length > 0 && !hasSearchTerm && (
                <p className="homepage-message">
                    Enter at least two characters.
                </p>
            )}

            {isError && (
                <p className="homepage-error" role="alert">
                    The search failed. Please try again.
                </p>
            )}

            {hasNoResults && (
                <p className="homepage-message">
                    No books were found.
                </p>
            )}

            {!isError && books.length > 0 && (
                <SearchProducts books={books} />
            )}
        </main>
    );
}