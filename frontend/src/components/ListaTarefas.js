import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const ListaTarefas = ({ tarefa, onDelete, onEdit }) => {
  const [concluida, setConcluida] = useState(tarefa?.concluida || false);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(tarefa?.nome || '');

  const toggleConcluida = () => {
    setConcluida(!concluida);
    if (onEdit) {
      onEdit({ ...tarefa, concluida: !concluida });
    }
  };

  const handleNomeClick = () => {
    setEditando(true);
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleNomeBlur = () => {
    setEditando(false);
    if (onEdit && nome !== tarefa.nome) {
      onEdit({ ...tarefa, nome });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNomeBlur();
    }
  };

  return (
    <div className={`tarefa ${concluida ? 'concluida' : ''}`}>
      <Form.Check
        type="checkbox"
        checked={concluida}
        onChange={toggleConcluida}
        label={
          editando ? (
            <Form.Control
              type="text"
              value={nome}
              onChange={handleNomeChange}
              onBlur={handleNomeBlur}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          ) : (
            <span onClick={handleNomeClick}>{nome}</span>
          )
        }
      />
      <button className="delete-tarefa-btn" onClick={onDelete}>
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
};

export default ListaTarefas;
