export default function DetailComments() {
    return (
        <section className="container detail-comments-section" style={{ marginTop: "1rem" }}>
            <h3 className="section-subtitle">Komentar Pilihan</h3>
            <div className="comment-list">
                <div className="comment-item">
                    <div className="comment-avatar">M</div>
                    <div className="comment-body">
                        <strong>Muhamad Fahmi</strong>
                        <p>Animasi pertarungannya gila banget! Studio Pierrot all out di film ini. Wajib nonton buat fans anime action 🔥</p>
                    </div>
                </div>
                <div className="comment-item">
                    <div className="comment-avatar">A</div>
                    <div className="comment-body">
                        <strong>Asep Setiawan</strong>
                        <p>Jalan ceritanya lumayan klise, tapi terbayar lunas sama visual efeknya yang super mewah.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}