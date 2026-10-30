import { useMemo } from "react";
import { useMovies } from "../../hooks/useMovies";
import GenreBadge from "../genre/GenreBadge"

export default function FooterHome(){
    const { movies } = useMovies();

    // Ekstrak semua genre dari seluruh data film
    const footerGenres = useMemo(() => {
        if (!movies) return [];
        
        // 1. Ambil semua genre unik
        const allUniqueGenres = [...new Set(movies.flatMap(m => m.genres || []))].sort();
        
        // 2. Batasi hanya 8 genre pertama agar desain footer tetap rapi
        return allUniqueGenres; 
    }, [movies]);
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <img src="/assets/images/main/logo only no bg.png" alt="Chill"/>
                    <p>© 2026 Chill. All rights reserved.</p>
                    <p className="footer-muted">Your place to relax, discover, and watch.</p>
                </div>

                <div className="footer-column">
                    <h3>Genres</h3>
                    <div className="footer-links-grid">
                        {footerGenres.map(genre => (
                            // Panggil GenreBadge dengan type "all" (otomatis ke /genre/...)
                            <GenreBadge key={genre} genre={genre} type="all" />
                        ))}
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Need Help?</h3>
                    <div className="footer-links-list">
                        <a href="#">Contact Us</a>
                        <a href="#">FAQ</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}