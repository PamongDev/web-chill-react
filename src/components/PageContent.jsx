import MovieSection from "./MovieSection"
import GenreSection from "./GenreSection";
import FeaturedSection from "./FeaturedSection";
import ContinueWatching from "./ContinueWatching";
import { useMyList } from "../hooks/useMyList";
export default function PageContent({movies, series, isLoading}){
    const continueWatching = movies.slice(0, 15);
    const usedIds = new Set();
    const topMovies = movies.slice(1, 16);
    const trending = movies.slice(2, 17);
    const newReleases = movies.slice(-15);
    const topSeries = series;
    const { myList } = useMyList();
    const genres = [...new Set(
        movies.flatMap((movie) => movie.genres || [])
    )]
        .map((name) => ({
            name,
            movies: movies.filter((movie) =>
                movie.genres?.includes(name)
            ),
        }))
        // Prioritaskan genre yang pilihan filmnya paling sedikit.
        .sort((a, b) => a.movies.length - b.movies.length)
        .map(({ name, movies: list }) => {
            const movie = list.find(
                (movie) => !usedIds.has(movie.id ?? movie.title)
            );

            if (!movie) return null;

            usedIds.add(movie.id ?? movie.title);

            return { name, movie };
        })
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));
    return (
        <>
            <div className="page-content">
                <ContinueWatching 
                    eyebrow="KEEP WATCHING" 
                    title="Continue Watching" 
                    linkTo="/playlist" 
                    movies={myList} 
                    isLoading={isLoading} 
                />
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
            </div>

            <GenreSection movies={movies} genres={genres}/>


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
                        movies={topSeries} 
                        isLoading={isLoading} 
                    />
            </div>



        </>
    )
} 