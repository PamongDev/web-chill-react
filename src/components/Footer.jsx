export default function FooterHome(){
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
                        <a href="#">Action</a>
                        <a href="#">Comedy</a>
                        <a href="#">Drama</a>
                        <a href="#">Horror</a>
                        <a href="#">Romance</a>
                        <a href="#">Sci-Fi</a>
                        <a href="#">Thriller</a>
                        <a href="#">Documentary</a>
                        <a href="#">Animation</a>
                        <a href="#">Fantasy</a>
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