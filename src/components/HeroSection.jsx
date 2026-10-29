import { useState } from "react";
import HeroMuteButton from "./HeroMuteButton";
import HeroContent from "./HeroContent";
import MovieTrailer from "./MovieTrailer";

export default function HeroSection({ topFiveMovies }){
    const [isMuted, setIsMuted] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);


    const activeMovie = topFiveMovies[currentIndex];
    
    if(!activeMovie) return null;
    return (
        <section className="hero" aria-label="Featured movie">
            <MovieTrailer isMuted={isMuted} video={activeMovie} />

            <div className="hero-overlay"></div>

            <HeroMuteButton isMuted={isMuted} 
            onToggle={() => setIsMuted(!isMuted)} />
            <div key={activeMovie.id} className="hero-slide-animation">
                <HeroContent movie={activeMovie} />
            </div>
            <div className="hero-slider-indicators">
                {topFiveMovies.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}