import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors'; 

const app = express();
const db = new sqlite3.Database('../pokedex/pokemon.db');

app.use(express.json());
app.use(cors()); 

app.post('/add-pokemon', (req, res) => {
    const { buildName, buildPokemon } = req.body;

    const sql = `INSERT INTO builds (name, type, nature, ability, item, moves, evs, ivs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const moves = '["' + buildPokemon.moves.map(m => m.name.toLowerCase().replace(/[^a-z]/g, "")).join('","') + '"]';

    db.run(sql, [buildPokemon.name, buildName, buildPokemon.nature, 
                 buildPokemon.ability.name.toLowerCase().replace(/[^a-z]/g, ""), 
                 buildPokemon.item.name.toLowerCase().replace(/[^a-z]/g, ""), 
                 moves, JSON.stringify(buildPokemon.evs), null], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Pokemon added", id: this.lastID });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
