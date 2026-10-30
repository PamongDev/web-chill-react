import Header from "../../components/header/Header";
import FooterHome from "../../components/layout/Footer";
import MovieCard from "../../components/common/MovieCard";
import MovieSection from "../../components/sections/MovieSection";
import HeroSection from "../../components/hero/HeroSection";
import FeaturedSection from "../../components/featured/FeaturedSection";
import { useSeriesPage } from "../../hooks/useSeriesPage";
import "../../styles/catalog.css";

export default function Series() {
    const {
        user,
        handleLogout,
        isLoading,
        onlySeries,
        heroSeries,
        genreCollections,
        displayedMovies,
        hasMore,
        handleLoadMore,
    } = useSeriesPage();

    if (!user) return null;
    if (isLoading) return <div className="loading-screen">Memuat Series...</div>;
    if (onlySeries.length === 0) return <div className="error-screen">Belum ada series tersedia.</div>;

    return (
        <div className="page-wrapper">
            <Header username={user.username} email={user.email} handleLogout={handleLogout} />

            <main className="catalog-page">
                {/* 1. Hero Banner Khusus Series */}
                <HeroSection topFiveMovies={heroSeries} />

                {/* 2. Section Koleksi Per Genre & Featured */}
                {genreCollections.map((collection, index) => {
                    if (collection.series.length < 3) return null;

                    const isFeatured = (index + 1) % 3 === 0;

                    if (isFeatured) {
                        return (
                            <FeaturedSection 
                                key={`featured-${index}`} 
                                movies={collection.series} 
                                titleEyebrow={`${collection.genreName} Highlights`} 
                            />
                        );
                    }

                    return (
                        <div 
                            className="page-content" 
                            key={`section-${index}`} 
                            style={{ 
                                marginTop: index === 0 ? "-2rem" : "0", 
                                position: "relative", 
                                zIndex: 10 
                            }}
                        >
                            <MovieSection 
                                eyebrow="" 
                                title={`${collection.genreName} Series`} 
                                linkTo={`/series/genre/${collection.genreName.toLowerCase()}`}
                                movies={collection.series} 
                                isLoading={isLoading} 
                            />
                        </div>
                    );
                })}

                {/* 3. Koleksi Semua Series (Grid + Load More) */}
                <div className="catalog-section" style={{ marginTop: "4rem" }}>
                    <div className="catalog-controls">
                        <h3 className="catalog-section-title">Koleksi Semua Series</h3>
                    </div>

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
                </div>
            </main>

            <FooterHome />
        </div>
    );
}