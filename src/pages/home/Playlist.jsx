import Header from "../../components/header/Header";
import FooterHome from "../../components/layout/Footer";
import MovieCard from "../../components/common/MovieCard";
import FeaturedSection from "../../components/featured/FeaturedSection";
import EmptyPlaylistState from "../../components/playlist/EmptyPlaylistState";
import { usePlaylistPage } from "../../hooks/usePlaylistPage";

export default function Playlist() {
    const {
        user,
        handleLogout,
        myList,
        featuredMovies,
        isEmpty,
    } = usePlaylistPage();

    if (!user) return null;

    return (
        <div className="page-wrapper">
            <Header username={user.username} email={user.email} handleLogout={handleLogout} />

            {!isEmpty && (
                <FeaturedSection 
                    movies={featuredMovies} 
                    titleEyebrow="Your Playlist Makes Your Day" 
                    hero={true} 
                />
            )}

            <main className="catalog-page" style={{ paddingTop: isEmpty ? "8rem" : "2rem" }}>
                <div className="catalog-section">

                    <div className="catalog-controls">
                        <div>
                            <p className="eyebrow" style={{ color: "#aaa", letterSpacing: "2px", fontSize: "0.9rem" }}>
                                KOLEKSI PRIBADI
                            </p>
                            <h2 className="catalog-section-title" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
                                My Playlist{" "}
                                <span style={{ color: "#777", fontSize: "1.2rem", fontWeight: "normal" }}>
                                    ({myList.length})
                                </span>
                            </h2>
                        </div>
                    </div>

                    {isEmpty ? (
                        <EmptyPlaylistState />
                    ) : (
                        <div className="movie-grid">
                            {myList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <FooterHome />
        </div>
    );
}