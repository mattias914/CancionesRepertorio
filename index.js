const express = require('express')
const app = express()
const fs = require("fs");

app.listen(3000, console.log("¡Servidor encendido!"))
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index 2.html")
});

app.get('/canciones', (req, res) => {
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  res.json(canciones);
});

app.get('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  const cancion = canciones.find(cancion => cancion.id === parseInt(id));
  if (cancion) {
    res.json(cancion);
  } else {
    res.status(404).json({ error: 'Canción no encontrada' });
  }
});


app.post('/canciones', (req, res) => {
  const { id, titulo, artista, tono } = req.body;
  const nuevaCancion = { id, titulo, artista, tono };
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  canciones.push(nuevaCancion);
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.status(201).json(nuevaCancion);
});

app.put('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, artista, tono } = req.body;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  const index = canciones.findIndex(cancion => cancion.id === parseInt(id));
  if (index !== -1) {
    canciones[index] = { id, titulo, artista, tono };
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.json(canciones[index]);
  } else {
    res.status(404).json({ error: 'Canción no encontrada' });
  }
});


app.delete('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  const index = canciones.findIndex(p => p.id === id)
  canciones.splice(index, 1)
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.json({ message: 'Canción eliminada' });
});

