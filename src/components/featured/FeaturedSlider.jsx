import MovieCard from "../common/MovieCard"

export default function FeaturedSlider({ movies, currentIndex, onNext }) {
    // Fungsi helper untuk menghitung posisi kartu bertumpuk
    const getPositionClass = (index) => {
        const diff = (index - currentIndex + movies.length) % movies.length;
        if (diff === 0) return "card-active";
        if (diff === 1) return "card-next-1";
        if (diff === 2) return "card-next-2";
        if (diff === 3) return "card-invisible";
        return "card-hidden-left";
    };

    return (
        <div className="featured-slider-area">
            <div className="featured-track">
                {movies.map((movie, index) => (
                    <div key={movie.id} className={`featured-card-wrapper ${getPositionClass(index)}`}>
                        <MovieCard movie={movie} badge={false} />
                    </div>
                ))}
            </div>

            <button className="featured-next-btn" onClick={onNext} aria-label="Next Featured">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}