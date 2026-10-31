# 🎬 Chill Streaming Platform - Dokumentasi Teknis

Dokumentasi ini memuat spesifikasi arsitektur, struktur antarmuka, alur logika, serta konfigurasi teknis untuk aplikasi *streaming* **Chill**. Proyek ini dibangun menggunakan arsitektur modular dengan pendekatan *Single Page Application* (SPA).

---

## 🧭 1. Peta Navigasi & Proteksi Akses (Routing)

Aplikasi ini menggunakan **React Router DOM v6** dengan mekanisme *Route Guard* (`<Navigate/>` dan `<Outlet/>`) untuk memastikan keamanan sesi pengguna. Routing dibagi menjadi dua area utama:

### 🔓 Public Routes

Rute ini hanya dapat diakses oleh pengguna yang **belum** masuk (tidak memiliki sesi `userLoggedIn` di `localStorage`). Jika pengguna yang sudah *login* mencoba mengaksesnya, mereka akan otomatis diarahkan ke halaman Beranda (`/`).

| Path URL | Komponen Utama | Deskripsi |
| --- | --- | --- |
| `/sign-in` | `<Login/>` | Portal masuk dengan validasi sesi |
| `/register` | `<Register/>` | Pembuatan akun baru dengan validasi kata sandi |
| `/forgot-password` | `<ForgotPassword/>` | Pemulihan kata sandi (Mode statis) |

### 🔐 Protected Routes (Private)

Rute ini wajib diakses oleh pengguna yang **sudah** divalidasi. Jika pengguna tanpa sesi mencoba mengaksesnya, mereka akan otomatis dilempar ke `/sign-in`.

| Path URL | Komponen Utama | Kategori | Deskripsi |
| --- | --- | --- | --- |
| `/` | `<Home/>` | **Katalog** | Beranda utama dengan campuran seluruh konten |
| `/movies` | `<Movies/>` | **Katalog** | Etalase khusus film layar lebar |
| `/series` | `<Series/>` | **Katalog** | Etalase khusus serial televisi |
| `/movies/genre/:genreName` | `<GenrePage defaultType="movie"/>` | **Katalog** | Filter film berdasarkan parameter genre |
| `/series/genre/:genreName` | `<GenrePage defaultType="series"/>` | **Katalog** | Filter serial berdasarkan parameter genre |
| `/a/genre/:genreName` | `<GenrePage defaultType="all"/>` | **Katalog** | Gabungan film & serial dalam satu genre |
| `/movies/detail/:id` | `<DetailMovie/>` | **Detail** | Informasi lengkap spesifik satu film |
| `/series/detail/:id` | `<DetailSeries/>` | **Detail** | Informasi lengkap spesifik satu serial |
| `/playlist` | `<Playlist/>` | **Personal** | Daftar tontonan yang disimpan pengguna |
| `/profile` | `<Profile/>` | **Personal** | Informasi akun dan paket langganan |
| `*` | `<NotFound/>` | **Error** | *Fallback* visual jika rute tidak ditemukan |

---

## 👤 2. Modul Autentikasi (Authentication)

Sistem autentikasi berjalan secara *client-side* menggunakan data statis (`public/data/users.json`) dan `localStorage` sebagai penyimpan *session*.

### 🔑 Login (`/sign-in`)

* **Struktur UI:** Dibagi menjadi dua sisi utama: `LoginWelcome` (Sisi grafis/branding) dan `LoginForm` (Input data pengguna). Pesan *error/success* disisipkan secara dinamis di atas *form*.
* **Hooks Aktif:** `useState` (menangani input), `useNavigate` (pengalihan halaman), `useLogin` (isolasi logika bisnis).
* **Alur Validasi (`handleSubmit`):**
1. Memastikan form tidak kosong (`username` dan `password`).
2. Melakukan *fetching* asinkron (`async/await`) ke `users.json`.
3. Mencari ketepatan `username` menggunakan fungsi `.find()`.
4. Jika `username` valid, mencocokkan `password`.
5. Jika berhasil, menyimpan objek kredensial (nama dan email) ke `localStorage` (`userLoggedIn`) dan mengeksekusi `navigate('/')`.



### 📝 Register (`/register`)

* **Struktur UI:** Memanfaatkan `RegisterWelcome` dan `RegisterForm` yang berisi 4 kolom input: *Username, Email, Password, Confirm Password*.
* **Hooks Aktif:** `useState`, `useNavigate`, `useRegister`.
* **Alur Validasi:**
1. Pengecekan input kosong.
2. **Validasi Lapis Ganda:** Memastikan nilai `password` dan `confirmPassword` identik. (Terdiri dari validasi *real-time* di UI dan validasi saat *submit*).
3. Mengecek ketersediaan `username` melalui `.some()` ke data `users.json`.
4. Menampilkan pesan pendaftaran berhasil dan mengalihkan pengguna ke `/sign-in` (Mode simulasi).



### ❓ Forgot Password (`/forgot-password`)

* Halaman statis yang berfokus pada UI *recovery* dengan input satu kolom (Email).

---

## 🏠 3. Katalog Utama & Navigasi

