const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// membaca file css, js, image
app.use(express.static('public'));

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
// halaman utama langsung ke login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// halaman login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth', 'login.html'));
});

// halaman register
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth', 'register.html'));
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});