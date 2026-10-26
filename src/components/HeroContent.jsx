import { useNavigate } from "react-router-dom";
export default function HeroContent({movie}){

    const navigate = useNavigate();
    if(!movie) return null;

    const handleWatchNow = () =>{
        const isSeries = movie.seasons !== undefined;

        if(isSeries){
            navigate(`/series/${movie.id}`);
        }else {
            navigate(`/movie/${movie.id}`);
        }
    }
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
                {/* Looping genre agar rapi */}
                {movie.genres && movie.genres.map((genre, index) => (
                    <span key={index}>{genre}</span>
                ))}
            </div>
            <p className="hero-description">
                {movie.synopsis}
            </p>

            <div className="hero-actions">
                <button className="button button-primary" onClick={handleWatchNow}>▶ Watch Now</button>
                <button className="button button-secondary" type="button">＋ Playlist</button>
            </div>
        </div>
    )
}