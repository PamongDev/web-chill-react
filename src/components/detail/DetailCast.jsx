export default function DetailCast({ director, cast }) {
    if (!director && (!cast || cast.length === 0)) return null;

    return (
        <section className="container detail-cast-section" style={{ marginTop: "6rem" }}>
            <h3 className="section-subtitle">Sutradara & Pemeran</h3>
            <div className="cast-grid">
                {/* Sutradara */}
                {director && (
                    <div className="cast-card">
                        <div className="avatar-anon">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-user">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <span className="actor-name">{director}</span>
                        <span className="character-name">Sutradara</span>
                    </div>
                )}

                {/* Pemeran */}
                {cast?.map((actor, index) => (
                    <div className="cast-card" key={index}>
                        <div className="avatar-anon">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-user">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <span className="actor-name">{actor.name}</span>
                        <span className="character-name">{actor.character}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}