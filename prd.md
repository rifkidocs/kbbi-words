# Product Requirements Document (PRD)

## Nama Produk

Kamus Kata Indonesia (KBBI Word Finder)

## Versi

1.0

## Status

Draft Final

---

# 1. Latar Belakang

Aplikasi ini dibuat untuk membantu pengguna menemukan kata-kata Bahasa Indonesia berdasarkan:

1. Huruf awal tertentu (A-Z).
2. Awalan kata tertentu (misalnya: "as", "ber", "me", dll).

Sistem akan menampilkan daftar kata Bahasa Indonesia yang valid berdasarkan data KBBI atau dataset kata Bahasa Indonesia yang tersedia.

Target penggunaan:

* Mencari inspirasi kata.
* Bermain tebak kata.
* Membantu pembuatan konten.
* Membantu pembelajaran Bahasa Indonesia.

---

# 2. Tujuan Produk

Menyediakan pencarian kata yang cepat dan sederhana dengan hasil maksimal 10 kata yang sesuai dengan kriteria pencarian.

---

# 3. Teknologi

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* Shadcn UI

## Backend

* Next.js API Routes / Server Actions

## Database

Pilihan:

* JSON Dataset KBBI (Recommended untuk versi awal)
* PostgreSQL (opsional jika data besar)

---

# 4. Fitur Utama

## Fitur 1: Cari Berdasarkan Huruf

### Deskripsi

Pengguna memasukkan satu huruf.

Contoh:

Input:
A

Output:

* Abadi
* Abah
* Abang
* Abdi
* Abjad
* Ablasi
* Abnormal
* Abrasi
* Absen
* Acak

### Aturan

* Hanya menerima 1 karakter huruf.
* Tidak case sensitive.
* Saat Enter ditekan, sistem menampilkan maksimal 10 kata.
* Kata harus diawali huruf yang sama.

---

## Fitur 2: Cari Berdasarkan Awalan Kata

### Deskripsi

Pengguna memasukkan awalan kata.

Contoh:

Input:
as

Output:

* Asa
* Asah
* Asal
* Asam
* Asap
* Asasi
* Asbak
* Asesor
* Asih
* Asing

### Aturan

* Tidak case sensitive.
* Harus menggunakan pencarian prefix.
* Kata wajib diawali awalan yang dimasukkan.
* Tidak boleh mengandung awalan di tengah kata.

Contoh:

Input:
as

Valid:
✅ Asam
✅ Asap
✅ Asal

Tidak Valid:
❌ Kertas
❌ Balas
❌ Bebas

Karena "as" tidak berada di awal kata.

---

# 5. User Flow

## Pencarian Huruf

1. User membuka website.
2. User mengisi field huruf.
3. User menekan Enter.
4. Sistem mencari kata berdasarkan huruf tersebut.
5. Sistem menampilkan maksimal 10 hasil.

---

## Pencarian Awalan

1. User membuka website.
2. User mengisi field awalan.
3. User menekan Enter.
4. Sistem mencari kata yang diawali awalan tersebut.
5. Sistem menampilkan maksimal 10 hasil.

---

# 6. User Interface

## Layout

---

## | Kamus Kata Indonesia            |

Cari Berdasarkan Huruf

[ A____________ ]

Cari Berdasarkan Awalan

[ as___________ ]

---

Hasil:

1. Asa
2. Asah
3. Asal
4. Asam
5. Asap
6. Asasi
7. Asbak
8. Asesor
9. Asih
10. Asing

---

## Komponen

### Search By Letter

* Input Text
* Max Length: 1

### Search By Prefix

* Input Text
* Max Length: 20

### Result List

* Menampilkan daftar kata
* Maksimal 10 item

---

# 7. Functional Requirements

## FR-001

Sistem harus menerima input satu huruf.

## FR-002

Sistem harus menampilkan maksimal 10 kata yang diawali huruf tersebut.

## FR-003

Sistem harus menerima input awalan kata.

## FR-004

Sistem harus melakukan pencarian prefix.

## FR-005

Sistem harus menampilkan maksimal 10 kata yang cocok.

## FR-006

Pencarian tidak case sensitive.

## FR-007

Pencarian dijalankan saat tombol Enter ditekan.

## FR-008

Jika hasil tidak ditemukan, tampilkan:

"Tidak ada kata yang ditemukan."

---

# 8. Non Functional Requirements

## Performance

* Waktu respon < 500 ms.

## Responsiveness

* Mobile Friendly.
* Desktop Friendly.

## SEO

* Menggunakan metadata Next.js.

## Accessibility

* Input memiliki label.
* Bisa digunakan dengan keyboard.

---

# 9. Struktur Data

Contoh Dataset

```json
[
  "abadi",
  "abah",
  "abang",
  "abdi",
  "abjad",
  "asa",
  "asah",
  "asal",
  "asam",
  "asap",
  "asing"
]
```

---

# 10. Algoritma Pencarian

## Huruf

```ts
words
.filter(word => word.startsWith(letter))
.slice(0, 10)
```

## Awalan

```ts
words
.filter(word => word.startsWith(prefix))
.slice(0, 10)
```

---

# 11. Future Enhancement

* Random kata.
* Copy hasil pencarian.
* Export ke CSV.
* Riwayat pencarian.
* API publik.
* Filter berdasarkan jumlah huruf.
* Auto complete.
* Pencarian seluruh database KBBI.
