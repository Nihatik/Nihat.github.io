const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/save-build', (req, res) => {
    const buildData = req.body;

    const db = new sqlite3.Database('pokedex/pokemon.db');

    db.run(`INSERT INTO builds (name, type, nature, ability, item, moves, evs) VALUES (?, ?, ?, ?, ?, ?, ?)`, [buildData.name, buildData.type, buildData.nature, buildData.ability, buildData.item, buildData.moves, buildData.evs], function(err) {
        if (err) {
            console.error('Error occurred while inserting data:', err.message);
            res.status(500).send('Error occurred while saving build');
            return;
        }
        console.log(`Build saved successfully with ID: ${this.lastID}`);
        res.status(200).send('Build saved successfully');
        db.close(); // Close database connection after the operation is completed
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});