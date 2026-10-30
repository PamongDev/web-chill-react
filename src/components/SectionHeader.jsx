import { Link } from "react-router-dom";

export default function SectionHeader({ eyebrow, title, linkTo, titleId }) {
    return (
        <div className="section-heading">
            <div>
                {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
                <h2 id={titleId}>{title}</h2>
            </div>
            {linkTo && (
                <Link className="section-link" to={linkTo}>
                    See All <span aria-hidden="true">→</span>
                </Link>
            )}
        </div>
    );
}