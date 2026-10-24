export default function MovieCard({ movie }) {
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
                
                {/* --- KUMPULAN BADGE YANG SELALU MUNCUL --- */}
                <div className="card-badges-top">
                    
                    <div className="badge-group-left">
                        {/* 1. Badge Rate IMDb (Kaca Buram + SVG Bintang) */}
                        {movie.rate && (
                            <div className="badge glass-badge">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-star">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                <span>{movie.rate}</span>
                            </div>
                        )}
                        
                        {/* 2. Badge Rating Usia (Kaca Buram) */}
                        {movie.rating && movie.rating !== "—" && (
                            <div className="badge glass-badge rating-badge">
                                {movie.rating}
                            </div>
                        )}
                    </div>

                    {/* 3. Badge Premium (Gradasi Emas + SVG Mahkota) */}
                    <div className="badge premium-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-crown">
                            <path d="M11.773 2.115c.346-.426.974-.43 1.325-.008l4.475 5.378 4.778-1.593a.75.75 0 0 1 .947.925l-2.73 11.854a.75.75 0 0 1-.733.581H4.227a.75.75 0 0 1-.733-.581L.764 7.817a.75.75 0 0 1 .947-.925l4.778 1.593 4.475-5.378a.25.25 0 0 1 .809-.063z" />
                        </svg>
                    </div>
                </div>
                
                {/* --- DETAIL SAAT DI-HOVER --- */}
                <div className="movie-card-overlay">
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-detail">
                        {/* Hanya tersisa elemen yang tidak dijadikan badge */}
                        {movie.year && movie.year !== "—" && <span>{movie.year}</span>}
                        {movie.duration && movie.duration !== "—" && <span>{movie.duration}</span>}
                        {firstGenre && <span>{firstGenre}</span>}
                    </div>
                </div>
            </div>
        </article>
    );
}