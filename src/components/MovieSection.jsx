import { useRef } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MovieSection({ eyebrow, title, linkTo, movies, isLoading }){

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
                    ❮
                </button>
                
                <div className="movie-row" ref={rowRef}>
                    {isLoading ? (
                        <p>Loading movies...</p>
                    ) : (
                        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
                    )}
                </div>

                <button 
                    className="slider-button right" 
                    onClick={() => handleScroll("right")}
                    aria-label="Scroll right"
                >
                    ❯
                </button>
            </div>
        </section>
        </>
    );
}