const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  tarefas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tarefa'
  }]
});

module.exports = mongoose.model('Lista', ListaSchema);
