const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(cors());

let db = new sqlite3.Database('../datos/Contabilidad', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.get('/transacciones', (req, res) => {
    const { inicio, fin, tiendaId } = req.query;

    db.all(`SELECT * FROM Transacciones WHERE fecha BETWEEN ? AND ? AND tienda_id = ?`, [inicio, fin, tiendaId], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ message: 'Error al obtener los datos' });
        } else {
            res.send(rows);
        }
    });
});

app.post('/dias', (req, res) => {
  const { fecha, balance_transacciones, tienda_id } = req.body;

  db.run(`INSERT INTO Dias (fecha, balance_transacciones, tienda_id) VALUES (?, ?, ?)`, [fecha, balance_transacciones, tienda_id], function(err) {
    if (err) {
      return console.log(err.message + ' ' + err.stack);
    }
    res.send({ message: 'Día guardado con éxito' });
  });
});

app.post('/transacciones', (req, res) => {
  const {id, concepto, importe, fecha, tiendaId } = req.body;

  db.run(`INSERT INTO Transacciones (id, concepto, valor, fecha, tienda_id) VALUES (?, ?, ?, ?, ?)`, [id, concepto, importe, fecha, tiendaId], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ message: 'Transacción guardada con éxito' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('http://localhost:3000');
});