import MovieCard from "../common/MovieCard";
import SectionHeader from "../common/SectionHeader";
import SliderButton from "../common/SliderButton";
import useSliderScroll from "../../hooks/useSliderScroll";

export default function MovieSection({ eyebrow, title, linkTo, movies, isLoading }) {
    // Re-use Custom Hook scroll yang sama
    const { rowRef, handleScroll } = useSliderScroll();
    
    // Format id heading agar ramah aksesibilitas (aria-labelledby)
    const titleId = `${title?.toLowerCase().replace(/\s+/g, "-")}-heading`;

    return (
        <section className="movie-section" aria-labelledby={titleId}>
            <SectionHeader 
                eyebrow={eyebrow} 
                title={title} 
                linkTo={linkTo} 
                titleId={titleId} 
            />
            <div className="slider-wrapper">
                <SliderButton direction="left" onClick={() => handleScroll("left")} />

                <div className="movie-row" ref={rowRef}>
                    {isLoading ? (
                        <p>Loading movies...</p>
                    ) : (
                        movies?.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    )}
                </div>
                <SliderButton direction="right" onClick={() => handleScroll("right")} />
            </div>
        </section>
    );
}