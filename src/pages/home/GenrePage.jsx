import Header from "../../components/header/Header";
import FooterHome from "../../components/layout/Footer";
import MovieCard from "../../components/common/MovieCard";
import FeaturedSection from "../../components/featured/FeaturedSection";
import EmptyCatalogState from "../../components/catalog/EmptyCatalogState";
import { useGenrePage } from "../../hooks/useGenrePage";

export default function GenrePage({ defaultType = "all" }) {
    const {
        user,
        handleLogout,
        genreName,
        formattedGenreTitle,
        isLoading,
        displayedMovies,
        featuredMovies,
        totalCount,
        hasMore,
        handleLoadMore,
    } = useGenrePage(defaultType);

    if (!user) return null;
    if (isLoading) return <div className="loading-screen">Memuat {genreName}...</div>;

    return (
        <>
            <Header username={user.username} email={user.email} handleLogout={handleLogout} />

            {featuredMovies.length > 0 && (
                <FeaturedSection 
                    movies={featuredMovies} 
                    titleEyebrow={`${genreName} Highlights`} 
                    hero={true}
                />
            )}

            <main className="catalog-page">
                <div className="catalog-section">                    
                    <div className="catalog-controls">
                        <div>
                            <p className="eyebrow">EKSPLORASI KATEGORI</p>
                            <h2 className="catalog-section-title" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
                                {formattedGenreTitle} Collections{" "}
                                <span style={{ color: "#777", fontSize: "1.2rem", fontWeight: "normal" }}>
                                    ({totalCount})
                                </span>
                            </h2>
                        </div>
                    </div>

                    {totalCount === 0 ? (
                        <EmptyCatalogState genreName={genreName} />
                    ) : (
                        <>
                            <div className="movie-grid">
                                {displayedMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>

                            {hasMore && (
                                <div className="load-more-container">
                                    <button className="load-more-btn" onClick={handleLoadMore}>
                                        Muat Lebih Banyak
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <FooterHome />
        </>
    );
}