const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');

// Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
});

// Criar uma nova tarefa
router.post('/', async (req, res) => {
  const { descricao, listaId } = req.body;

  try {
    const novaTarefa = new Tarefa({ descricao, listaId });
    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
});

// Deletar uma tarefa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Tarefa.findByIdAndDelete(id);
    res.json({ mensagem: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao deletar tarefa' });
  }
});

module.exports = router;
