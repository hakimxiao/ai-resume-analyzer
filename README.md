# 🧠 AI Resume Analyzer — Developer Guide

Proyek ini menggunakan **Puter API**, **TypeScript type definitions**, dan **Zustand** untuk state management.  
README ini menjelaskan cara penggunaan ketiganya agar pengembang baru dapat memahami struktur dan alur proyek dengan cepat.

---

## 🗂️ Struktur File Penting

/app
├── /lib
│ └── puter.ts # File utama berisi implementasi Puter API client
├── /types
│ └── puter.d.ts # Definisi tipe TypeScript untuk Puter

---

## ⚙️ Puter API Client (`/app/lib/puter.ts`)

File ini berisi fungsi utama untuk komunikasi dengan API Puter, termasuk:
- Autentikasi user (login, logout)
- Pengambilan dan penyimpanan data
- Koneksi real-time dengan backend Puter

💡 **Catatan:**  
Untuk melihat detail implementasi, buka file:
/app/lib/puter.ts

---

## 🧾 Type Definitions (`/app/types/puter.d.ts`)

Berisi definisi tipe untuk membantu autocomplete dan validasi di TypeScript, seperti:
- `PuterUser`
- `PuterFile`
- `PuterResponse<T>`

💡 **Catatan:**  
Untuk tipe lengkap, buka:
/app/types/puter.d.ts

---

## 🧱 State Management — Zustand (`/app/store/useStore.ts`)

Proyek ini menggunakan **Zustand** untuk mengelola state global tanpa boilerplate besar.

### Contoh penggunaan:
```ts
import { create } from "zustand";

interface UserState {
  user: string | null;
  setUser: (name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (name) => set({ user: name }),
  clearUser: () => set({ user: null }),
}));
```

Kemudian, di komponen React:

```tsx
import { useUserStore } from "@/store/useStore";

function Dashboard() {
  const { user, clearUser } = useUserStore();
  return (
    <div>
      <h2>Selamat datang, {user}!</h2>
      <button onClick={clearUser}>Logout</button>
    </div>
  );
}
```

🧩 Integrasi Antar File
puter.ts bertanggung jawab atas koneksi ke API Puter.

puter.d.ts menyediakan definisi tipe untuk mempermudah pengembangan TypeScript.

useStore.ts (Zustand) digunakan untuk menyimpan data hasil API agar dapat diakses di seluruh aplikasi React.

Contoh alur:

Puter API → puter.ts → hasil dikirim ke → useStore.ts → digunakan di → Komponen React
🧠 Tips Pengembangan
Gunakan import type { ... } dari /types/puter.d.ts untuk menjaga performa build TypeScript.

Saat menambahkan fungsi baru di puter.ts, pastikan selalu menambahkan tipe hasil di puter.d.ts.

Gunakan devtools dari Zustand untuk debugging state global.