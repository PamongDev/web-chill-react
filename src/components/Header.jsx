import useDropdown from "../hooks/useDropdown";
import ProfileDropdown from "./ProfileDropdown";
import "../styles/components.css";
import HeaderNavbarMenus from "./HeaderNavbarMenus";
import useScroll from "../hooks/useScroll";
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";
import { useState } from "react";


export default function Header({ username, email, handleLogout }) {
    const { isOpen, handletoogle, menuRef } = useDropdown();
    const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    
    // logic header
    const isScrolled = useScroll(10);    
    
    return (
        <>
        <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
            <div className="container navbar-wrap">
                <nav className="navbar" aria-label="Main navigation">
                    <Link to="/" className="brand" aria-label="Chill home">
                        <img src="/assets/images/main/logo only no bg.png" alt="Chill"/>
                    </Link>

                    <HeaderNavbarMenus></HeaderNavbarMenus>

                    <div className="nav-actions">

                        <button className="icon-button" type="button" aria-label="Search" onClick={() => setIsSearchOpen(true)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
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
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        
        </>
    )
}