const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db');

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS laporan (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            kategori TEXT,
            lokasi TEXT,
            deskripsi TEXT,
            urgensi TEXT,
            status TEXT
        )
    `);

});

module.exports = db;