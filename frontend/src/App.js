import React from 'react';
import ListaListas from './components/ListaListas';
import './App.sass';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginBottom: '20px' }}></div> {/* Espaço entre título e componente ListaListas */}
      </header>
      <main>
        <ListaListas />
      </main>
    </div>
  );
};

export default App;
