import LandscapeCard from "../common/LandscapeCard";
import SectionHeader from "../common/SectionHeader";
import SliderButton from "../common/SliderButton";
import useSliderScroll from "../../hooks/useSliderScroll";

export default function ContinueWatching({ eyebrow, title, linkTo, movies, isLoading }) {
    // 💡 Wajib dipanggil di dalam body fungsi, SEBELUM 'return'
    const { rowRef, handleScroll } = useSliderScroll();

    const titleId = `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;

    return (
        <section className="movie-section" aria-labelledby={titleId}>
            <SectionHeader 
                eyebrow={eyebrow} 
                title={title} 
                linkTo={linkTo} 
                titleId={titleId} 
            />

            <div className="slider-wrapper">
                {/* 💡 Panggil fungsi handleScroll di handler onClick */}
                <SliderButton direction="left" onClick={() => handleScroll("left")} />
                
                {/* 💡 Oper ref murni ke div */}
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