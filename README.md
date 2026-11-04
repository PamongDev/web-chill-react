# 🎬 Chill Streaming Platform — Dokumentasi Teknis

Dokumentasi ini menjelaskan arsitektur, struktur antarmuka, alur logika, serta konfigurasi teknis aplikasi **Chill Streaming Platform**. Proyek ini dibangun menggunakan arsitektur modular dengan pendekatan *Single Page Application* (SPA) menggunakan React.

---

## 🧭 1. Peta Navigasi & Proteksi Akses (Routing)

Aplikasi menggunakan **React Router DOM v6** dengan mekanisme *Route Guard* (`<Navigate />` dan `<Outlet />`) untuk mengatur akses pengguna berdasarkan status autentikasi. Routing dibagi menjadi dua area utama:

### 🔓 Public Routes

Rute ini hanya dapat diakses oleh pengguna yang **belum login** atau tidak memiliki sesi `userLoggedIn` di `localStorage`.

Jika pengguna yang sudah login mencoba mengakses rute ini, sistem akan otomatis mengarahkannya ke halaman Beranda (`/`).

| Path URL | Komponen Utama | Deskripsi |
| --- | --- | --- |
| `/sign-in` | `<Login />` | Halaman login dengan validasi sesi pengguna. |
| `/register` | `<Register />` | Halaman pendaftaran akun baru dengan validasi kata sandi. |
| `/forgot-password` | `<ForgotPassword />` | Halaman pemulihan kata sandi dalam mode statis. |

### 🔐 Protected Routes (Private)

Rute ini hanya dapat diakses oleh pengguna yang sudah login dan memiliki sesi valid.

Jika pengguna tanpa sesi mencoba mengaksesnya, sistem akan otomatis mengarahkannya ke `/sign-in`.

| Path URL | Komponen Utama | Kategori | Deskripsi |
| --- | --- | --- | --- |
| `/` | `<Home />` | **Katalog** | Beranda utama yang menampilkan berbagai konten film dan serial. |
| `/movies` | `<Movies />` | **Katalog** | Etalase khusus film layar lebar. |
| `/series` | `<Series />` | **Katalog** | Etalase khusus serial televisi. |
| `/movies/genre/:genreName` | `<GenrePage defaultType="movie" />` | **Katalog** | Menampilkan film berdasarkan genre tertentu. |
| `/series/genre/:genreName` | `<GenrePage defaultType="series" />` | **Katalog** | Menampilkan serial berdasarkan genre tertentu. |
| `/a/genre/:genreName` | `<GenrePage defaultType="all" />` | **Katalog** | Menampilkan gabungan film dan serial berdasarkan genre. |
| `/movies/detail/:id` | `<DetailMovie />` | **Detail** | Menampilkan informasi lengkap sebuah film. |
| `/series/detail/:id` | `<DetailSeries />` | **Detail** | Menampilkan informasi lengkap sebuah serial. |
| `/playlist` | `<Playlist />` | **Personal** | Menampilkan daftar tontonan yang disimpan pengguna. |
| `/h` | `<History />` | **Personal** | Menampilkan riwayat tontonan pengguna. |
| `/profile` | `<Profile />` | **Personal** | Menampilkan informasi akun dan paket langganan. |
| `*` | `<NotFound />` | **Error** | Halaman fallback ketika rute tidak ditemukan. |

---

## 👤 2. Modul Autentikasi (Authentication)

Sistem autentikasi berjalan secara *client-side* menggunakan data statis (`public/data/users.json`) dan `localStorage` sebagai media penyimpanan sesi pengguna.

### 🔑 Login (`/sign-in`)

