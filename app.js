const express = require('express');
const path = require('path');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose(); // 1. Import SQLite

const app = express();
const PORT = 3000;

// 2. Inisialisasi Database SQLite (Akan membuat file 'database.db' di root proyek)
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Gagal koneksi database:', err.message);
    else console.log('Terhubung ke database SQLite.');
});


app.get('/dashboard', (req, res) => {
    res.sendFile(
        path.join(__dirname,
        'views/admin/dashboard.html')
    );
});

app.get('/daftar-detail-laporan', (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            'views',
            'admin',
            'daftar_detail_laporan.html'
        )
    );
});

// Create Table Laporan jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS laporan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kategori TEXT,
    lokasi TEXT,
    deskripsi TEXT,
    urgensi TEXT,
    foto TEXT,
    status TEXT DEFAULT 'Dilaporkan'
)`);

// Konfigurasi Penyimpanan File Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Halaman utama
app.get('/', (req, res) => {
    res.redirect('/login');
});

// ==================== LOGIN & REGISTER ====================
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth', 'login.html'));
});
app.post('/login', (req, res) => {
    res.redirect('/dashboard-pelapor');
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth', 'register.html'));
});
app.post('/register', (req, res) => {
    res.redirect('/login');
});

// ==================== API DATA LAPORAN ====================
app.get('/api/laporan', (req, res) => {
    db.all(`SELECT * FROM laporan ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// ==================== DASHBOARD PELAPOR ====================
app.get('/dashboard-pelapor', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard-pelapor.html'));
});

// ==================== FORM PELAPORAN ====================
app.get('/form-pelaporan', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form-pelaporan.html'));
});

// SIMPAN DATA FORM & FOTO KE SQLITE
app.post('/laporan', upload.single('foto'), (req, res) => {
    const { kategori, lokasi, deskripsi, urgensi } = req.body;
    // Ambil nama file foto jika ada yang diupload
    const foto = req.file ? req.file.filename : null;

    const query = `INSERT INTO laporan (kategori, lokasi, deskripsi, urgensi, foto) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [kategori, lokasi, deskripsi, urgensi, foto], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Gagal menyimpan laporan.");
        }
        console.log(`Laporan baru berhasil disimpan dengan ID: ${this.lastID}`);
        res.redirect('/dashboard-pelapor');
    });
});

// Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});