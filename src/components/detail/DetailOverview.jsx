import GenreBadge from "../genre/GenreBadge"

export default function DetailOverview({ 
    movie, 
    isAdded, 
    onToggleMyList, 
    onShare, 
    toastMessage 
}) {
    return (
        <section className="container detail-content-layout">
            {/* Kiri: Poster */}
            <div className="detail-poster-side">
                <img src={`/${movie.poster}`} alt={movie.title} className="detail-poster-img" />
            </div>

            {/* Kanan: Info */}
            <div className="detail-info-side">
                <h1 className="detail-title">{movie.title}</h1>

                <div className="detail-meta premium-meta">
                    {movie.rating && <span className="badge glass-badge rating-badge">{movie.rating}</span>}
                    {movie.year && <span>{movie.year}</span>}
                    <span className="dot-separator">•</span>
                    {movie.duration && <span>{movie.duration}</span>}
                    {movie.country && (
                        <>
                            <span className="dot-separator">•</span>
                            <span>{movie.country}</span>
                        </>
                    )}
                    <span className="dot-separator">•</span>
                    {movie.rate && <span className="rate-text">⭐ {movie.rate}</span>}
                </div>

                <div className="detail-genres">
                    {movie.genres?.map((g, idx) => (
                        <span key={idx} className="genre-pill">
                            <GenreBadge genre={g} type="all" />
                        </span>
                    ))}
                </div>

                <div className="detail-action-buttons">
                    {/* Tombol Playlist */}
                    <button 
                        className={`ticket-button ${isAdded ? "added" : ""}`} 
                        onClick={() => onToggleMyList(movie)}
                    >
                        {isAdded ? (
                            <>
                                <svg viewBox="0 0 24 24" width="20" fill="currentColor">
                                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                                </svg>
                                Tersimpan
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                PlayList
                            </>
                        )}
                    </button>

                    {/* Tombol Trailer */}
                    <button className="ticket-button" aria-label="Play Trailer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polygon points="10 8 16 12 10 16 10 8"/>
                        </svg>
                        Trailer
                    </button>

                    {/* Tombol Bagikan */}
                    <button className="ticket-button" onClick={onShare} aria-label="Bagikan Film">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        Bagikan
                    </button>

                    {/* Toast Notification */}
                    {toastMessage && (
                        <div className="toast-notification">
                            {toastMessage}
                        </div>
                    )}
                </div>

                <p className="detail-synopsis">{movie.synopsis}</p>
            </div>
        </section>
    );
}