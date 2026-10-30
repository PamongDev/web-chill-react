export default function SearchButton({onclick}){
    return(
        <>
        <button
            className="icon-button"
            type="button"
            aria-label="Search"
            title="Search"
            onClick={onclick}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
            >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.2 4.2" /> 
            </svg>
        </button>
        </>
    )
}