- **Struktur UI:** Dibagi menjadi dua komponen utama, yaitu `LoginWelcome` untuk tampilan grafis dan branding, serta `LoginForm` untuk input data pengguna. Pesan error dan success ditampilkan secara dinamis di bagian atas form.
- **Hooks Aktif:** `useState`, `useNavigate`, dan `useLogin`.
- **Alur Validasi (`handleSubmit`):**
  1. Memastikan seluruh input wajib terisi, yaitu `username` dan `password`.
  2. Melakukan *fetching* secara asinkron (`async/await`) terhadap data `users.json`.
  3. Mencari kecocokan `username` menggunakan fungsi `.find()`.
  4. Jika username ditemukan, sistem akan mencocokkan password.
  5. Jika proses validasi berhasil, informasi pengguna seperti nama dan email disimpan ke `localStorage` dengan key `userLoggedIn`.
  6. Pengguna kemudian diarahkan ke halaman Beranda menggunakan `navigate('/')`.

Untuk mencoba fitur login, gunakan akun simulasi berikut:

| Field | Value |
| --- | --- |
| Username | `fahmi` |
| Password | `123` |

### 📝 Register (`/register`)

- **Struktur UI:** Memanfaatkan komponen `RegisterWelcome` dan `RegisterForm` yang terdiri dari empat kolom input: *Username, Email, Password,* dan *Confirm Password*.
- **Hooks Aktif:** `useState`, `useNavigate`, dan `useRegister`.
- **Alur Validasi:**
  1. Memastikan seluruh input wajib terisi.
  2. Memastikan nilai `password` dan `confirmPassword` sama melalui validasi *real-time* pada UI dan validasi saat form disubmit.
  3. Memeriksa ketersediaan username menggunakan fungsi `.some()` terhadap data `users.json`.
  4. Jika pendaftaran berhasil, sistem menampilkan pesan sukses dan mengarahkan pengguna ke `/sign-in`.

> Catatan: Proses registrasi masih berjalan dalam mode simulasi karena belum terhubung dengan backend.

### ❓ Forgot Password (`/forgot-password`)

Halaman ini masih bersifat statis dan berfokus pada tampilan antarmuka pemulihan akun (*account recovery*), dengan satu kolom input berupa email.

---

## 🏠 3. Katalog Utama & Navigasi

Halaman utama untuk menjelajahi konten terdiri dari **Home**, **Movies**, **Series**, dan **Genre Page**. Seluruh halaman tersebut dilindungi oleh mekanisme validasi sesi pengguna.

### 🧩 Komponen Penyusun Halaman Katalog

1. **Header Utama:** Memuat logo yang mengarah ke halaman Home, navigasi utama (Home, Movies, Series, Playlist), dropdown Genre, modal pencarian, serta avatar profil dengan dropdown menu (My Profile, Playlist, dan Logout).
2. **Hero Section:** Menampilkan lima konten teratas (*Top 5*) sebagai sorotan utama. Dilengkapi tombol interaktif seperti Play dan Add to Playlist serta latar belakang dinamis yang terhubung dengan video melalui komponen `MovieTrailer` menggunakan YouTube iframe.
3. **Page Content (Barisan Seksi Konten):**
   - **Continue Watching:** Menampilkan riwayat tontonan dalam bentuk *landscape card*.
   - **Trending & Popular Sections:** Menampilkan kumpulan film dan serial menggunakan *Movie Card* dengan sistem *horizontal sliding*.
   - **Featured Section:** Area promosi konten dengan tampilan banner.
   - **Genre Track Section:** Menampilkan kumpulan banner kategori genre yang dapat berinteraksi dengan pengguna.

### 🗃️ Pengolahan Data Katalog

- Data katalog film dan serial disimpan dalam file JSON.
- Data diproses dan distandardisasi melalui **Helper Normalisasi** untuk menjaga konsistensi struktur properti setiap film dan serial.
- Data film dan serial dibedakan berdasarkan struktur propertinya. Film tidak memiliki properti `seasons`, sedangkan serial memiliki properti tersebut.

---

## 🎬 4. Halaman Detail Konten

