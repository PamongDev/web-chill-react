import { Link } from "react-router-dom"
export default function HeaderNavbarMenus(){

    const navbarMenus = [
        {title: 'Home', path : '/'},
        {title: 'Movies', path : '/movies'},
        {title: 'Series', path : '/series'},
        {title: 'Genre', path : '/genres'},
        {title: 'Playlist', path : '/playlist'}
    ]

    return (
        <div className="desktop-nav">
            {navbarMenus.map((menu,index)=>(
                <Link
                    key={index}
                    to={menu.path}>
                    <span>{menu.title}</span>
                </Link>
            ))}
        </div>
    )
}