import MovieSection from "./MovieSection";
import GenreSection from "../genre/GenreSection";
import FeaturedSection from "../featured/FeaturedSection";
import ContinueWatching from "./ContinueWatching";
import { usePageContentData } from "../../hooks/usePageContentData";

export default function PageContent({ movies, series, isLoading }) {
    const { 
        watchHistory, // Ambil state history
        continueWatching, 
        topMovies, 
        trending, 
        newReleases, 
        genres 
    } = usePageContentData(movies, series);

    return (
        <>
            <div className="page-content">

                {watchHistory && watchHistory.length > 0 && (
                    <ContinueWatching 
                        eyebrow="KEEP WATCHING" 
                        title="Continue Watching" 
                        // LinkTo bisa kamu arahkan ke "/history" jika nanti ada halamannya
                        linkTo="/h/" 
                        movies={watchHistory} 
                        isLoading={isLoading} 
                    />
                )}
                
                <MovieSection 
                    eyebrow="TRENDING NOW" 
                    title="Chill Watching" 
                    linkTo="/movies" 
                    movies={continueWatching} 
                    isLoading={isLoading} 
                />
            </div>

            <FeaturedSection movies={movies} mt={0} />

            <div className="page-content">
                <MovieSection 
                    eyebrow="POPULAR RIGHT NOW" 
                    title="Popular Movies & Series" 
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
            </div>

            <GenreSection movies={movies} genres={genres} />

            <div className="page-content"> 
                <MovieSection 
                    eyebrow="JUST ADDED" 
                    title="New Releases" 
                    linkTo="/movies" 
                    movies={newReleases} 
                    isLoading={isLoading} 
                />
            </div>

            <FeaturedSection movies={series} />

            <div className="page-content">    
                <MovieSection 
                    eyebrow="BINGE WORTHY" 
                    title="Top Series" 
                    linkTo="/series" 
                    movies={series} 
                    isLoading={isLoading} 
                />
            </div>
        </>
    );
}