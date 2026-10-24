export default function ProfileDropdownHeader({ username, email }){
    return (
        <div className="profile-dropdown-header">
                <img
                    src="assets/images/main/logo app.png"
                    alt={username}
                    className="profile-dropdown-avatar"
                />

                <div className="profile-user-info">
                    <span className="profile-name">{username}</span>
                    <span className="profile-email">{email}</span>
                </div>
            </div>
    )
}