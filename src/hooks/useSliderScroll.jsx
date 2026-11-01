import { useRef } from "react";

export const useSliderScroll = (scrollRatio = 0.75) => {
    const rowRef = useRef(null);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = clientWidth * scrollRatio;
            const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return { rowRef, handleScroll };
}