Halaman detail berfungsi menampilkan informasi lebih lengkap ketika pengguna memilih sebuah film atau serial. Terdapat dua halaman detail dengan struktur yang disesuaikan berdasarkan jenis kontennya.

### Detail Movie (`/movies/detail/:id`) & Detail Series (`/series/detail/:id`)

- **Hero Backdrop:** Menampilkan gambar latar beresolusi tinggi sebagai bagian utama halaman.
- **Overview Area:** Menampilkan poster atau thumbnail, metadata seperti rating, genre, dan durasi, serta sinopsis konten.
- **Action Buttons:** Menyediakan tombol operasional seperti Add/Remove from Playlist, Share melalui integrasi *Web Share API*, dan pemutar trailer.
- **Video Player Area:** Menampilkan area pemutar video.
- **Episodes List (Khusus Detail Series):** Menyediakan pemilihan season dan daftar episode berdasarkan season yang dipilih.
- **Cast & Crew:** Menampilkan informasi sutradara dan daftar aktor (*cast team*).
- **Recommendation & Comments:** Menampilkan rekomendasi konten serupa dan area komentar yang masih bersifat statis.

---

## 🗂️ 5. Personal Area (Playlist, History & Profile)

### 📌 Playlist (`/playlist`)

Halaman Playlist menampilkan kumpulan konten film dan serial yang telah disimpan oleh pengguna.

- **Struktur UI:** Menampilkan *Featured Section* yang menyoroti empat konten dari daftar playlist, kemudian diikuti dengan tampilan koleksi dalam bentuk grid.
- **Empty State:** Menyediakan tampilan alternatif ketika pengguna belum memiliki konten tersimpan.
- **Penyimpanan Data:** Data playlist disimpan menggunakan `localStorage` sehingga koleksi dapat diakses kembali berdasarkan sesi pengguna.

### 🕘 History (`/history`)

Halaman History menampilkan daftar riwayat tontonan pengguna dalam bentuk kumpulan *landscape card*.

- Data riwayat tontonan saat ini masih bersifat statis dan menggunakan data mock dari `mockUserData.json`.
- Pengguna dapat menghapus riwayat tontonan satu per satu melalui tombol **Delete (X)** pada masing-masing landscape card.
- Fitur penambahan riwayat tontonan secara otomatis belum tersedia karena masih menunggu integrasi dengan backend (BE).
- Pengelolaan data History menggunakan custom hook `useUserData`.

### 👤 Profile (`/profile`)

Halaman Profile berfungsi sebagai area informasi pengguna yang sedang login.

Informasi yang ditampilkan meliputi nama, email, tipe langganan aktif, kualitas atau batas streaming, serta kontrol navigasi untuk kembali menjelajahi konten.

---

## 🛠️ 6. Ekosistem Hooks & Utilities

Pengelolaan state dan logika bisnis dibagi ke dalam beberapa hooks dan utilities agar kode lebih modular serta tidak menumpuk pada komponen UI.

| Perangkat (Hooks/Utilities) | Tujuan Spesifik |
| --- | --- |
| `useState` | Mengelola state lokal seperti input form, toggle dropdown, modal, dan pagination. |
| `useEffect` | Menangani *side effects* seperti inisialisasi data JSON, pengelolaan scroll listener, dan pembersihan event listener. |
| `useMemo` | Mengoptimalkan hasil komputasi agar tidak dihitung ulang secara berlebihan, misalnya pengacakan rekomendasi film, filter genre, dan padding data. |
| `useRef` | Mengakses DOM secara langsung, misalnya untuk auto-focus pada search bar dan mengontrol scroll pada slider horizontal. |
| `useParams` | Mengambil parameter dinamis dari URL, seperti `:id` dan `:genreName`. |
| `useNavigate` | Mengatur navigasi halaman secara programatis, misalnya setelah proses login berhasil. |
| **Custom Hooks Domain** | Mengisolasi logika bisnis berdasarkan kebutuhan fitur, seperti `useAuth`, `useLogin`, `useRegister`, `useMovies`, `useMovieDetail`, `useGenrePage`, `useMyList`, `useUserData`, dan `useSearchModal`. |
| `MovieHelper` | Menangani normalisasi atau penyesuaian struktur key pada data JSON agar konsisten. |
| `shareHelper` | Mengelola proses pembagian tautan menggunakan Web Share API atau mekanisme fallback yang tersedia. |

