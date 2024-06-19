import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaTarefas = ({ listaId }) => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState('');

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tarefas?listaId=${listaId}`);
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
      fetchTarefas(); // Atualiza a lista de tarefas após a criação
      setNovaTarefaDescricao('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletarTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tarefas/${id}`);
      fetchTarefas(); // Atualiza a lista de tarefas após a deleção
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Tarefas da Lista</h3>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa._id}>
            {tarefa.descricao} - {tarefa.concluida ? 'Concluída' : 'Pendente'}
            <button onClick={() => handleDeletarTarefa(tarefa._id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nova Tarefa"
        value={novaTarefaDescricao}
        onChange={(e) => setNovaTarefaDescricao(e.target.value)}
      />
      <button onClick={handleCriarTarefa}>Adicionar Tarefa</button>
    </div>
  );
};

export default ListaTarefas;
