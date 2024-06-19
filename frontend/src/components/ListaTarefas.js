import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ListaTarefas = ({ tarefa, onDelete, onEdit }) => {
  const [concluida, setConcluida] = useState(tarefa.concluida);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(tarefa.nome);

  const toggleConcluida = () => {
    setConcluida(!concluida);
  };

  const toggleEditando = () => {
    setEditando(!editando);
  };

  const handleEdit = () => {
    onEdit(nome);
    toggleEditando();
  };

  return (
    <div className={`tarefa ${concluida ? 'concluida' : ''}`}>
      {editando ? (
        <Form.Control
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      ) : (
        <Form.Check
          type="checkbox"
          label={nome}
          checked={concluida}
          onChange={toggleConcluida}
        />
      )}
      <Button variant="danger" onClick={onDelete}>X</Button>
      <Button variant="secondary" onClick={toggleEditando}>
        {editando ? 'Salvar' : 'Editar'}
      </Button>
    </div>
  );
};

export default ListaTarefas;
