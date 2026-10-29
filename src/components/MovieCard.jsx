import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MovieCard({ movie, disable=false, badge=true }) {
    const firstGenre = movie.genres && movie.genres.length > 0 ? movie.genres[0] : null;
    const navigate = useNavigate();

    const handleWatchNow = () =>{
        if(!disable){
            const isSeries = movie.seasons !== undefined;
            if(isSeries){
                navigate(`/series/detail/${movie.id}`);
            }else {
                navigate(`/movies/detail/${movie.id}`);
            }
        }
    } 

    return (
        <article className="movie-card" onClick={handleWatchNow}>
            
            <div className="movie-poster-wrap">
                <img
                    className="movie-poster"
                    src={`/${movie.poster}`}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                />

                {badge && (
                    <div className="card-badges-top">
                        <div className="badge-group-left">

                            {movie.rating && movie.rating !== "—" && (
                                <span className="badge age-badge">
                                    {movie.rating}
                                </span>
                            )}
                        </div>

                        <div className="badge-group-right">
                            <span className="badge age-badge">
                                {movie.type ||
                                    (movie.seasons || movie.episodes
                                        ? "SERIES"
                                        : "MOVIE")}
                            </span>

                            {movie.isPremium && (
                                <span className="badge premium-badge">
                                    PREMIUM
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div className="movie-card-overlay">
                    <h3 className="movie-title">{movie.title}</h3>

                    <div className="movie-detail">
                        {movie.year && movie.year !== "—" && (
                            <span>{movie.year}</span>
                        )}
                        {movie.duration && movie.duration !== "—" && (
                            <span>{movie.duration}</span>
                        )}
                        {firstGenre && <span>{firstGenre}</span>}
                    </div>
                </div>
            </div>

        </article>
    );
}