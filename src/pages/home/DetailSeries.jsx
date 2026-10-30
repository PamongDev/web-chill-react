import Header from "../../components/header/Header";
import FooterHome from "../../components/layout/Footer";
import MovieSection from "../../components/sections/MovieSection";

import DetailHeroBackdrop from "../../components/detail/DetailHeroBackdrop";
import DetailOverview from "../../components/detail/DetailOverview";
import DetailVideoPlayer from "../../components/detail/DetailVideoPlayer";
import DetailCast from "../../components/detail/DetailCast";
import DetailComments from "../../components/detail/DetailComments";
import DetailEpisodes from "../../components/detail/DetailEpisodes";

import { useSeriesDetail } from "../../hooks/useSeriesDetail";

import "../../styles/detail.css";
import "../../styles/home.css";

export default function DetailSeries() {
    const {
        user,
        handleLogout,
        seriesItem,
        similarSeries,
        isLoading,
        isAdded,
        activeSeason,
        setActiveSeason,
        toastMessage,
        toggleMyList,
        handleShare,
    } = useSeriesDetail();

    if (!user) return null;
    if (isLoading) return <div className="loading-screen">Loading details...</div>;
    if (!seriesItem) return <div className="error-screen">Film tidak ditemukan!</div>;

    return (
        <div className="detail-page-wrapper">
            <Header username={user.username} email={user.email} handleLogout={handleLogout} />

            <main className="detail-page">
                <DetailHeroBackdrop bg={seriesItem.bg} title={seriesItem.title} />
                <DetailOverview 
                    movie={seriesItem} 
                    isAdded={isAdded} 
                    onToggleMyList={toggleMyList} 
                    onShare={handleShare} 
                    toastMessage={toastMessage} 
                />
                <DetailVideoPlayer videoKey={seriesItem.key} title={seriesItem.title} />
                <DetailEpisodes 
                    seasons={seriesItem.seasons} 
                    activeSeason={activeSeason} 
                    setActiveSeason={setActiveSeason} 
                    fallbackImage={seriesItem.bg || seriesItem.thumbnail} 
                    synopsis={seriesItem.synopsis} 
                />
                <DetailCast director={seriesItem.director} cast={seriesItem.cast} />
                <section className="container detail-recommendations" style={{ marginTop: "2rem" }}>
                    <MovieSection eyebrow="SIMILAR TO THIS" title="Tontonan Serupa" movies={similarSeries} isLoading={isLoading} />
                </section>
                <DetailComments />
            </main>

            <FooterHome />
        </div>
    );
}