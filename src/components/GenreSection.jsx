
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/GenreSection.css";

const getImage = (movie) => {
    const src = movie?.bg || movie?.poster || "";
    if (!src) return "";
    return /^(https?:\/\/|\/|data:|blob:)/i.test(src) ? src : `/${src}`;
};

export default function GenreSection({ movies = [], genres }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef(null);

    // Ambil dua film berbeda dari setiap genres

    const active = genres[currentIndex % (genres.length || 1)];

    // Cek apakah kartu masih bisa digeser.
    

    if (!active) return null;

    const changeGenre = (step) => {
        setCurrentIndex((i) =>
            (i + step + genres.length) % genres.length
        );
    };

    const scrollCards = (direction) => {
        trackRef.current?.scrollBy({
            left: direction * trackRef.current.clientWidth * 0.8,
            behavior: "smooth",
        });
    };

    return (
        <section className="genre-section">
            <div className="genre-backdrop">
                <img src={getImage(active.movie)} alt="" />
                <div className="featured-overlay" />
            </div>

            <div className="genre-inner">
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
                        <button onClick={() => changeGenre(-1)} aria-label="Genre sebelumnya">‹</button>
                        <button onClick={() => changeGenre(1)} aria-label="Genre selanjutnya">›</button>
                    </div>
                </div>

                <div className="genre-browse">
                    <div className="genre-heading">
                        <h3>Jelajahi Genre</h3>
                    </div>

                    <div className="genre-track-wrapper">
                        <button
                            className="genre-track-btn"
                            onClick={() => scrollCards(-1)}
                            aria-label="Geser genre ke kiri"
                        >
                            ‹
                        </button>

                        <div className="genre-track" ref={trackRef}>
                            {genres.map((item, index) => (
                                <Link
                                    to={`/genre/${encodeURIComponent(item.name)}`}
                                    className={`genre-card ${
                                        index === currentIndex ? "active" : ""
                                    }`}
                                    key={item.name}
                                >
                                    <img
                                        src={getImage(item.movie)}
                                        alt=""
                                        loading="lazy"
                                    />
                                    <div className="genre-card-overlay" />
                                    <h4>{item.name}</h4>
                                </Link>
                            ))}
                        </div>

                        <button
                            className="genre-track-btn"
                            onClick={() => scrollCards(1)}
                            aria-label="Geser genre ke kanan"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
