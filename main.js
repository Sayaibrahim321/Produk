import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPWh3k3nD1T4UOw_y4pkrc2DZW144Qzd8",
  authDomain: "ibrahim-1b654.firebaseapp.com",
  projectId: "ibrahim-1b654",
  storageBucket: "ibrahim-1b654.appspot.com",
  messagingSenderId: "1009341282196",
  appId: "1:1009341282196:web:7ccf1fc220cf942a274181"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarProduk() {
  const refDokumen = collection(db, "produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
      stok: dok.data().stok,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahProduk(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'), {
      nama: nama,
      harga: harga,
      stok: stok
    });
    console.log('Berhasil menambah produk ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah produk ' + e);
  }
}

export async function hapusProduk(docId) {
  await deleteDoc(doc(db, "produk", docId))
}
