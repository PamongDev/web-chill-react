export default function ProfileUserHeader({ userProfile }) {
    return (
        <div className="profile-user-header">
            <img
                src={userProfile.avatar}
                alt={`Avatar ${userProfile.name}`}
                className="profile-avatar-img"
            />

            <div className="profile-user-info">
                <p className="profile-label">ACCOUNT HOLDER</p>

                <div className="profile-user-name-row">
                    <h2 className="profile-user-name">{userProfile.name}</h2>

                    <span className="profile-badge">
                        <span aria-hidden="true">✦</span>
                        {userProfile.plan}
                    </span>
                </div>

                <p className="profile-user-email">{userProfile.email}</p>

                <p className="profile-user-joined">
                    Bergabung sejak {userProfile.joinedDate}
                </p>
            </div>
        </div>
    );
}