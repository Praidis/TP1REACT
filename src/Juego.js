import React, { useState } from 'react';
import Pantalla from './Pantalla';

function Juego() {
  const [numeroAdivinar, setNumeroAdivinar] = useState(Math.floor(Math.random() * 100) + 1);
  const [puntaje, setPuntaje] = useState(10);

  return (
    <div>
      <Pantalla numeroAdivinar={numeroAdivinar} puntaje={puntaje} />
    </div>
  );
}

export default Juego;