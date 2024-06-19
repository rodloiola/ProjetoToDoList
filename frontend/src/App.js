import React from 'react';
import ListaListas from './components/ListaListas';
import './App.sass';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Aplicação de Lista de Tarefas</h1>
      </header>
      <main>
        <ListaListas />
      </main>
    </div>
  );
};

export default App;
