import { useNavigate } from "react-router-dom";
import GenreBadge from "../genre/GenreBadge"
import { useMyList } from "../../hooks/useMyList";
export default function HeroContent({movie}){

    const navigate = useNavigate();
    const { toggleMyList, isInList } = useMyList();
    if(!movie) return null;

    const handleWatchNow = () =>{
        const isSeries = movie.seasons !== undefined;

        if(isSeries){
            navigate(`/series/detail/${movie.id}`);
        }else {
            navigate(`/movies/detail/${movie.id}`);
        }
    }
    const isAdded = isInList(movie.id);
    return (
        <div className="hero-content">
            <p className="eyebrow">CHILL ORIGINAL EXPERIENCE</p>
            <h1 className="hero-title">{movie.title}</h1>
            <div className="hero-meta">
                {movie.year && <span>{movie.year}</span>}
                {movie.rating && <span>{movie.rating}</span>}
                {movie.duration && <span>{movie.duration}</span>}
                {movie.rate && <span className="rate-text">⭐{movie.rate}</span>}
            </div>
            <div className="hero-meta">
                {movie.genres && movie.genres.map((genre, index) => (
                    <span key={index}><GenreBadge key={genre} genre={genre} type="all" /></span>
                ))}
            </div>
            <p className="hero-description">
                {movie.synopsis}
            </p>

            <div className="hero-actions">
                <button className="button button-primary" onClick={handleWatchNow}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M7 4.5C7 3.72 7.86 3.24 8.53 3.66L20 10.66C20.64 11.05 20.64 11.95 20 12.34L8.53 19.34C7.86 19.76 7 19.28 7 18.5V4.5Z" />
                    </svg> Watch Now
                </button>
                <button 
                    className={`button button-secondary ${isAdded ? "added" : ""}`} 
                    onClick={() => toggleMyList(movie)}
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
            </div>
        </div>
    )
}