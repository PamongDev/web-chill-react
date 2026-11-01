import { useState, useEffect, useRef } from "react";


export const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const handleToggle = () => setIsOpen((prev) => !prev);

    useEffect(()=>{
        function handleOutsideClick(event){
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleOutsideClick);

        return ()=>{
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [])
    return { isOpen, handleToggle, menuRef };
}