const form = document.getElementById('form-transaksi');
const daftar = document.getElementById('daftar');

// Ambil data dari localStorage (kalau kosong, mulai dari array kosong)
let transaksi = JSON.parse(localStorage.getItem('transaksi')) || [];

const rupiah = (angka) => 'Rp ' + angka.toLocaleString('id-ID');

function simpan() {
  localStorage.setItem('transaksi', JSON.stringify(transaksi));
}

function tampilkan() {
  daftar.innerHTML = '';
  let masuk = 0, keluar = 0;

  transaksi.forEach((t, index) => {
    if (t.tipe === 'pemasukan') masuk += t.jumlah;
    else keluar += t.jumlah;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${t.keterangan}</span>
      <span class="${t.tipe}">${t.tipe === 'pemasukan' ? '+' : '-'}${rupiah(t.jumlah)}</span>
      <button data-index="${index}">✕</button>
    `;
    daftar.appendChild(li);
  });

  document.getElementById('pemasukan').textContent = rupiah(masuk);
  document.getElementById('pengeluaran').textContent = rupiah(keluar);
  document.getElementById('saldo').textContent = rupiah(masuk - keluar);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  transaksi.push({
    keterangan: document.getElementById('keterangan').value,
    jumlah: Number(document.getElementById('jumlah').value),
    tipe: document.getElementById('tipe').value,
  });
  simpan();
  tampilkan();
  form.reset();
});

daftar.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    transaksi.splice(e.target.dataset.index, 1);
    simpan();
    tampilkan();
  }
});

tampilkan();