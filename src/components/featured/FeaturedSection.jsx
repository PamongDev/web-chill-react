import { useState } from "react";
import FeaturedBackdrop from "./FeaturedBackdrop";
import FeaturedContent from "./FeaturedContent";
import FeaturedSlider from "./FeaturedSlider";

export default function FeaturedSection({ movies, titleEyebrow = "Best Featured for you today", hero = false }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const featuredMovies = movies ? movies.slice(0, 5) : [];
    if (featuredMovies.length === 0) return null;

    const activeMovie = featuredMovies[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    };

    return (
        <section className={`featured-section ${hero ? "hero" : ""}`}>
            <FeaturedBackdrop movie={activeMovie} />

            <div className="container featured-layout">
                <FeaturedContent movie={activeMovie} titleEyebrow={titleEyebrow} />
                <FeaturedSlider 
                    movies={featuredMovies} 
                    currentIndex={currentIndex} 
                    onNext={handleNext} 
                />
            </div>
        </section>
    );
}