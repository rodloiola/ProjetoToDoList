const express = require('express');
const router = express.Router();
const Lista = require('../models/Lista');

// Listar todas as listas
router.get('/', async (req, res) => {
  try {
    const listas = await Lista.find().populate('tarefas');
    res.json(listas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar listas' });
  }
});

// Criar uma nova lista
router.post('/', async (req, res) => {
  const { titulo, descricao } = req.body;

  try {
    const novaLista = new Lista({ titulo, descricao });
    await novaLista.save();
    res.status(201).json(novaLista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar lista' });
  }
});

// Deletar uma lista
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Lista.findByIdAndDelete(id);
    res.json({ mensagem: 'Lista deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao deletar lista' });
  }
});

module.exports = router;
