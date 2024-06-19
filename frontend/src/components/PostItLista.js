import React, { useState } from 'react';
import ListaTarefas from './ListaTarefas';
import { Card, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import './PostItLista.sass';

const cores = ['#ffeb3b', '#3f51b5', '#ff5722', '#f44336', '#4caf50', '#2196f3', '#dfccfb'];

const PostItLista = ({ titulo, tarefas, onDeleteLista, onEditLista }) => {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState(tarefas);
  const [cor, setCor] = useState('#ffeb3b'); // Amarelo padrão

  const adicionarTarefa = () => {
    setListaTarefas([...listaTarefas, { nome: novaTarefa, concluida: false }]);
    setNovaTarefa('');
  };

  const deletarTarefa = (index) => {
    const novasTarefas = [...listaTarefas];
    novasTarefas.splice(index, 1);
    setListaTarefas(novasTarefas);
  };

  const editarTarefa = (index, nome) => {
    const novasTarefas = [...listaTarefas];
    novasTarefas[index].nome = nome;
    setListaTarefas(novasTarefas);
  };

  return (
    <Card className="post-it-lista" style={{ backgroundColor: cor }}>
      <Card.Body>
        <Card.Title>
          {titulo}
          <Button variant="danger" onClick={onDeleteLista}>X</Button>
          <Button variant="secondary" onClick={onEditLista}>Editar</Button>
        </Card.Title>
        {listaTarefas.map((tarefa, index) => (
          <ListaTarefas
            key={index}
            tarefa={tarefa}
            onDelete={() => deletarTarefa(index)}
            onEdit={(nome) => editarTarefa(index, nome)}
          />
        ))}
        <Form.Control
          type="text"
          placeholder="Nova Tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <Button variant="primary" onClick={adicionarTarefa}>
          Adicionar Tarefa
        </Button>
        <DropdownButton id="dropdown-basic-button" title="Mudar Cor">
          {cores.map((cor) => (
            <Dropdown.Item key={cor} onClick={() => setCor(cor)}>
              <div style={{ backgroundColor: cor, width: '100%', height: '20px' }}></div>
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Card.Body>
    </Card>
  );
};

export default PostItLista;
