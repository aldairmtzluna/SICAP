const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const agentsRoutes = require('./routes/agents.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); 

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Backend! 🚀");
});

app.use('/agents', agentsRoutes); 
app.use('/auth', authRoutes);

module.exports = app;