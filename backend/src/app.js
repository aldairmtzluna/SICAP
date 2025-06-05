const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde cualquier origen (en desarrollo)
app.use(morgan("dev")); // Muestra logs de las peticiones
app.use(express.json()); // Parsea el body de las peticiones a JSON

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Backend! 🚀");
});

module.exports = app;