export default function ProfileDropdownHeader({ username, email }){
    return (
        <div className="profile-dropdown-header">
                <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=PamongDev&backgroundColor=1f1f1f"
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