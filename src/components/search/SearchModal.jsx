import SearchInputHeader from "./SearchInputHeader";
import SearchResultsGrid from "./SearchResultsGrid";
import { useSearchModal } from "../../hooks/useSearchModal";
import "../../styles/search.css";

export default function SearchModal({ isOpen, onClose }) {
    const { query, setQuery, inputRef, results } = useSearchModal(isOpen, onClose);

    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay">
            <SearchInputHeader 
                query={query} 
                onQueryChange={setQuery} 
                inputRef={inputRef} 
                onClose={onClose} 
            />

            <div className="search-modal-body container">
                <SearchResultsGrid 
                    query={query} 
                    results={results} 
                    onMovieClick={onClose} 
                />
            </div>
        </div>
    );
}