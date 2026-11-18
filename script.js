/**
 * ============================================================================
 * LAUNDRY AM - JAVASCRIPT LOGIC
 * Cantik, Lucu, Sederhana & Berwarna Pink-Putih
 * ============================================================================
 */

const STORAGE_KEY = 'LAUNDRY_AM_PINK_DATA_V1';

// Data Contoh Awal (Cantik, Bersih & Realistis)
const INITIAL_DATA = [
  {
    id: 'ord-101',
    nama: 'Kak Bella Amanda',
    hp: '081234567801',
    jenis: 'Cuci Komplit (Wangi & Setrika)',
    tarif: 7000,
    unit: 'kg',
    berat: 3,
    harga: 21000,
    status: 'Diproses'
  },
  {
    id: 'ord-102',
    nama: 'Kak Citra Kirana',
    hp: '085711223344',
    jenis: 'Express Kilat (5 Jam)',
    tarif: 10000,
    unit: 'kg',
    berat: 2,
    harga: 20000,
    status: 'Menunggu'
  },
  {
    id: 'ord-103',
    nama: 'Ibu Siti Rahayu',
    hp: '081399887766',
    jenis: 'Bed Cover & Selimut',
    tarif: 25000,
    unit: 'pcs',
    berat: 1,
    harga: 25000,
    status: 'Selesai'
  },
  {
    id: 'ord-104',
    nama: 'Kak Reza Mahardika',
    hp: '087812345678',
    jenis: 'Cuci Kering Lipat',
    tarif: 5000,
    unit: 'kg',
    berat: 4,
    harga: 20000,
    status: 'Diambil'
  },
  {
    id: 'ord-105',
    nama: 'Kak Bella Amanda',
    hp: '081234567801',
    jenis: 'Cuci Sepatu Bersih',
    tarif: 20000,
    unit: 'pasang',
    berat: 1,
    harga: 20000,
    status: 'Selesai'
  }
];

let orders = [];
let activeReceiptOrder = null;

// ==================== INISIALISASI ====================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupNavigation();
  setupInteractiveWashingMachine();
  setupFormEvents();
  setupFilterEvents();
  updateFormCalculation();
  renderAll();
});

// Load / Seed Data
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      orders = JSON.parse(saved);
    } catch (e) {
      orders = [...INITIAL_DATA];
    }
  } else {
    orders = [...INITIAL_DATA];
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function formatRupiah(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

// ==================== EFEK SUARA BUBBLE WEB AUDIO API ====================
function playCuteBubblePop(type = 'pop') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    } else if (type === 'spin') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.2);
      osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
    } else if (type === 'perfume') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // Fallback jika browser block audio
  }
}

// ==================== MESIN CUCI INTERAKTIF DI AWALAN ====================
function setupInteractiveWashingMachine() {
  const machineWrap = document.getElementById('washingMachineWrap');
  const machine = document.getElementById('interactiveMachine');
  const btnBubbles = document.getElementById('btnTriggerBubbles');
  const btnSpin = document.getElementById('btnTriggerFastSpin');
  const btnPerfume = document.getElementById('btnTriggerPerfume');

  // Klik Mesin Cuci
  if (machineWrap && machine) {
    machineWrap.addEventListener('click', (e) => {
      // Cegah jika klik tombol kontrol di bawahnya
      if (e.target.closest('.machine-play-controls')) return;

      playCuteBubblePop('pop');
      triggerMachineShake(machine);
      spawnExtraParticles(machineWrap, ['🫧', '🌸', '✨', '🧼']);
      showToast('Wusshhh! Baju sedang dicuci harum & wangi semerbak 🫧✨');
    });
  }

  // Tombol 1: Busa Sabun
  if (btnBubbles && machineWrap && machine) {
    btnBubbles.addEventListener('click', (e) => {
      e.stopPropagation();
      playCuteBubblePop('pop');
      triggerMachineShake(machine);
      spawnExtraParticles(machineWrap, ['🫧', '🧼', '🫧', '🫧', '🫧']);
      showToast('Busa sabun melimpah! Pakaian bebas noda & kotoran 🫧');
    });
  }

  // Tombol 2: Putar Kencang
  if (btnSpin && machineWrap && machine) {
    btnSpin.addEventListener('click', (e) => {
      e.stopPropagation();
      playCuteBubblePop('spin');
      triggerMachineShake(machine);
      spawnExtraParticles(machineWrap, ['🌀', '💨', '⚡', '✨']);
      showToast('Mode Express Kilat diaktifkan! Cucian berputar kencang 🌀');
    });
  }

  // Tombol 3: Semprot Parfum
  if (btnPerfume && machineWrap && machine) {
    btnPerfume.addEventListener('click', (e) => {
      e.stopPropagation();
      playCuteBubblePop('perfume');
      triggerMachineShake(machine);
      spawnExtraParticles(machineWrap, ['🌸', '💖', '✨', '🌺', '🌸']);
      showToast('Semprotan parfum Sakura semerbak! Wangi tahan 7 hari 🌸');
    });
  }
}

