import { useParams } from "react-router-dom"
import { useState } from "react"

import Header from "../../components/Header"
import FooterHome from "../../components/Footer"
import MovieSection from "../../components/MovieSection"
import { useMovies } from "../../hooks/useMovies"
import { useAuth } from "../../hooks/useAuth"
import "../../styles/detail.css";
import '../../styles/home.css';
export default function DetailSeries(){
    const { id } = useParams();
    const { user } = useAuth();
    const { series, isLoading } = useMovies();

    const [activeSeason, setActiveSeason] = useState(0);

    if(!user) return null;
    if(isLoading) return <div className="loading-screen">Loading details...</div>; 

    const seriesItem = series.find(item=> item.id.toString() === id);
    if (!seriesItem) return <div className="error-screen">Film tidak ditemukan!</div>;

    const similarSeries = series.filter(s => s.id.toString() !== id).slice(0, 10);

    return(
        <div className="detail-page-wrapper">
            <Header username={user.username} email={user.email} />

                <main className="detail-page">
                    {/* --- 1. HERO BACKDROP --- */}
                    <section className="detail-hero-backdrop">
                        <img src={`/${seriesItem.bg}`} alt={`${seriesItem.title} Background`} className="backdrop-img" />
                        <div className="backdrop-overlay"></div>
                        {/* <button className="button-massive-play" aria-label="Play Movie">▶</button> */}
                    </section>

                    {/* --- 2. LAYOUT ATAS (Poster Kiri, Info Kanan) --- */}
                    <section className="container detail-content-layout">
                        {/* Kiri: Poster */}
                        <div className="detail-poster-side">
                            <img src={`/${seriesItem.poster}`} alt={seriesItem.title} className="detail-poster-img" />
                        </div>

                        {/* Kanan: Info */}
                        <div className="detail-info-side">
                            <h1 className="detail-title">{seriesItem.title}</h1>

                            <div className="detail-meta premium-meta">
                                {seriesItem.rating && <span className="badge glass-badge rating-badge">{seriesItem.rating}</span>}
                                {seriesItem.year && <span>{seriesItem.year}</span>}
                                <span className="dot-separator">•</span>
                                {seriesItem.duration && <span>{seriesItem.duration}</span>}
                                {seriesItem.country && (
                                    <>
                                        <span className="dot-separator">•</span>
                                        <span>{seriesItem.country}</span>
                                    </>
                                )}
                                <span className="dot-separator">•</span>
                                {seriesItem.rate && <span className="rate-text">⭐ {seriesItem.rate}</span>}
                            </div>

                            <div className="detail-genres">
                                {seriesItem.genres?.map((g, idx) => (
                                    <span key={idx} className="genre-pill">{g}</span>
                                ))}
                            </div>

                            <div className="detail-action-buttons">
                                {/* Tombol Playlist */}
                                <button className="ticket-button" aria-label="Add to Playlist">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                    Playlist
                                </button>

                                {/* Tombol Favorite */}
                                <button className="ticket-button" aria-label="Add to Favorite">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                    </svg>
                                    Favorite
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
                                <button className="ticket-button" aria-label="Share">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="18" cy="5" r="3"/>
                                        <circle cx="6" cy="12" r="3"/>
                                        <circle cx="18" cy="19" r="3"/>
                                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                                    </svg>
                                    Bagikan
                                </button>
                            </div>

                            <p className="detail-synopsis">
                                {seriesItem.synopsis}
                            </p>
                        </div>
                    </section> 
                    {/* TUTUP SECTION INFO DISINI! Sekarang yang di bawah ini akan jadi full-width */}

                    <section className="container detail-player-section">
                        <h3 className="section-subtitle">Pemutar Video</h3>
                        <div className="video-player-frame">
                            <iframe 
                                src={`https://www.youtube.com/embed/${seriesItem.key}`} 
                                title={seriesItem.title} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>

                    {/* --- 3. EPISODE (Sejajar Kiri) --- */}
                    <section className="container series-episodes-section">
                        <div className="season-header">
                            <h2 className="section-subtitle">Episode</h2>
                            
                            {seriesItem.seasons && seriesItem.seasons.length > 1 && (
                                <select 
                                    className="season-dropdown"
                                    value={activeSeason} 
                                    onChange={(e) => setActiveSeason(Number(e.target.value))}
                                >
                                    {seriesItem.seasons.map((season, index) => (
                                        <option key={index} value={index}>
                                            Season {season.season_number}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="episodes-list">
                            {seriesItem.seasons?.[activeSeason]?.episodes?.map((eps) => {
                                // 1. Pilih sumber gambar: eps.thumbnail -> seriesItem.bg -> seriesItem.thumbnail
                                const rawImage = seriesItem.bg || seriesItem.thumbnail;

                                // 2. Cek apakah URL dari internet (http) atau lokal (tambahkan /)
                                const thumbnailUrl = rawImage?.startsWith('http') 
                                    ? rawImage 
                                    : `/${rawImage}`;

                                return (
                                    <div className="episode-card" key={eps.id}>
                                        <h3 className="episode-number">{eps.episode_number}</h3>
                                        <div className="episode-thumbnail">
                                            <img src={thumbnailUrl} alt={eps.title} loading="lazy" />
                                            <div className="episode-play-btn">▶</div>
                                        </div>
                                        <div className="episode-info">
                                            <h4 className="episode-title">{eps.title}</h4>
                                            <span className="episode-duration">{eps.duration}</span>
                                            <p className="episode-desc">{seriesItem.synopsis}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* --- 4. CAST & DIRECTOR (Sejajar Kiri) --- */}
                    <section className="container detail-cast-section" style={{ marginTop: "2rem" }}>
                        <h3 className="section-subtitle">Sutradara & Pemeran</h3>
                        <div className="cast-grid">
                            {seriesItem.director && (
                                <div className="cast-card">
                                    <div className="avatar-anon">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="icon-user"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                    </div>
                                    <span className="actor-name">{seriesItem.director}</span>
                                    <span className="character-name">Sutradara</span>
                                </div>
                            )}
                            
                            {seriesItem.cast?.map((actor, index) => (
                                <div className="cast-card" key={index}>
                                    <div className="avatar-anon">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="icon-user"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                    </div>
                                    <span className="actor-name">{actor.name}</span>
                                    <span className="character-name">{actor.character}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- 5. REKOMENDASI --- */}
                    <section className="container detail-recommendations" style={{ marginTop: "2rem" }}>
                        <MovieSection 
                            eyebrow="SIMILAR TO THIS" 
                            title="Tontonan Serupa" 
                            movies={similarSeries} 
                            isLoading={isLoading} 
                        />
                    </section>

                    {/* --- 6. KOMENTAR --- */}
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
    )
}