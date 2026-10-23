import { useState, useEffect, useRef } from "react";


export default function useDropdown(){
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const handletoogle = () => setIsOpen((prev) => !prev);

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
    return { isOpen, handletoogle, menuRef };
}