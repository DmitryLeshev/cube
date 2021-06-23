import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import { store } from './store';

import Application from './Application';

import './lib/i18n';
import './styles/index.css';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback="loading">
        <Application routes={routes} />
      </Suspense>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
