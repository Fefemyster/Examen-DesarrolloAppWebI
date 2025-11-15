const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

let libros = [];

app.get("/libros", (req, res) => {
  res.json({ status: 200, message: "success", data: libros });
});

app.post("/libros", (req, res) => {
  const nuevoLibro = req.body;
  nuevoLibro.id = parseInt(nuevoLibro.id);
  libros.push(nuevoLibro);
  res.json({ status: 200, message: "exitoso", data: libros });
});

app.put("/libros/:id", (req, res) => {
  const libroUpt = req.body;
  const id = parseInt(req.params.id);
  let exists = false;

  libros.forEach((cbook) => {
    if (cbook.id === id) {
      exists = true;
      cbook.titulo = libroUpt.titulo;
      cbook.autor = libroUpt.autor;
      cbook.anioPublicacion = libroUpt.anioPublicacion;
      cbook.estado = libroUpt.estado;
    }
  });

  if (exists) {
    res.json({
      status: 200,
      message: "Libro actualizado correctamente",
      data: libroUpt,
    });
  } else {
    res.status(404).json({ status: 404, message: "Libro no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