Halaman pilar penjelajahan aplikasi terdiri dari **Home**, **Movies**, **Series**, dan **Genre Page**. Semua halaman ini dilindungi oleh pengecekan sesi.

### 🧩 Komponen Penyusun Halaman Katalog

1. **Header Utama:** Memuat logo (Link ke Home), navigasi *tab* (Home, Movies, Series, Playlist), sistem Dropdown untuk Genre, *trigger* Modal Pencarian, dan Avatar Profil dengan *Dropdown Menu* (My Profile, Playlist, Logout).
2. **Hero Section:** Menampilkan 5 sorotan konten teratas, lengkap dengan tombol interaktif (Play, Add to Playlist) dan latar belakang dinamis yang dihubungkan ke API *iframe* YouTube (MovieTrailer).
3. **Page Content (Barisan Seksi Konten):**
* **Continue Watching:** Disajikan dengan *Landscape Card* khusus.
* **Trending & Popular Sections:** Disajikan menggunakan rentetan *Movie Card* standar dengan sistem *sliding* horizontal.
* **Featured Section:** Area promosi dengan gaya *banner* penuh.
* **Genre Track Section:** Kumpulan *banner* kategori genre yang interaktif.



### 🗃️ Pengolahan Data Katalog

* Seluruh halaman ini mengambil data dari fail JSON.
* Data ditangkap dan distandardisasi melalui **Helper Normalisasi** (memastikan konsistensi struktur properti setiap film/series).
* Film dirender tanpa `seasons`, sedangkan Series difilter berdasarkan keberadaan properti `seasons`.

---

## 🎬 4. Halaman Detail Konten

Halaman ini berfungsi menyajikan spesifikasi mendalam ketika sebuah kartu diklik, dengan perbedaan arsitektur antara Film dan Serial TV.

* **DetailMovie (`/movies/detail/:id`) & DetailSeries (`/series/detail/:id`)**
* **Hero Backdrop:** Gambar resolusi tinggi sebagai tajuk visual.
* **Overview Area:** Menampilkan poster *thumbnail*, meta-data (rating, genre, durasi), sinopsis, serta tuas aksi operasional (Tombol Tambah/Hapus dari Playlist, Tombol Bagikan dengan integrasi *Web Share API*, dan Pemutar Trailer).
* **Video Player Area:** Penampang pemutar video tersemat.
* **Episodes List (Eksklusif DetailSeries):** Pemilihan musiman (*season*) yang merender daftar episode terkait.
* **Cast & Crew:** Grid potret sutradara dan barisan aktor (*cast team*).
* **Recommendation & Comments:** Relasi konten serupa diakhiri dengan tampilan diskusi statis.



---

## 🗂️ 5. Personal Area (Playlist & Profile)

### 📌 Playlist (`/playlist`)

Menampilkan etalase personal berisi kumpulan konten yang ditandai (ditambahkan) oleh pengguna.

* **Struktur UI:** Dibuka dengan barisan *Featured Section* (menyorot 4 konten dari daftar putar), diikuti oleh tata letak *grid* menyeluruh.
* **Empty State:** Menyediakan antarmuka pengganti visual jika daftar koleksi pengguna masih kosong.

### 👤 Profile (`/profile`)

Halaman administratif untuk tinjauan info pengguna saat ini, mencakup nama, email, tipe langganan aktif, kualitas batas *streaming*, serta kontrol navigasi untuk kembali ke rutinitas menonton.

---

## 🛠️ 6. Ekosistem Hooks & Utilities

Pengelolaan status dan logika bisnis didistribusikan secara modular untuk menghindari penumpukan kode pada lapisan UI.

| Perangkat (Hooks/Utilitas) | Tujuan Spesifik |
| --- | --- |
| `useState` | Memonitor status variabel lokal (input form, *toggle dropdown*, jendela *modal*, kalkulator *pagination*). |
| `useEffect` | Menjalankan siklus sampingan (*side-effects*) seperti inisiasi data JSON, manajemen *scroll listener*, atau pembatalan *event*. |
| `useMemo` | Mengunci hasil komputasi berat, contoh: mengocok (*shuffling*) barisan rekomendasi film, pemfilteran genre, dan teknik *padding data*. |
| `useRef` | Melakukan intervensi DOM langsung (*auto-focus* pada bilah pencarian, kontrol lintasan gulir pada *slider* horizontal). |
| `useParams` | Mengekstraksi injeksi data dinamis di lintasan URL (seperti membaca variabel `:id` atau `:genreName`). |
| `useNavigate` | Memfasilitasi pendorongan rute secara artifisial usai pengguna menekan tombol tertentu (misalnya sukses *login*). |
| **Custom Hooks Domain** | Isolasi murni untuk memecah logika halaman: `useAuth`, `useLogin`, `useRegister`, `useMovies`, `useMovieDetail`, `useGenrePage`, `useMyList`, `useSearchModal`. |
| `MovieHelper` | Menghilangkan anomali struktur *key* JSON mentah. |
| `shareHelper` | Mengelola API pembagian tautan (*Share*) otomatis ke sistem OS target. |