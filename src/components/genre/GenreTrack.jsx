import { useRef } from "react";
import GenreCard from "./GenreCard";

export default function GenreTrack({ genres, currentIndex, getImage }) {
    const trackRef = useRef(null);

    const scrollCards = (direction) => {
        if (trackRef.current) {
            trackRef.current.scrollBy({
                left: direction * trackRef.current.clientWidth * 0.8,
                behavior: "smooth",
            });
        }
    };

    return (
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <div className="genre-track" ref={trackRef}>
                    {genres.map((item, index) => (
                        <GenreCard
                            key={item.name}
                            item={item}
                            isActive={index === currentIndex}
                            imageSrc={getImage(item.movie)}
                        />
                    ))}
                </div>

                <button
                    className="genre-track-btn"
                    onClick={() => scrollCards(1)}
                    aria-label="Geser genre ke kanan"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    );
}