import { useState } from "react";
import HeroMuteButton from "./HeroMuteButton";
import HeroContent from "./HeroContent";
import MovieTrailer from "./MovieTrailer";

export default function HeroSection({ featuredMovie }){
    console.log(featuredMovie);
    const [isMuted, setIsMuted] = useState(true);
    if (!featuredMovie) return <section className="hero loading-hero">Loading...</section>;
    return (
        <section className="hero" aria-label="Featured movie">
                <MovieTrailer isMuted={isMuted} videoId={featuredMovie.yt_trailer} />

                <div className="hero-overlay"></div>

                <HeroMuteButton isMuted={isMuted} 
                onToggle={() => setIsMuted(!isMuted)} />

                <HeroContent movie={featuredMovie} />
            </section>
    )
}