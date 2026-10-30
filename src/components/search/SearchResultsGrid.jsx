import MovieCard from "../common/MovieCard"

export default function SearchResultsGrid({ query, results, onMovieClick }) {
    const isQueryEmpty = query.trim() === "";

    if (isQueryEmpty) {
        return (
            <div className="search-empty-state">
                <p>Cari tontonan favoritmu hari ini.</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="search-empty-state">
                <p>Waduh, <span>"{query}"</span> tidak ditemukan di Chill.</p>
            </div>
        );
    }

    return (
        <div className="movie-grid" onClick={onMovieClick}>
            {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} badge={false} />
            ))}
        </div>
    );
}