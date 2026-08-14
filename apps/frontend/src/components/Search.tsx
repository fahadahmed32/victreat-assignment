import type { ChangeEvent } from 'react';
import '../styles/search.css';

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    isSearching: boolean;
}

export function Search({
    value,
    onChange,
    isSearching
}: SearchProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <section className="search">
            <h2>Explore</h2>

            <div className="search-bar">
                <input
                    type="search"
                    value={value}
                    onChange={handleChange}
                    placeholder="Find the book"
                    autoComplete="off"
                />

                <div className="search-status" aria-live="polite">
                    {isSearching ? 'Searching...' : ''}
                </div>
            </div>
        </section>
    );
}