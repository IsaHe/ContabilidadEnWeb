const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());

let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.post('/transacciones', (req, res) => {
  const { concepto, importe, dia_id } = req.body;

  db.run(`INSERT INTO Transacciones (concepto, valor, dia_id) VALUES (?, ?, ?)`, [concepto, importe, dia_id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ message: 'Transacción guardada con éxito' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});