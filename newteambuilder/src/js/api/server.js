const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Подключение к базе данных
const db = new sqlite3.Database('../../../data/teams.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    
    // Создание таблиц если они не существуют
    db.run(`CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS team_pokemon (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team_id INTEGER,
      pokemon_data TEXT NOT NULL,
      FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS builds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pokemon_name TEXT NOT NULL,
      build_name TEXT NOT NULL,
      build_data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

app.use(express.json());
app.use(cors()); 

// API endpoints
app.get('/api/teams', (req, res) => {
  db.all(`SELECT t.*, GROUP_CONCAT(tp.pokemon_data) as pokemon
          FROM teams t
          LEFT JOIN team_pokemon tp ON t.id = tp.team_id
          GROUP BY t.id`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/teams', (req, res) => {
  const { name, pokemon } = req.body;
  db.run('INSERT INTO teams (name) VALUES (?)', [name], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const teamId = this.lastID;
    const stmt = db.prepare('INSERT INTO team_pokemon (team_id, pokemon_data) VALUES (?, ?)');
    pokemon.forEach(p => stmt.run([teamId, JSON.stringify(p)]));
    stmt.finalize();
    res.json({ id: teamId });
  });
});

app.delete('/api/teams/:id', (req, res) => {
  db.run('DELETE FROM teams WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Team deleted' });
  });
});

app.get('/api/builds/:pokemonName', (req, res) => {
  db.all('SELECT * FROM builds WHERE pokemon_name = ?', [req.params.pokemonName], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/builds', (req, res) => {
  const { pokemon_name, build_name, build_data } = req.body;
  db.run('INSERT INTO builds (pokemon_name, build_name, build_data) VALUES (?, ?, ?)',
    [pokemon_name, build_name, JSON.stringify(build_data)],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
