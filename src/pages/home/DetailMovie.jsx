import Header from "../../components/header/Header";
import FooterHome from "../../components/layout/Footer";
import MovieSection from "../../components/sections/MovieSection";
import DetailHeroBackdrop from "../../components/detail/DetailHeroBackdrop";
import DetailOverview from "../../components/detail/DetailOverview";
import DetailVideoPlayer from "../../components/detail/DetailVideoPlayer";
import DetailCast from "../../components/detail/DetailCast";
import DetailComments from "../../components/detail/DetailComments";

import { useMovieDetail } from "../../hooks/useMovieDetail";

import "../../styles/detail.css";
import "../../styles/home.css";

export default function DetailMovie() {
    const {
        user,
        handleLogout,
        movie,
        similarMovies,
        isLoading,
        isAdded,
        toastMessage,
        toggleMyList,
        handleShare,
    } = useMovieDetail();

    if (!user) return null;
    if (isLoading) return <div className="loading-screen">Loading details...</div>;
    if (!movie) return <div className="error-screen">Film tidak ditemukan!</div>;

    return (
        <div className="detail-page-wrapper">
            <Header username={user.username} email={user.email} handleLogout={handleLogout} />

            <main className="detail-page">
                <DetailHeroBackdrop bg={movie.bg} title={movie.title} />
                <DetailOverview 
                    movie={movie} 
                    isAdded={isAdded} 
                    onToggleMyList={toggleMyList} 
                    onShare={handleShare} 
                    toastMessage={toastMessage} 
                />
                <DetailVideoPlayer videoKey={movie.key} title={movie.title} />
                <section className="container detail-recommendations" style={{ marginTop: "2rem" }}>
                    <MovieSection eyebrow="SIMILAR TO THIS" title="Tontonan Serupa" movies={similarMovies} isLoading={isLoading} />
                </section>
                <DetailCast director={movie.director} cast={movie.cast} />
                <DetailComments />
            </main>

            <FooterHome />
        </div>
    );
}