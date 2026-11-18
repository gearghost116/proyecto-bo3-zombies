const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contacto', (req, res) => {
  const { nombre, email, mensaje } = req.body;
  console.log('📩 Mensaje recibido en el servidor:', { nombre, email, mensaje });

  res.status(201).json({
    exito: true,
    mensajeServidor: `¡Gracias ${nombre}! Tu mensaje fue recibido y procesado en el servidor correctamente.`
  });
});

app.listen(3001, () => {
  console.log('✅ Servidor backend corriendo en http://localhost:3001');
});