import { useRef } from "react";
import { Link } from "react-router-dom";
import LandscapeCard from "./LandscapeCard";

export default function ContinueWatching({ eyebrow, title, linkTo, movies, isLoading }){

    const rowRef = useRef(null);
    const handleScroll =(direction)=>{
        if(rowRef.current){
            const {scrollLeft, clientWidth} = rowRef.current;
            const scrollAmount = clientWidth * 0.75;
            const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    }
    return(
        <>
        <section className="movie-section" aria-labelledby={`${title}-heading`}>
            <div className="section-heading">
                <div>
                    <p className="section-eyebrow">{eyebrow}</p>
                    <h2 id={`${title}-heading`}>{title}</h2>
                </div>
                <Link className="section-link" to={linkTo}>See All <span aria-hidden="true">→</span></Link>
            </div>

            {/* Wadah Slider + Tombol Kiri Kanan */}
            <div className="slider-wrapper">
                <button 
                    className="slider-button left" 
                    onClick={() => handleScroll("left")}
                    aria-label="Scroll left"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                
                <div className="movie-row landscape-row" ref={rowRef}>
                    {isLoading ? (
                        <p>Loading movies...</p>
                    ) : (
                        movies.map(movie => <LandscapeCard key={movie.id} movie={movie} progressPercent={30} timeLabel={movie.duration} />)
                    )}
                </div>

                <button 
                    className="slider-button right" 
                    onClick={() => handleScroll("right")}
                    aria-label="Scroll right"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>
        </>
    );
}