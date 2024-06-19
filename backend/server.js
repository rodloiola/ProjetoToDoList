const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Conexão com MongoDB estabelecida com sucesso");
});

// Rotas
const listasRouter = require('./routes/listasRoutes');
const tarefasRouter = require('./routes/tarefasRoutes');
app.use('/api/listas', listasRouter);
app.use('/api/tarefas', tarefasRouter);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta: ${port}`);
});
