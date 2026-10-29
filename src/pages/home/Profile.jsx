import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Header from "../../components/Header";
import FooterHome from "../../components/Footer";
import "../../styles/ProfilePage.css";

export default function Profile() {
    const { user, handleLogout } = useAuth();

    if (!user) return null;

    const displayName = user.username || "PamongDev";

    const userProfile = {
        name: displayName,
        email: user.email || "pamongdev@chill.id",
        avatar:
            user.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                displayName
            )}&backgroundColor=1f1f1f`,
        plan: "Premium VIP",
        validUntil: "31 Desember 2026",
        quality: "Ultra HD (4K) + HDR",
        devices: "2 dari 4 perangkat",
        joinedDate: "Januari 2026",
    };

    return (
        <div className="page-wrapper profile-page">
            <Header
                username={user.username}
                email={user.email}
                handleLogout={handleLogout}
            />

            <main className="profile-main">
                <div className="container profile-container">

                    {/* PAGE HEADING */}
                    <div className="profile-heading">
                        <div>
                            <p className="profile-eyebrow">
                                <span className="profile-eyebrow-dot"></span>
                                MEMBER AREA
                            </p>

                            <h1 className="profile-title">
                                Profil <span>Saya.</span>
                            </h1>

                            <p className="profile-subtitle">
                                Ruang personal untuk pengalaman menontonmu.
                            </p>
                        </div>

                        <span className="profile-page-index">
                            CHILL / 01
                        </span>
                    </div>

                    {/* PROFILE CARD */}
                    <section className="profile-card">

                        {/* USER IDENTITY */}
                        <div className="profile-user-header">
                            <img
                                src={userProfile.avatar}
                                alt={`Avatar ${userProfile.name}`}
                                className="profile-avatar-img"
                            />

                            <div className="profile-user-info">
                                <p className="profile-label">
                                    ACCOUNT HOLDER
                                </p>

                                <div className="profile-user-name-row">
                                    <h2 className="profile-user-name">
                                        {userProfile.name}
                                    </h2>

                                    <span className="profile-badge">
                                        <span aria-hidden="true">✦</span>
                                        {userProfile.plan}
                                    </span>
                                </div>

                                <p className="profile-user-email">
                                    {userProfile.email}
                                </p>

                                <p className="profile-user-joined">
                                    Bergabung sejak {userProfile.joinedDate}
                                </p>
                            </div>
                        </div>

                        {/* MEMBERSHIP */}
                        <div className="profile-membership">
                            <div className="profile-membership-heading">
                                <span className="profile-section-index">
                                    01
                                </span>

                                <h3>Detail Keanggotaan</h3>
                            </div>

                            <div className="profile-stats-grid">
                                <div className="profile-stat-card">
                                    <p className="profile-stat-label">
                                        MASA AKTIF PAKET
                                    </p>

                                    <p className="profile-stat-value">
                                        {userProfile.validUntil}
                                    </p>

                                    <span className="profile-stat-caption">
                                        Tanggal berakhir
                                    </span>
                                </div>

                                <div className="profile-stat-card">
                                    <p className="profile-stat-label">
                                        KUALITAS STREAMING
                                    </p>

                                    <p className="profile-stat-value">
                                        {userProfile.quality}
                                    </p>

                                    <span className="profile-stat-caption">
                                        Kualitas maksimum
                                    </span>
                                </div>

                                <div className="profile-stat-card">
                                    <p className="profile-stat-label">
                                        PERANGKAT AKTIF
                                    </p>

                                    <p className="profile-stat-value">
                                        {userProfile.devices}
                                    </p>

                                    <span className="profile-stat-caption">
                                        Batas perangkat akun
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* NAVIGATION */}
                        <div className="profile-actions">
                            <Link
                                to="/playlist"
                                className="profile-btn-primary"
                            >
                                <span>Jelajahi Playlist</span>
                                <span className="profile-btn-arrow">
                                    ↗
                                </span>
                            </Link>

                            <Link
                                to="/"
                                className="profile-btn-secondary"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>

                        <div className="profile-card-footer">
                            <span>YOUR SPACE. YOUR STORIES.</span>
                            <span>CHILL MOVIES © 2026</span>
                        </div>
                    </section>

                </div>
            </main>

            <FooterHome />
        </div>
    );
}