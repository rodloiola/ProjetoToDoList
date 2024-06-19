import React, { useState, useEffect } from 'react';
import ListaTarefas from './ListaTarefas';
import axios from 'axios';

const ListaListas = () => {
  const [listas, setListas] = useState([]);
  const [novaListaTitulo, setNovaListaTitulo] = useState('');
  const [novaListaDescricao, setNovaListaDescricao] = useState('');

  useEffect(() => {
    fetchListas();
  }, []);

  const fetchListas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/listas');
      setListas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCriarLista = async () => {
    try {
      await axios.post('http://localhost:5000/api/listas', {
        titulo: novaListaTitulo,
        descricao: novaListaDescricao
      });
      fetchListas(); // Atualiza a lista de listas após a criação
      setNovaListaTitulo('');
      setNovaListaDescricao('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletarLista = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/listas/${id}`);
      fetchListas(); // Atualiza a lista de listas após a deleção
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Listas</h2>
      <ul>
        {listas.map((lista) => (
          <li key={lista._id}>
            {lista.titulo} - {lista.descricao}
            <button onClick={() => handleDeletarLista(lista._id)}>Deletar</button>
            {/* Adicione o componente ListaTarefas e passe o id da lista como prop */}
            <ListaTarefas listaId={lista._id} />
          </li>
        ))}
      </ul>
      <h3>Nova Lista</h3>
      <input
        type="text"
        placeholder="Título"
        value={novaListaTitulo}
        onChange={(e) => setNovaListaTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={novaListaDescricao}
        onChange={(e) => setNovaListaDescricao(e.target.value)}
      />
      <button onClick={handleCriarLista}>Criar Lista</button>
    </div>
  );
};

export default ListaListas;
