import GenreBadge from "../genre/GenreBadge";

export default function FeaturedContent({ movie, titleEyebrow }) {
    return (
        <div className="featured-content" key={movie.id}>
            <p className="eyebrow">Featured in Chill</p>
            <h2 className="featured-eyebrow">{titleEyebrow}</h2>

            <div className="featured-movie-info">
                <h3 className="hero-title">{movie.title}</h3>

                <div className="hero-meta">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.rating && <span>{movie.rating}</span>}
                    {movie.duration && <span>{movie.duration}</span>}
                    {movie.rate && <span className="rate-text">⭐{movie.rate}</span>}
                </div>

                <div className="hero-meta">
                    {movie.genres?.map((g) => (
                        <GenreBadge key={g} genre={g} type="all" />
                    ))}
                </div>

                <p className="hero-description">{movie.synopsis}</p>
            </div>
        </div>
    );
}