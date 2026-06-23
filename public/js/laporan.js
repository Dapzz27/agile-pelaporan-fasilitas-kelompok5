const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/laporan/daftar-laporan.html')
    );
});

router.get('/detail/:id', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../views/laporan/detail-laporan.html')
    );
});

module.exports = router;