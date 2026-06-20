const express = require('express');
const db = require('./database/database');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Sistem Pelaporan Kerusakan Fasilitas Kampus');
});

app.get('/form-pelaporan', (req, res) => {
    res.render('form-pelaporan');
});

app.post('/laporan', (req, res) => {

    const { kategori, lokasi, deskripsi, urgensi } = req.body;

    const query = `
        INSERT INTO laporan
        (kategori, lokasi, deskripsi, urgensi, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [kategori, lokasi, deskripsi, urgensi, 'Dilaporkan'],
        function (err) {

            if (err) {
                console.error(err);
                return res.status(500).send('Error saving report');
            }

            console.log('Report saved successfully');

            res.send('Laporan berhasil dikirim');

        }
    );

});

app.get('/dashboard-pelapor', (req, res) => {

    db.all(
        'SELECT * FROM laporan',
        [],
        (err, rows) => {

            if (err) {
                console.error(err);
                return res.status(500).send('Error mengambil data');
            }

            res.render('dashboard-pelapor', {
                laporan: rows
            });

        }
    );

});

app.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
});