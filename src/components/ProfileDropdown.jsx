import ProfileDropdownHeader from "./ProfileDropdownHeader"
import ProfileDropdownMenu from "./ProfileDropdownMenu"

export default function ProfileDropdown({username, email, handleLogout, handletoogle, isOpen}){
    return (
        <>
            <button
                className="profile-trigger"
                type="button"
                onClick={handletoogle}
                aria-label="Open profile menu"
                aria-expanded={isOpen}
            >
                <img
                    src="assets/images/main/logo app.png"
                    alt="Fahmi"
                    className="profile-avatar"
                />

                <svg
                    className="profile-chevron"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M6 9L12 15L18 9"></path>
                </svg>
            </button>
            <div className="profile-dropdown">
                <ProfileDropdownHeader username={username} email={email}></ProfileDropdownHeader>
                <ProfileDropdownMenu />
                <button
                    className="profile-dropdown-item profile-logout"
                    type="button" onClick={handleLogout}
                >
                    <span>Logout</span>
                </button>

            </div>
        </>
    )
} 