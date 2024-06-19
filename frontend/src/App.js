import React from 'react';
import ListaListas from './components/ListaListas';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Aplicação de Todo List</h1>
      </header>
      <main>
        <ListaListas />
      </main>
    </div>
  );
};

export default App;
