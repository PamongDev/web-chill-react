export default function DetailVideoPlayer({ videoKey, title }) {
    if (!videoKey) return null;

    return (
        <section className="container detail-player-section">
            <h3 className="section-subtitle">Pemutar Video</h3>
            <div className="video-player-frame">
                <iframe 
                    src={`https://www.youtube.com/embed/${videoKey}`} 
                    title={title} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
}