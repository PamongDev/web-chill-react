export default function EmptyCatalogState({ genreName }) {
    return (
        <div className="empty-state">
            <h3>Wah, kosong nih!</h3>
            <p>
                Belum ada koleksi film atau series untuk genre <span>{genreName}</span>.
            </p>
        </div>
    );
}