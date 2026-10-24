import { useNavigate } from "react-router-dom";
import useDropdown from "../hooks/useDropdown";
import ProfileDropdown from "./ProfileDropdown";
import "../styles/components.css";
import HeaderNavbarMenus from "./HeaderNavbarMenus";
export default function Header({ username, email }) {
    const navigate = useNavigate();
    const { isOpen, handletoogle, menuRef } = useDropdown();

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        navigate("/sign-in");
    }
    return (
        <header className="site-header">
            <div className="container navbar-wrap">
                <nav className="navbar" aria-label="Main navigation">
                    <a className="brand" href="#" aria-label="Chill home">
                        <img src="assets/images/main/logo only no bg.png" alt="Chill"/>
                    </a>

                    <HeaderNavbarMenus></HeaderNavbarMenus>

                    <div className="nav-actions">

                        <button className="icon-button" type="button" aria-label="Search">
                            <span aria-hidden="true">⌕</span>
                        </button>

                        <div className={`profile-menu ${isOpen ? "is-open" : ""}`} ref={menuRef}>
                            <ProfileDropdown username={username} email={email} 
                            handleLogout={handleLogout}
                            isOpen={isOpen}
                            handletoogle={handletoogle}>
                            </ProfileDropdown>
                        </div>

                    </div>
                </nav>
            </div>
        </header>
    )
}