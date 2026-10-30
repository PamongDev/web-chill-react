export default function GenreHeroContent({ active, onChangeGenre }) {
    return (
        <div className="featured-content" key={active.name}>
            <p className="featured-eyebrow">EKSPLORASI DUNIA</p>
            <h3 className="hero-title">{active.name}</h3>

            <p className="genre-movie">
                Title: <strong>{active.movie.title}</strong>
            </p>

            <p className="genre-synopsis">
                {active.movie.synopsis}
            </p>

            <div className="genre-controls">
                <button onClick={() => onChangeGenre(-1)} aria-label="Genre sebelumnya">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button onClick={() => onChangeGenre(1)} aria-label="Genre selanjutnya">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    );
}