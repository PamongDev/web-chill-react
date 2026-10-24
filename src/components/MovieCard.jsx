export default function MovieCard({ movie }) {
    // Ambil 1 genre pertama saja untuk ditampilkan di detail (seperti di kodemu)
    const firstGenre = movie.genres && movie.genres.length > 0 ? movie.genres[0] : null;

    return (
        <article className="movie-card">
            <div className="movie-poster-wrap">
                <img 
                    className="movie-poster" 
                    src={movie.poster} 
                    alt={`${movie.title} poster`} 
                    loading="lazy" 
                />
                
                <div className="movie-card-overlay">
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-detail">
                        {/* Render span hanya jika datanya valid & bukan "—" */}
                        {movie.year && movie.year !== "—" && <span>{movie.year}</span>}
                        {movie.rating && movie.rating !== "—" && <span>{movie.rating}</span>}
                        {movie.duration && movie.duration !== "—" && <span>{movie.duration}</span>}
                        {firstGenre && <span>{firstGenre}</span>}
                    </div>
                </div>
            </div>
        </article>
    );
}