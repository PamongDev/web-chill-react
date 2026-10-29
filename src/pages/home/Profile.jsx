import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Header from "../../components/Header";
import FooterHome from "../../components/Footer";
import "../../styles/ProfilePage.css"

export default function Profile() {
    const {user, handleLogout} = useAuth();

    const userProfile = {
        name: "PamongDev",
        email: "pamongdev@chill.id",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PamongDev&backgroundColor=1f1f1f",
        plan: "Premium VIP",
        validUntil: "31 Desember 2026",
        quality: "Ultra HD (4K) + HDR",
        devices: "2 / 4 Perangkat Aktif",
        joinedDate: "Januari 2026"
    };
    if(!user)return null;
    return (
        <div className="page-wrapper">
            <Header username={user.username} email={user.email} handleLogout={handleLogout}/>

            <main className="catalog-page profile-main">
                <div className="container profile-container">
                    
                    <div className="profile-header-meta">
                        <p className="profile-eyebrow">AKUN AKSI</p>
                        <h1 className="profile-title">Profil Saya</h1>
                    </div>

                    <div className="profile-card">
                        
                        {/* HEADER USER */}
                        <div className="profile-user-header">
                            <img 
                                src={userProfile.avatar} 
                                alt={userProfile.name} 
                                className="profile-avatar-img"
                            />
                            <div>
                                <div className="profile-user-name-row">
                                    <h2 className="profile-user-name">{userProfile.name}</h2>
                                    <span className="profile-badge">{userProfile.plan}</span>
                                </div>
                                <p className="profile-user-email">{userProfile.email}</p>
                                <p className="profile-user-joined">Anggota sejak {userProfile.joinedDate}</p>
                            </div>
                        </div>

                        {/* DETAIL STATS */}
                        <div className="profile-details-section">
                            <h3 className="profile-section-title">Detail Keanggotaan</h3>
                            
                            <div className="profile-stats-grid">
                                <div className="profile-stat-card">
                                    <p className="profile-stat-label">Masa Aktif Paket</p>
                                    <p className="profile-stat-value">{userProfile.validUntil}</p>
                                </div>

                                <div className="profile-stat-card">
                                    <p className="profile-stat-label">Kualitas Streaming</p>
                                    <p className="profile-stat-value">{userProfile.quality}</p>
                                </div>

                                <div className="profile-stat-card">
                                    <p className="profile-stat-label">Batas Layar Aktif</p>
                                    <p className="profile-stat-value">{userProfile.devices}</p>
                                </div>
                            </div>
                        </div>

                        {/* NAVIGASI */}
                        <div className="profile-actions">
                            <Link to="/playlist" className="profile-btn-primary">
                                My Playlist &rarr;
                            </Link>

                            <Link to="/" className="profile-btn-secondary">
                                Back to Home
                            </Link>
                        </div>

                    </div>

                </div>
            </main>

            <FooterHome />
        </div>
    );
}