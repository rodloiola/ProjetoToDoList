import React, { useState } from 'react';
import ListaTarefas from './ListaTarefas';
import { Card, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import './PostItLista.sass';

const cores = ['#ffeb3b', '#3f51b5', '#ff5722', '#f44336', '#4caf50', '#2196f3', '#dfccfb'];

const PostItLista = ({ titulo, tarefas, onDeleteLista, onEditLista }) => {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState(tarefas || []);
  const [cor, setCor] = useState('#ffeb3b'); // Amarelo padrão
  const [mostrandoInputTarefa, setMostrandoInputTarefa] = useState(false);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setListaTarefas([...listaTarefas, { nome: novaTarefa, concluida: false }]);
      setNovaTarefa('');
      setMostrandoInputTarefa(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarTarefa();
    }
  };

  const deletarTarefa = (index) => {
    const novasTarefas = [...listaTarefas];
    novasTarefas.splice(index, 1);
    setListaTarefas(novasTarefas);
  };

  const editarTarefa = (index, novaTarefa) => {
    const novasTarefas = [...listaTarefas];
    novasTarefas[index] = novaTarefa;
    setListaTarefas(novasTarefas);
  };

  return (
    <Card className="post-it-lista" style={{ backgroundColor: cor }}>
      <Card.Body>
        <div className="post-it-header">
          <h5 className="post-it-title" onClick={() => onEditLista(titulo)}>{titulo}</h5>
          <button className="delete-lista-btn" onClick={onDeleteLista}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="post-it-content">
          {listaTarefas.map((tarefa, index) => (
            <ListaTarefas
              key={index}
              tarefa={tarefa}
              onDelete={() => deletarTarefa(index)}
              onEdit={(novaTarefa) => editarTarefa(index, novaTarefa)}
            />
          ))}
        </div>
        {mostrandoInputTarefa ? (
          <div className="add-tarefa">
            <Form.Control
              type="text"
              placeholder="Nova Tarefa"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              className="input-add"
              onKeyPress={handleKeyPress}
              onBlur={adicionarTarefa}
              autoFocus
            />
          </div>
        ) : (
          <span className="btn-add" onClick={() => setMostrandoInputTarefa(true)}>+</span>
        )}
      </Card.Body>
      <div className="post-it-footer">
        <DropdownButton id="dropdown-button" title="" className="cor-btn">
          {cores.map((corOpcao) => (
            <Dropdown.Item key={corOpcao} onClick={() => setCor(corOpcao)}>
              <div style={{ backgroundColor: corOpcao, width: '100%', height: '20px' }}></div>
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </Card>
  );
};

export default PostItLista;
