import { useParams } from "react-router-dom"

import Header from "../../components/Header"
import FooterHome from "../../components/Footer"
import MovieSection from "../../components/MovieSection"
import { useMovies } from "../../hooks/useMovies"
import { useAuth } from "../../hooks/useAuth"
import "../../styles/detail.css";
import '../../styles/home.css';

export default function DetailMovie(){

    const { id } = useParams();
    const { user } = useAuth();
    const { movies, series, isLoading } = useMovies();

    if(!user) return null;
    if(isLoading) return (<div className="loading-screen">Loading details...</div>);

    // find movies id
    const movie = movies.find(item=> item.id.toString() === id);
    if (!movie) return <div className="error-screen">Film tidak ditemukan!</div>;

    // similar movies
    const similarMovies = movies.filter(m => m.id.toString() !== id).slice(0, 10);
    
    return (
        <div className="detail-page-wrapper">
            <Header username={user.username} email={user.email} />

            <main className="detail-page">
                <section className="detail-hero-backdrop">

                    <img src={`/${movie.poster}`} alt={`${movie.title} Background`} className="backdrop-img" />
                    <div className="backdrop-overlay"></div>
                    
                    <button className="button-massive-play" aria-label="Play Movie">
                        ▶
                    </button>
                </section>

                <section className="container detail-content-layout">
                    {/* Kiri: Poster */}
                    <div className="detail-poster-side">
                        <img src={`/${movie.poster}`} alt={movie.title} className="detail-poster-img" />
                    </div>

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
                                <span key={idx} className="genre-pill">{g}</span>
                            ))}
                        </div>

                        <div className="detail-action-buttons">
                            <button className="button button-secondary">＋ Playlist</button>
                            <button className="icon-button-outline" title="Favorit">❤️</button>
                            <button className="icon-button-outline" title="Trailer">▶</button>
                            <button className="icon-button-outline" title="Bagikan">🔗</button>
                        </div>

                        <p className="detail-synopsis">
                            {movie.synopsis }
                        </p>

                        <div className="detail-cast-section">
                            <h3 className="section-subtitle">Sutradara & Pemeran</h3>
                            <div className="cast-grid">
                                {/* Sutradara */}
                                {movie.director && (
                                    <div className="cast-card">
                                        <div className="avatar-anon">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-user"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                        </div>
                                        <span className="actor-name">{movie.director}</span>
                                        <span className="character-name">Sutradara</span>
                                    </div>
                                )}
                                
                                {/* Deretan Pemeran */}
                                {movie.cast?.map((actor, index) => (
                                    <div className="cast-card" key={index}>
                                        <div className="avatar-anon">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-user"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                        </div>
                                        <span className="actor-name">{actor.name}</span>
                                        <span className="character-name">{actor.character}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                <section className="container detail-recommendations">
                    <MovieSection 
                        eyebrow="SIMILAR TO THIS" 
                        title="Tontonan Serupa" 
                        movies={similarMovies} 
                        isLoading={isLoading} 
                    />
                </section>

                <section className="container detail-comments-section">
                    <h3 className="section-subtitle">Komentar Pilihan</h3>
                    <div className="comment-list">
                        <div className="comment-item">
                            <div className="comment-avatar">M</div>
                            <div className="comment-body">
                                <strong>Muhamad Fahmi</strong>
                                <p>Animasi pertarungannya gila banget! Studio Pierrot all out di film ini. Wajib nonton buat fans anime action 🔥</p>
                            </div>
                        </div>
                        <div className="comment-item">
                            <div className="comment-avatar">A</div>
                            <div className="comment-body">
                                <strong>Asep Setiawan</strong>
                                <p>Jalan ceritanya lumayan klise, tapi terbayar lunas sama visual efeknya yang super mewah.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FooterHome />
        </div>
    ) ;
}