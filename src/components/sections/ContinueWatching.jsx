// ContinueWatching.jsx
import LandscapeCard from "../common/LandscapeCard";
import SectionHeader from "../common/SectionHeader";
import SliderButton from "../common/SliderButton";
import { useSliderScroll } from "../../hooks/useSliderScroll";

export default function ContinueWatching({ eyebrow, title, linkTo, movies, isLoading }) {
    const { rowRef, handleScroll } = useSliderScroll();

    if (!Array.isArray(movies) || movies.length === 0) return null;

    const titleId = `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;

    return (
        // Hapus style display: none, biarkan polos
        <section className="movie-section" aria-labelledby={titleId}>
            <SectionHeader 
                eyebrow={eyebrow} 
                title={title} 
                linkTo={linkTo} 
                titleId={titleId} 
            />

            <div className="slider-wrapper">
                <SliderButton direction="left" onClick={() => handleScroll("left")} />
                
                <div className="movie-row landscape-row" ref={rowRef}>
                    {isLoading ? (
                        <p>Loading movies...</p>
                    ) : (
                        movies.map((movie) => (
                            <LandscapeCard 
                                key={movie.id} 
                                movie={movie} 
                                progressPercent={30} 
                                timeLabel={movie.duration} 
                            />
                        ))
                    )}
                </div>

                <SliderButton direction="right" onClick={() => handleScroll("right")} />
            </div>
        </section>
    );
}