import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router"; // Pastikan path ini benar sesuai struktur foldermu

function App() {
  return (
    // Cukup panggil RouterProvider dan masukkan router-nya di sini
    <RouterProvider router={router} />
  );
}

export default App;