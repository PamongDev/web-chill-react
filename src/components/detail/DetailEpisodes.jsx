export default function DetailEpisodes({ 
    seasons, 
    activeSeason, 
    setActiveSeason, 
    fallbackImage, 
    synopsis 
}) {
    if (!seasons || seasons.length === 0) return null;

    const currentSeason = seasons[activeSeason];

    return (
        <section className="container series-episodes-section">
            <div className="season-header">
                <h2 className="section-subtitle">Episode</h2>
                
                {seasons.length > 1 && (
                    <select 
                        className="season-dropdown"
                        value={activeSeason} 
                        onChange={(e) => setActiveSeason(Number(e.target.value))}
                    >
                        {seasons.map((season, index) => (
                            <option key={index} value={index}>
                                Season {season.season_number}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="episodes-list">
                {currentSeason?.episodes?.map((eps) => {
                    const rawImage = eps.thumbnail || fallbackImage;
                    const thumbnailUrl = rawImage?.startsWith("http") 
                        ? rawImage 
                        : `/${rawImage}`;

                    return (
                        <div className="episode-card" key={eps.id}>
                            <h3 className="episode-number">{eps.episode_number}</h3>
                            <div className="episode-thumbnail">
                                <img src={thumbnailUrl} alt={eps.title} loading="lazy" />
                                <div className="episode-play-btn">▶</div>
                            </div>
                            <div className="episode-info">
                                <h4 className="episode-title">{eps.title}</h4>
                                <span className="episode-duration">{eps.duration}</span>
                                <p className="episode-desc">{eps.synopsis || synopsis}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}