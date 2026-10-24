import ProfileDropdownHeader from "./ProfileDropdownHeader"
import ProfileDropdownMenu from "./ProfileDropdownMenu"

export default function ProfileDropdown({username, email, handleLogout}){
    return (
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
    )
} 