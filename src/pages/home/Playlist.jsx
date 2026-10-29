import { useMyList } from "../../hooks/useMyList";
import { useAuth } from "../../hooks/useAuth"
import Header from "../../components/Header";
import FooterHome from "../../components/Footer";
import MovieCard from "../../components/MovieCard";
import FeaturedSection from "../../components/FeaturedSection";

export default function Playlist() {
    // Ambil data film tersimpan dari Context (yang nyambung ke localStorage)
    const { myList } = useMyList();
    const { user, handleLogout } = useAuth()

    if(!user) return null;

    return (
        <>
            <Header username={user.username} email={user.username} handleLogout={handleLogout}/>
            <FeaturedSection movies={myList.slice(0,4)} titleEyebrow="Your Playlist Make Your day"/>
        <div className="page-wrapper">

            <main className="catalog-page" style={{ paddingTop: "2rem" }}>
                <div className="catalog-section">
                    
                    {/* --- HEADER HALAMAN --- */}
                    <div className="catalog-controls">
                        <div>
                            <p className="eyebrow" style={{ color: "#aaa", letterSpacing: "2px", fontSize: "0.9rem" }}>
                                KOLEKSI PRIBADI
                            </p>
                            <h2 className="catalog-section-title" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
                                My Playlist <span style={{ color: "#777", fontSize: "1.2rem", fontWeight: "normal" }}>({myList.length})</span>
                            </h2>
                        </div>
                    </div>

                    {/* --- KONDISI KOSONG VS ADA ISI --- */}
                    {myList.length === 0 ? (
                        <div className="empty-state" style={{ textAlign: "center", marginTop: "10vh", paddingBottom: "20vh" }}>
                            <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#555" strokeWidth="1" style={{ marginBottom: "1rem" }}>
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="3" x2="9" y2="21"></line>
                            </svg>
                            <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Daftarmu masih kosong</h3>
                            <p style={{ color: "#888" }}>Simpan film dan series favoritmu agar lebih mudah ditonton nanti.</p>
                        </div>
                    ) : (
                        <div className="movie-grid">
                            {/* Looping semua film yang ada di dalam state myList */}
                            {myList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                    
                </div>
            </main>

            <FooterHome />
        </div>
        </>
    );
}