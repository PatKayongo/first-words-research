import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './index.css';
import { AppContainer } from 'react-hot-loader'

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextRootContainer = require('./App.jsx').default;
    render(
      <AppContainer>
        <NextRootContainer />
      </AppContainer>, 
      document.getElementById('root'));
  })
 }