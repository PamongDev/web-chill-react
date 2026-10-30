import { useState } from "react";
import GenreBackdrop from "./GenreBackdrop";
import GenreHeroContent from "./GenreHeroContent";
import GenreTrack from "./GenreTrack";
import "../../styles/GenreSection.css"

// Helper function tetap bisa ditaruh terpisah atau di luar komponen
const getImage = (movie) => {
    const src = movie?.bg || movie?.poster || "";
    if (!src) return "";
    return /^(https?:\/\/|\/|data:|blob:)/i.test(src) ? src : `/${src}`;
};

export default function GenreSection({ genres = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!genres || genres.length === 0) return null;

    const active = genres[currentIndex % genres.length];
    if (!active) return null;

    const changeGenre = (step) => {
        setCurrentIndex((i) => (i + step + genres.length) % genres.length);
    };

    return (
        <section className="genre-section">
            <GenreBackdrop imageSrc={getImage(active.movie)} />

            <div className="genre-inner">
                <GenreHeroContent 
                    active={active} 
                    onChangeGenre={changeGenre} 
                />
                <GenreTrack 
                    genres={genres} 
                    currentIndex={currentIndex} 
                    getImage={getImage} 
                />
            </div>
        </section>
    );
}