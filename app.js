const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Sistem Pelaporan Kerusakan Fasilitas Kampus');
});

app.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
});