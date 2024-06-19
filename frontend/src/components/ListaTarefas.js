import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaTarefas = ({ listaId }) => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState('');
  const [editandoTarefaId, setEditandoTarefaId] = useState(null);

  useEffect(() => {
    fetchTarefas();
  }, [listaId]);

  const fetchTarefas = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tarefas/lista/${listaId}`);
      setTarefas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCriarTarefa = async () => {
    try {
      await axios.post('http://localhost:5000/api/tarefas', {
        descricao: novaTarefaDescricao,
        listaId: listaId
      });
      fetchTarefas();
      setNovaTarefaDescricao('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarTarefa = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tarefas/${editandoTarefaId}`, {
        descricao: novaTarefaDescricao
      });
      fetchTarefas();
      setNovaTarefaDescricao('');
      setEditandoTarefaId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const iniciarEdicao = (tarefa) => {
    setNovaTarefaDescricao(tarefa.descricao);
    setEditandoTarefaId(tarefa._id);
  };

  const handleDeletarTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tarefas/${id}`);
      fetchTarefas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Tarefas</h3>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa._id}>
            {tarefa.descricao}
            <button onClick={() => iniciarEdicao(tarefa)}>Editar</button>
            <button onClick={() => handleDeletarTarefa(tarefa._id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h4>{editandoTarefaId ? 'Editar Tarefa' : 'Nova Tarefa'}</h4>
      <input
        type="text"
        placeholder="Descrição"
        value={novaTarefaDescricao}
        onChange={(e) => setNovaTarefaDescricao(e.target.value)}
      />
      <button onClick={editandoTarefaId ? handleEditarTarefa : handleCriarTarefa}>
        {editandoTarefaId ? 'Editar Tarefa' : 'Criar Tarefa'}
      </button>
    </div>
  );
};

export default ListaTarefas;
