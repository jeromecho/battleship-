import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './styles/app.css';
import './styles/login.css';
import './styles/game.css';
import './styles/gameboard.css';
import './styles/shipsplacer.css';
import Logic from './logic/logic.js';
import App from './components/app.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

