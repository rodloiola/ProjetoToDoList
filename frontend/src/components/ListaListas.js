import React, { useState, useEffect } from 'react';
import ListaTarefas from './ListaTarefas';
import axios from 'axios';

const ListaListas = () => {
  const [listas, setListas] = useState([]);
  const [novaListaTitulo, setNovaListaTitulo] = useState('');
  const [novaListaDescricao, setNovaListaDescricao] = useState('');
  const [editandoListaId, setEditandoListaId] = useState(null);

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
      fetchListas();
      setNovaListaTitulo('');
      setNovaListaDescricao('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarLista = async () => {
    try {
      await axios.put(`http://localhost:5000/api/listas/${editandoListaId}`, {
        titulo: novaListaTitulo,
        descricao: novaListaDescricao
      });
      fetchListas();
      setNovaListaTitulo('');
      setNovaListaDescricao('');
      setEditandoListaId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const iniciarEdicao = (lista) => {
    setNovaListaTitulo(lista.titulo);
    setNovaListaDescricao(lista.descricao);
    setEditandoListaId(lista._id);
  };

  const handleDeletarLista = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/listas/${id}`);
      fetchListas();
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
            <button onClick={() => iniciarEdicao(lista)}>Editar</button>
            <button onClick={() => handleDeletarLista(lista._id)}>Deletar</button>
            <ListaTarefas listaId={lista._id} />
          </li>
        ))}
      </ul>
      <h3>{editandoListaId ? 'Editar Lista' : 'Nova Lista'}</h3>
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
      <button onClick={editandoListaId ? handleEditarLista : handleCriarLista}>
        {editandoListaId ? 'Editar Lista' : 'Criar Lista'}
      </button>
    </div>
  );
};

export default ListaListas;