---

## 🔄 7. Implementasi CRUD

Implementasi CRUD (*Create, Read, Update, Delete*) pada aplikasi Chill saat ini masih menggunakan kombinasi data JSON statis dan `localStorage`. Beberapa fitur sudah dapat dijalankan di sisi frontend, sedangkan fitur lainnya masih menunggu integrasi backend.

### 📥 Read (Get Data)

Operasi Read digunakan untuk mengambil dan menampilkan data yang dibutuhkan oleh masing-masing komponen.

| No. | Komponen / Fitur | Implementasi |
| --- | --- | --- |
| 1 | **Hero Section** | Mengambil dan menampilkan lima konten teratas (*Top 5*) dari dataset. |
| 2 | **Continue Watching** | Mengambil dan menampilkan data riwayat tontonan. Saat ini data dibuat secara statis dan dibaca dari `localStorage`. |
| 3 | **Genre Section** | Menampilkan satu film yang mewakili masing-masing genre. |
| 4 | **Featured Section (Series)** | Mengambil dan menampilkan lima serial teratas (*Top 5 Series*) dari dataset. |
| 5 | **History** | Membaca data riwayat tontonan dari mock data yang dikelola melalui custom hook `useUserData`. |

### ➕ Create (Add Data)

Operasi Create digunakan untuk menambahkan data baru ke dalam koleksi pengguna.

| No. | Komponen / Fitur | Implementasi |
| --- | --- | --- |
| 1 | **Add to Playlist** | Menambahkan film atau serial ke dalam koleksi playlist pengguna dengan menyimpan datanya ke `localStorage`. |

### 🔄 Update (Perbarui Data)

Operasi Update digunakan untuk memperbarui status atau informasi data yang sudah tersimpan.

| No. | Komponen / Fitur | Implementasi |
| --- | --- | --- |
| 1 | **Playlist Button** | Memperbarui tampilan tombol dari **"+ Playlist"** menjadi **"Tersimpan"** setelah konten berhasil ditambahkan. Perubahan status dilakukan dengan memeriksa dan memanipulasi data di `localStorage`. |

### 🗑️ Delete (Hapus Data)

Operasi Delete digunakan untuk menghapus data dari koleksi pengguna.

| No. | Komponen / Fitur | Implementasi |
| --- | --- | --- |
| 1 | **Delete History** | Menghapus satu item riwayat tontonan melalui tombol **X** pada *landscape card* di halaman History. Penghapusan dilakukan satu per satu. |

### 📌 Status Implementasi CRUD

| Operasi | Fitur | Status |
| --- | --- | --- |
| **Read** | Pengambilan data katalog dan riwayat tontonan | Sudah diterapkan (data statis dan `localStorage`). |
| **Create** | Menambahkan film atau serial ke playlist | Sudah diterapkan menggunakan `localStorage`. |
| **Update** | Memperbarui status tombol playlist menjadi "Tersimpan" | Sudah diterapkan melalui manipulasi `localStorage`. |
| **Delete** | Menghapus item riwayat tontonan | Sudah diterapkan pada halaman History. |
| **Create** | Menambahkan riwayat tontonan secara otomatis | Belum tersedia, menunggu integrasi backend. |

> **Catatan:** Implementasi CRUD saat ini masih berada di sisi frontend. Penyimpanan menggunakan `localStorage` dan data mock, sehingga belum melibatkan operasi database maupun API backend.