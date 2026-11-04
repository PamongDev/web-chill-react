import { useAuth } from "../../hooks/useAuth";
import { useUserData } from "../../hooks/useUserData";

import Header from "../../components/header/Header";
import FooterHome from "../../components/layout/Footer";
// Asumsi kamu punya komponen Card untuk Continue Watching
import LandscapeCard from "../../components/common/LandscapeCard"; 

import "../../styles/landscapeCard.css"; // Sesuaikan dengan path CSS-mu
export default function HistoryPage() {
    const { user, handleLogout } = useAuth();
    const { watchHistory, removeFromHistory } = useUserData();

    return (
        <div className="page-wrapper">
            <Header username={user?.username} email={user?.email} handleLogout={handleLogout} />

            <main className="container" style={{ minHeight: "70vh", paddingTop: "120px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h1>Riwayat Tontonan</h1>
                    <span style={{ color: "gray" }}>{watchHistory.length} Judul</span>
                </div>

                {watchHistory.length === 0 ? (
                    <div className="empty-state" style={{ textAlign: "center", marginTop: "10vh" }}>
                        <svg viewBox="0 0 24 24" width="64" fill="gray" style={{ marginBottom: "1rem" }}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.64-2.25 1.64-1.74 0-2.26-.95-2.32-1.81h-1.7c.07 1.78 1.12 3.03 2.87 3.45V20h2.34v-1.66c1.63-.27 3.08-1.21 3.08-2.93 0-2.02-1.7-2.65-3.89-3.27z"/>
                        </svg>
                        <h3>Belum ada riwayat tontonan</h3>
                        <p style={{ color: "gray" }}>Film yang kamu tonton akan muncul di sini.</p>
                    </div>
                ) : (
                    <div className="history-grid" style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                        gap: "20px" 
                    }}>
                        {watchHistory.map((movie) => (
                            <div key={movie.id} className="history-card-wrapper" style={{ position: "relative" }}>
                                {/* Tombol Hapus Riwayat (Silang) di pojok kanan atas */}
                                <button 
                                    className="remove-history-btn"
                                    onClick={() => removeFromHistory(movie.id)}
                                    title="Hapus dari riwayat"
                                >
                                    <svg viewBox="0 0 24 24" width="16" fill="currentColor">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    </svg>
                                </button>
                                
                                {/* 
                                    Render Card-mu di sini. 
                                    Pastikan LandscapeCard menerima props movie agar progress barnya muncul!
                                */}
                                <LandscapeCard movie={movie} progressPercent={movie.progress} timeLabel={movie.duration} />
                                
                                {/* Fallback sementara jika belum ada komponen Card: */}
                                {/* <div style={{ border: "1px solid #333", borderRadius: "8px", overflow: "hidden" }}>
                                    <img src={movie.image || `/${movie.poster}`} alt={movie.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
                                    <div style={{ padding: "10px" }}>
                                        <h4>{movie.title}</h4>
                                        <div style={{ width: "100%", background: "#444", height: "4px", marginTop: "10px" }}>
                                            <div style={{ width: `${movie.progressPercent || 0}%`, background: "#E50914", height: "100%" }}></div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        ))}
                    </div>
                )}
            </main>

            <FooterHome />
        </div>
    );
}