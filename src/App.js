import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [counter, setCounter] = useState(0)
  return (
    <div className="counter">
      <p>Счётчик: {counter}</p>

      <button onClick={() => {setCounter(counter + 1)}}>+</button>
      <button onClick={() => {setCounter(counter - 1)}}>-</button>
      <button onClick={() => {setCounter(0)}}>Сброс</button>
    </div>
  )
}

export default App;
