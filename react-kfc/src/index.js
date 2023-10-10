import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {store} from '../src/redux/store'

import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '60px',
  transition: transitions.FADE
}

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
