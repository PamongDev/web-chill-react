
import { Link, useNavigate } from "react-router-dom";
import "../../styles/NotFound.css";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="nf-page">
            <div className="nf-glow" />

            <Link to="/" className="nf-brand">
                <img
                    src="/assets/images/main/logo%20only%20no%20bg.png"
                    alt="Chill Movies"
                />
            </Link>

            <section className="nf-content">
                <p className="nf-eyebrow">
                    <span className="nf-dot" />
                    ERROR 404 — SCENE NOT FOUND
                </p>

                <div className="nf-number" aria-label="404">
                    <span>4</span>

                    <span className="nf-zero">
                        <svg viewBox="0 0 24 24" fill="none">
                            <polygon
                                points="9,5 20,12 9,19"
                                fill="currentColor"
                            />
                        </svg>
                    </span>

                    <span>4</span>
                </div>

                <h1>
                    Oops! Kamu tersesat
                    <br />
                    <span>di luar layar.</span>
                </h1>

                <p className="nf-description">
                    Sepertinya halaman yang kamu cari tidak ditemukan.
                    Mungkin sudah pindah, dihapus, atau ceritanya belum tayang.
                </p>

                <div className="nf-actions">
                    <Link to="/" className="nf-home-btn">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M3 10.5L12 3l9 7.5V21h-6v-6H9v6H3z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Kembali ke Beranda
                    </Link>

                    <button
                        className="nf-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Halaman Sebelumnya
                    </button>
                </div>

                <p className="nf-footer">
                    LOST IN THE PLOT? <span>LET'S GET YOU BACK.</span>
                </p>
            </section>

            <div className="nf-decoration" aria-hidden="true">
                CHILL MOVIES · THE SHOW MUST GO ON ·
            </div>
        </main>
    );
}
