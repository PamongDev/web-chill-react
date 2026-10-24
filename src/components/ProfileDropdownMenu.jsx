import { Link, useNavigate } from "react-router-dom";

export default function ProfileDropdownMenu(){

    const dropdownMenus =[
        { title: "My Profile", path: "/profile" },
        { title: "Playlist", path: "/playlist" },
        { title: "Favorites", path: "/favorites" },
        { title: "Settings", path: "/settings" },
        { title: "Help Center", path: "/help" }
    ]

    return(
        <>
        <div className="profile-dropdown-divider"></div>
            {dropdownMenus.map((menu, index)=>(
                <Link
                    key={index}
                    to={menu.path}
                    className="profile-dropdown-item">
                    <span>{menu.title}</span>
                </Link>
            ))}
        <div className="profile-dropdown-divider"></div>
    </>
    );
}