const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  concluida: {
    type: Boolean,
    default: false
  },
  listaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lista',
    required: true
  }
});

module.exports = mongoose.model('Tarefa', TarefaSchema);
