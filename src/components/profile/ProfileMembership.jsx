export default function ProfileMembership({ userProfile }) {
    return (
        <div className="profile-membership">
            <div className="profile-membership-heading">
                <span className="profile-section-index">01</span>
                <h3>Detail Keanggotaan</h3>
            </div>

            <div className="profile-stats-grid">
                <div className="profile-stat-card">
                    <p className="profile-stat-label">MASA AKTIF PAKET</p>
                    <p className="profile-stat-value">{userProfile.validUntil}</p>
                    <span className="profile-stat-caption">Tanggal berakhir</span>
                </div>

                <div className="profile-stat-card">
                    <p className="profile-stat-label">KUALITAS STREAMING</p>
                    <p className="profile-stat-value">{userProfile.quality}</p>
                    <span className="profile-stat-caption">Kualitas maksimum</span>
                </div>

                <div className="profile-stat-card">
                    <p className="profile-stat-label">PERANGKAT AKTIF</p>
                    <p className="profile-stat-value">{userProfile.devices}</p>
                    <span className="profile-stat-caption">Batas perangkat akun</span>
                </div>
            </div>
        </div>
    );
}