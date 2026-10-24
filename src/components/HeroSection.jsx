import { useState } from "react";
import HeroMuteButton from "./HeroMuteButton";

export default function HeroSection(){
    const [isMuted, setIsMuted] = useState(true);
    return (
        <section className="hero" aria-label="Featured movie">
                <video
                    className="hero-video"
                    src="assets/videos/trailer-movies/t21_bcwk.mp4"
                    poster="assets/images/poster-movies/21_poster_black clover.jpg"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                ></video>

                <div className="hero-overlay"></div>

                <HeroMuteButton isMuted={isMuted} 
                onToggle={() => setIsMuted(!isMuted)} />

                <div className="hero-content">
                    <p className="eyebrow">CHILL ORIGINAL EXPERIENCE</p>
                    <h1 className="hero-title">Black Clover: Sword of the Wizard King</h1>
                    <div className="hero-meta">
                        <span>2023</span>
                        <span>PG-13</span>
                        <span>1h 53m</span>
                        <span>Action</span>
                        <span>Adventure</span>
                        <span>Fantasy</span>
                        <span>Animation</span>
                    </div>
                    <p className="hero-description">
                        Asta and Yuno, two orphans in a world where magic is everything, embark on a journey to become the Wizard King.
                    </p>

                    <div className="hero-actions">
                        <a className="button button-primary" href="#">▶ Watch Now</a>
                        <button className="button button-secondary" type="button">＋ Playlist</button>
                    </div>
                </div>
            </section>
    )
}