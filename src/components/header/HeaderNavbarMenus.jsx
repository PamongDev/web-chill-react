import { Link } from "react-router-dom"
import GenreModal from "../genre/GenreModal"
import { useState } from "react";
export default function HeaderNavbarMenus(){
    const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

    const navbarMenus = [
        {title: 'Home', path : '/'},
        {title: 'Movies', path : '/movies'},
        {title: 'Series', path : '/series'},
        {title: 'Playlist', path : '/playlist'}
    ]

    return (
        <>
        <div className="desktop-nav">
            {navbarMenus.map((menu,index)=>(
                <Link
                    key={index}
                    to={menu.path}>
                    <span>{menu.title}</span>
                </Link>
            ))}
            <a onClick={() => setIsGenreModalOpen(true)}>
                    Genre
            </a>
            
        </div>
        <GenreModal 
                isOpen={isGenreModalOpen} 
                onClose={() => setIsGenreModalOpen(false)} 
            />
        </>
    )
}