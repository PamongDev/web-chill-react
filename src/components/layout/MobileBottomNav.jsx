import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "../../styles/mobile.css";
import GenreModal from "../genre/GenreModal";

export default function MobileBottomNav() {
    const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
    
    // Gunakan useLocation untuk mengecek URL aktif saat ini
    const location = useLocation();
    // Tombol Genre akan menyala jika URL saat ini mengandung kata "/genre"
    const isGenreActive = location.pathname.startsWith("/genre");

    return (
        <>
            <nav className="mobile-bottom-nav">
                <NavLink to="/movies" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                        <line x1="7" y1="2" x2="7" y2="22"></line>
                        <line x1="17" y1="2" x2="17" y2="22"></line>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <line x1="2" y1="7" x2="7" y2="7"></line>
                        <line x1="2" y1="17" x2="7" y2="17"></line>
                        <line x1="17" y1="17" x2="22" y2="17"></line>
                        <line x1="17" y1="7" x2="22" y2="7"></line>
                    </svg>
                    <span>Movies</span>
                </NavLink>

                <NavLink to="/series" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                        <polyline points="17 2 12 7 7 2"></polyline>
                    </svg>
                    <span>Series</span>
                </NavLink>

                {/* Tombol Home di Tengah (Floating) */}
                <NavLink to="/" className={({ isActive }) => `bottom-nav-item nav-home ${isActive ? "active" : ""}`}>
                    <div className="home-float-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <span>Home</span>
                </NavLink>

                {/* PERBAIKAN: Gunakan div atau button biasa untuk memicu Modal */}
                <div 
                    className={`bottom-nav-item ${isGenreActive ? "active" : ""}`} 
                    onClick={() => setIsGenreModalOpen(true)}
                    style={{ cursor: "pointer" }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>Genres</span>
                </div>

                <NavLink to="/profile" className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Profile</span>
                </NavLink>
            </nav>
            
            <GenreModal 
                isOpen={isGenreModalOpen} 
                onClose={() => setIsGenreModalOpen(false)} 
            />
        </>
    );
}