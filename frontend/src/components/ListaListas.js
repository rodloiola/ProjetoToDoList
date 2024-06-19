import React, { useState } from 'react';
import PostItLista from './PostItLista';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const ListaListas = () => {
  const [listas, setListas] = useState([]);
  const [tituloLista, setTituloLista] = useState('');

  const adicionarLista = () => {
    if (tituloLista.trim() === '') return; // Evita adicionar lista vazia

    setListas([...listas, { titulo: tituloLista, tarefas: [] }]);
    setTituloLista('');
  };

  const deletarLista = (index) => {
    const novasListas = [...listas];
    novasListas.splice(index, 1);
    setListas(novasListas);
  };

  const editarLista = (index, novoTitulo) => {
    const novasListas = [...listas];
    novasListas[index].titulo = novoTitulo;
    setListas(novasListas);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita submissão do formulário
      adicionarLista();
    }
  };

  return (
    <div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Nome da nova lista"
            value={tituloLista}
            onChange={(e) => setTituloLista(e.target.value)}
            onKeyPress={handleKeyPress} // Captura tecla "Enter"
          />
        </Form.Group>
        <Button variant="primary" onClick={adicionarLista}>
          Adicionar Lista
        </Button>
      </Form>
      <Container>
        <Row>
          {listas.map((lista, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <PostItLista
                titulo={lista.titulo}
                tarefas={lista.tarefas}
                onDeleteLista={() => deletarLista(index)}
                onEditLista={(novoTitulo) => editarLista(index, novoTitulo)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ListaListas;
