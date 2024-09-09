import React from 'react';

function Pantalla({ numeroAdivinar, puntaje }) {
  return (
    <div>
      <h2>Número a adivinar: {numeroAdivinar}</h2>
      <p>Puntaje actual: {puntaje}</p>
    </div>
  );
}

export default Pantalla;