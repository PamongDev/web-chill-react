import { useState } from "react";
import HeroMuteButton from "./HeroMuteButton";
import HeroContent from "./HeroContent";
import MovieTrailer from "./MovieTrailer";

export default function HeroSection({ featuredMovie }){
    const [isMuted, setIsMuted] = useState(true);
    if (!featuredMovie) return <section className="hero loading-hero">Loading...</section>;
    return (
        <section className="hero" aria-label="Featured movie">
                <MovieTrailer isMuted={isMuted} video={featuredMovie} />

                <div className="hero-overlay"></div>

                <HeroMuteButton isMuted={isMuted} 
                onToggle={() => setIsMuted(!isMuted)} />

                <HeroContent movie={featuredMovie} />
            </section>
    )
}