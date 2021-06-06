import React, { Component } from 'react';
import { render } from 'react-dom';
import IApp from './src/App';
import './style.css';
import { Provider } from 'react-redux'
import store from './src/redux-toolkit'
// import store from './src/redux-og'

interface AppProps { }

function App<AppProps>() {
  return (
    <Provider store={store}>
      <IApp />
    </Provider>
  );
}

render(<App />, document.getElementById('root'));
