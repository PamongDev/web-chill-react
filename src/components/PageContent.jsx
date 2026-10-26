import MovieSection from "./MovieSection"
import FeaturedSection from "../components/FeaturedSection";
export default function PageContent({movies, series, isLoading}){
    const continueWatching = movies.slice(0, 15);
    const topMovies = movies.slice(1, 16);
    const trending = movies.slice(2, 17);
    const newReleases = movies.slice(-15);
    const topSeries = series;
    return (
        <>
            <div className="page-content">
                <MovieSection 
                    eyebrow="KEEP WATCHING" 
                    title="Continue Watching" 
                    linkTo="/movies" 
                    movies={continueWatching} 
                    isLoading={isLoading} 
                />
            </div>


            <FeaturedSection movies={movies} />


            <div className="page-content">
                <MovieSection 
                    eyebrow="POPULAR RIGHT NOW" 
                    title="Top Movies & Series" 
                    linkTo="/movies" 
                    movies={topMovies} 
                    isLoading={isLoading} 
                />
                
                <MovieSection 
                    eyebrow="WHAT PEOPLE ARE WATCHING" 
                    title="Trending Now" 
                    linkTo="/movies" 
                    movies={trending} 
                    isLoading={isLoading} 
                />

                <MovieSection 
                    eyebrow="JUST ADDED" 
                    title="New Releases" 
                    linkTo="/movies" 
                    movies={newReleases} 
                    isLoading={isLoading} 
                />

                <MovieSection 
                    eyebrow="BINGE WORTHY" 
                    title="Top Series" 
                    linkTo="/series" 
                    movies={topSeries} 
                    isLoading={isLoading} 
                />
            </div>
        </>
    )
} 