function triggerMachineShake(machine) {
  machine.classList.remove('spin-fast');
  void machine.offsetWidth; // Trigger reflow
  machine.classList.add('spin-fast');
}

function spawnExtraParticles(parentEl, emojis) {
  for (let i = 0; i < 5; i++) {
    const el = document.createElement('span');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = 'absolute';
    el.style.left = `${25 + Math.random() * 50}%`;
    el.style.top = `${25 + Math.random() * 50}%`;
    el.style.fontSize = `${20 + Math.random() * 14}px`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '20';
    el.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    el.style.opacity = '1';

    parentEl.appendChild(el);

    setTimeout(() => {
      const xOffset = (Math.random() - 0.5) * 120;
      const yOffset = -70 - Math.random() * 50;
      el.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.3) rotate(${(Math.random() - 0.5) * 45}deg)`;
      el.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1100);
  }
}

// ==================== NAVIGASI & PERPINDAHAN HALAMAN ====================
function setupNavigation() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainDashboard = document.getElementById('mainDashboard');
  const btnStart = document.getElementById('btnStart');
  const btnHeaderStart = document.getElementById('btnHeaderStart');
  const btnQuickOrder = document.getElementById('btnQuickOrder');
  const btnBackToWelcome = document.getElementById('btnBackToWelcome');

  // Masuk ke Dashboard (Tombol Mulai Utama & Header)
  function enterDashboard() {
    playCuteBubblePop('pop');
    welcomeScreen.style.display = 'none';
    mainDashboard.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    goToMenu('menu-dashboard');
    showToast('Selamat Datang di Dashboard Laundry AM 🌸');
  }

  if (btnStart) btnStart.addEventListener('click', enterDashboard);
  if (btnHeaderStart) btnHeaderStart.addEventListener('click', enterDashboard);

  // Masuk langsung ke Form Tambah Pesanan
  if (btnQuickOrder) {
    btnQuickOrder.addEventListener('click', () => {
      playCuteBubblePop('pop');
      welcomeScreen.style.display = 'none';
      mainDashboard.style.display = 'block';
      goToMenu('menu-orders');
      setTimeout(() => {
        document.getElementById('inputCustomerName').focus();
      }, 300);
      showToast('Silakan masukkan pesanan cucian baru 🧺');
    });
  }

  // Kembali ke Halaman Selamat Datang
  btnBackToWelcome.addEventListener('click', () => {
    mainDashboard.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Menu Navigasi (Dashboard, Data Pesanan, Data Pelanggan)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMenu = btn.getAttribute('data-page');
      goToMenu(targetMenu);
    });
  });

  // Tombol Reset Data Contoh
  document.getElementById('btnResetDemoData').addEventListener('click', () => {
    if (confirm('Kembalikan semua pesanan ke data contoh awal?')) {
      orders = [...INITIAL_DATA];
      saveData();
      cancelEdit();
      renderAll();
      showToast('Data berhasil direset ke contoh awal 🌸');
    }
  });
}

window.goToMenu = function(targetMenuId) {
  // Update tombol menu aktif
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-page') === targetMenuId);
  });

  // Tampilkan seksi halaman yang dipilih
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.toggle('active', section.id === targetMenuId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderAll();
};

// ==================== FORM & PERHITUNGAN OTOMATIS ====================
function setupFormEvents() {
  const selectType = document.getElementById('inputServiceType');
  const inputWeight = document.getElementById('inputWeight');
  const inputPhone = document.getElementById('inputCustomerPhone');
  const form = document.getElementById('orderForm');
  const btnCancel = document.getElementById('btnCancelEdit');

  selectType.addEventListener('change', updateFormCalculation);
  inputWeight.addEventListener('input', updateFormCalculation);

  // Pembatasan kolom nomor WhatsApp/HP hanya menerima karakter angka (numeric)
  if (inputPhone) {
    // Cegah karakter non-angka saat pengetikan tanpa memblokir tombol Backspace/Delete/Navigasi
    inputPhone.addEventListener('beforeinput', function(e) {
      if (e.inputType && (e.inputType.startsWith('delete') || e.inputType.startsWith('history'))) {
        return;
      }
      if (e.data && !/^\d+$/.test(e.data)) {
        e.preventDefault();
      }
    });

    // Sanitasi otomatis dari paste, autofill, drag-drop, atau virtual keyboard
    inputPhone.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
    });

    // Tangani paste agar hanya menyisipkan angka murni
    inputPhone.addEventListener('paste', function(e) {
      const clipboardData = e.clipboardData || window.clipboardData;
      if (clipboardData) {
        const pastedText = clipboardData.getData('text');
        if (/\D/.test(pastedText)) {
          e.preventDefault();
          const cleanText = pastedText.replace(/\D/g, '');
          const start = this.selectionStart;
          const end = this.selectionEnd;
          const val = this.value;
          this.value = val.slice(0, start) + cleanText + val.slice(end);
          this.setSelectionRange(start + cleanText.length, start + cleanText.length);
        }
      }
    });
  }

  form.addEventListener('submit', handleFormSubmit);
  btnCancel.addEventListener('click', cancelEdit);

  // Struk Modal Events
  document.getElementById('btnReceiptWa').addEventListener('click', sendReceiptWhatsApp);
}

function updateFormCalculation() {
  const select = document.getElementById('inputServiceType');
  const opt = select.options[select.selectedIndex];
  const rate = Number(opt.dataset.rate) || 0;
  const unit = opt.dataset.unit || 'kg';
  const rawWeight = parseFloat(document.getElementById('inputWeight').value);

  // Jika berat diisi kurang dari 0.1 atau bernilai negatif / NaN, total harga tidak menampilkan angka negatif (Rp 0)
  const isInvalidWeight = isNaN(rawWeight) || rawWeight < 0.1;
  const validWeight = isInvalidWeight ? 0 : rawWeight;
  const total = isInvalidWeight ? 0 : Math.max(0, Math.round(rate * validWeight));

  document.getElementById('labelWeight').textContent = unit === 'kg' ? 'Berat Cucian (Kg)' : `Jumlah (${unit})`;
  document.getElementById('displayTariff').textContent = `${formatRupiah(rate)} / ${unit}`;
  document.getElementById('displayWeight').textContent = `${validWeight} ${unit}`;
  document.getElementById('displayTotalPrice').textContent = formatRupiah(total);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('editOrderId').value;
  const nama = document.getElementById('inputCustomerName').value.trim();
  const hp = document.getElementById('inputCustomerPhone').value.trim().replace(/[^0-9]/g, '');
  const select = document.getElementById('inputServiceType');
  const opt = select.options[select.selectedIndex];
  const jenis = opt.value;
  const tarif = Number(opt.dataset.rate) || 0;
  const unit = opt.dataset.unit || 'kg';
  const rawBerat = parseFloat(document.getElementById('inputWeight').value);
  const berat = (!isNaN(rawBerat) && rawBerat >= 0.1) ? rawBerat : 0;
  const status = document.getElementById('inputStatus').value;
  const harga = Math.max(0, Math.round(tarif * berat));

  if (!nama || !hp || berat < 0.1) {
    alert('Harap isi nama, nomor HP, dan berat cucian minimal 0,1!');
    return;
  }

  if (editId) {
    // Mode EDIT
    const idx = orders.findIndex(o => o.id === editId);
    if (idx !== -1) {
      orders[idx] = {
        ...orders[idx],
        nama,
        hp,
        jenis,
        tarif,
        unit,
        berat,
        harga,
        status
      };
      showToast(`Pesanan ${nama} berhasil diperbarui! ✨`);
    }
    cancelEdit();
  } else {
    // Mode TAMBAH BARU
    const newOrder = {
      id: 'ord-' + Date.now(),
      nama,
      hp,
      jenis,
      tarif,
      unit,
      berat,
      harga,
      status
    };
    orders.unshift(newOrder);
    showToast(`Pesanan ${nama} berhasil disimpan! 🧺`);
    document.getElementById('orderForm').reset();
    document.getElementById('inputWeight').value = 2;
    updateFormCalculation();
  }

  saveData();
  renderAll();
}

function cancelEdit() {
  document.getElementById('editOrderId').value = '';
  document.getElementById('formTitleText').innerHTML = '<i class="fa-solid fa-plus-circle text-pink"></i> Form Tambah Pesanan';
  document.getElementById('btnSaveOrder').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Pesanan';
  document.getElementById('btnCancelEdit').style.display = 'none';
  document.getElementById('orderForm').reset();
  document.getElementById('inputWeight').value = 2;
  updateFormCalculation();
}

// Edit Trigger
window.editOrder = function(id) {
  const o = orders.find(item => item.id === id);
  if (!o) return;

  goToMenu('menu-orders');

  document.getElementById('editOrderId').value = o.id;
  document.getElementById('inputCustomerName').value = o.nama;
  document.getElementById('inputCustomerPhone').value = o.hp;
  document.getElementById('inputServiceType').value = o.jenis;
  document.getElementById('inputWeight').value = o.berat;
  document.getElementById('inputStatus').value = o.status;

  document.getElementById('formTitleText').innerHTML = `<i class="fa-solid fa-pen-to-square text-pink"></i> Edit Pesanan: ${o.nama}`;
  document.getElementById('btnSaveOrder').innerHTML = '<i class="fa-solid fa-check"></i> Simpan Perubahan';
  document.getElementById('btnCancelEdit').style.display = 'inline-block';

  updateFormCalculation();
};

// Hapus Pesanan
window.deleteOrder = function(id) {
  const o = orders.find(item => item.id === id);
  if (!o) return;

  if (confirm(`Apakah Anda yakin ingin menghapus pesanan atas nama "${o.nama}"?`)) {
    orders = orders.filter(item => item.id !== id);
    saveData();
    renderAll();
    showToast('Pesanan berhasil dihapus.');
  }
};

// Ubah Status Siklus 1-Klik
window.cycleStatus = function(id) {
  const o = orders.find(item => item.id === id);
  if (!o) return;

  const steps = ['Menunggu', 'Diproses', 'Selesai', 'Diambil'];
  const curIdx = steps.indexOf(o.status);
  const nextIdx = (curIdx + 1) % steps.length;
  o.status = steps[nextIdx];

  saveData();
  renderAll();
  showToast(`Status cucian ${o.nama} diubah jadi "${o.status}" 🌸`);
};

// ==================== FILTER & SEARCH ====================
function setupFilterEvents() {
  document.getElementById('searchOrdersInput').addEventListener('input', renderOrdersTable);
  document.getElementById('filterOrdersStatus').addEventListener('change', renderOrdersTable);
}

// ==================== RENDERING UTAMA ====================
function renderAll() {
  renderSummaryStats();
  renderDashboardTable();
  renderOrdersTable();
  renderCustomersTable();
}

// 1. Ringkasan Kartu Dashboard
function renderSummaryStats() {
  const total = orders.length;
  const diproses = orders.filter(o => o.status === 'Diproses').length;
  const selesai = orders.filter(o => o.status === 'Selesai').length;

  document.getElementById('dashTotalOrders').textContent = total;
  document.getElementById('dashProcessingOrders').textContent = diproses;
  document.getElementById('dashDoneOrders').textContent = selesai;
}

// 2. Tabel Pesanan di Halaman Dashboard
function renderDashboardTable() {
  const tbody = document.getElementById('dashOrdersTableBody');
  const recentOrders = orders.slice(0, 5);

  if (recentOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 20px; color: var(--text-muted);">Belum ada pesanan masuk.</td></tr>`;
    return;
  }

  tbody.innerHTML = recentOrders.map(o => `
    <tr>
      <td><strong>${escapeHtml(o.nama)}</strong></td>
      <td>${escapeHtml(o.jenis)}</td>
      <td>${o.berat} ${o.unit}</td>
      <td><strong class="text-pink">${formatRupiah(o.harga)}</strong></td>
      <td>
        <button class="status-pill status-${o.status}" title="Klik untuk ganti status" onclick="cycleStatus('${o.id}')">
          ${getStatusIcon(o.status)} ${o.status}
        </button>
      </td>
      <td class="text-center">
        <button class="btn-mini btn-mini-rcpt" title="Cetak Nota" onclick="openReceiptModal('${o.id}')">
          <i class="fa-solid fa-receipt"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// 3. Tabel Lengkap di Halaman Data Pesanan
function renderOrdersTable() {
  const q = document.getElementById('searchOrdersInput').value.trim().toLowerCase();
  const filter = document.getElementById('filterOrdersStatus').value;
  const tbody = document.getElementById('ordersTableBody');
  const emptyNotice = document.getElementById('emptyOrdersNotice');

  const filtered = orders.filter(o => {
    const matchName = !q || o.nama.toLowerCase().includes(q) || o.hp.includes(q);
    const matchStatus = filter === 'ALL' || o.status === filter;
    return matchName && matchStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyNotice.style.display = 'block';
    return;
  }

  emptyNotice.style.display = 'none';

  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td>
        <strong>${escapeHtml(o.nama)}</strong><br>
        <small style="color: var(--text-muted);"><i class="fa-brands fa-whatsapp text-pink"></i> ${escapeHtml(o.hp)}</small>
      </td>
      <td>${escapeHtml(o.jenis)}</td>
      <td>${o.berat} ${o.unit}</td>
      <td><strong class="text-pink">${formatRupiah(o.harga)}</strong></td>
      <td>
        <button class="status-pill status-${o.status}" title="Klik untuk ganti status langsung" onclick="cycleStatus('${o.id}')">
          ${getStatusIcon(o.status)} ${o.status}
        </button>
      </td>
      <td class="text-center">
        <div class="action-group">
          <button class="btn-mini btn-mini-rcpt" title="Cetak Nota" onclick="openReceiptModal('${o.id}')">
            <i class="fa-solid fa-receipt"></i>
          </button>
          <button class="btn-mini btn-mini-rcpt" title="Edit Pesanan" onclick="editOrder('${o.id}')">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-mini btn-mini-del" title="Hapus Pesanan" onclick="deleteOrder('${o.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// 4. Tabel Pelanggan di Halaman Data Pelanggan
function renderCustomersTable() {
  const tbody = document.getElementById('customersTableBody');
  const countBadge = document.getElementById('totalCustomerCount');

  const map = {};
  orders.forEach(o => {
    const key = (o.hp || o.nama).trim().toLowerCase();
    if (!map[key]) {
      map[key] = {
        nama: o.nama,
        hp: o.hp,
        count: 0,
        total: 0
      };
    }
    map[key].count += 1;
    map[key].total += (Number(o.harga) || 0);
  });

  const list = Object.values(map);
  countBadge.textContent = list.length;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 24px; color: var(--text-muted);">Belum ada data pelanggan tercatat.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((c, index) => {
    let cleanPhone = c.hp.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Halo Kak ${c.nama} 🌸, terima kasih sudah menjadi pelanggan setia di Laundry AM!`)}`;

    return `
      <tr>
        <td>${index + 1}</td>
        <td><strong>${escapeHtml(c.nama)}</strong></td>
        <td><i class="fa-brands fa-whatsapp text-pink"></i> ${escapeHtml(c.hp)}</td>
        <td><span class="customer-badge">${c.count} Kali Cuci</span></td>
        <td><strong class="text-pink">${formatRupiah(c.total)}</strong></td>
        <td class="text-center">
          <a href="${waUrl}" target="_blank" class="btn btn-wa btn-sm">
            <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

// Utility icon status
function getStatusIcon(status) {
  if (status === 'Menunggu') return '⏳';
  if (status === 'Diproses') return '🌀';
  if (status === 'Selesai') return '✨';
  if (status === 'Diambil') return '📦';
  return '•';
}

// ==================== MODAL NOTA STRUK ====================
window.openReceiptModal = function(id) {
  const o = orders.find(item => item.id === id);
  if (!o) return;

  activeReceiptOrder = o;

  document.getElementById('rcptName').textContent = o.nama;
  document.getElementById('rcptPhone').textContent = o.hp;
  document.getElementById('rcptDate').textContent = new Date().toLocaleDateString('id-ID');
  document.getElementById('rcptService').textContent = o.jenis;
  document.getElementById('rcptWeight').textContent = `${o.berat} ${o.unit}`;
  document.getElementById('rcptTotal').textContent = formatRupiah(o.harga);
  document.getElementById('rcptStatus').textContent = o.status;

  document.getElementById('receiptModal').classList.add('active');
};

window.closeReceiptModal = function() {
  document.getElementById('receiptModal').classList.remove('active');
};

function sendReceiptWhatsApp() {
  if (!activeReceiptOrder) return;

  let cleanPhone = activeReceiptOrder.hp.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);

  const message = `Halo Kak *${activeReceiptOrder.nama}* 🌸🫧\n` +
    `Berikut rincian nota cucian Anda di *Laundry AM*:\n\n` +
    `🧺 Jenis Cucian: ${activeReceiptOrder.jenis}\n` +
    `⚖️ Berat/Qty: ${activeReceiptOrder.berat} ${activeReceiptOrder.unit}\n` +
    `💰 Total Harga: *${formatRupiah(activeReceiptOrder.harga)}*\n` +
    `📍 Status Cucian: *${activeReceiptOrder.status}*\n\n` +
    `Terima kasih sudah mencuci di Laundry AM! Bersih, wangi, & rapi selalu 🥰`;

  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
}

// ==================== TOAST NOTIFIKASI ====================
function showToast(text) {
  const toast = document.getElementById('cuteToast');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
