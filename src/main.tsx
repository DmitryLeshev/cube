import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Application from './lib/application';

import { routes } from './routes';
import { store } from './store';
import { AppContext } from './contexts';

import App from './App';

import './lib/i18n';
import './styles/index.css';
import 'simplebar/dist/simplebar.min.css';

const application = new Application({ store });
Object.assign(window, { app: application });
// store.dispatch({ type: '[app] change variant settingbar' });
const app = (
  <Provider store={store}>
    <AppContext.Provider value={{ application }}>
      <BrowserRouter>
        <Suspense fallback="loading">
          <App routes={routes} />
        </Suspense>
      </BrowserRouter>
    </AppContext.Provider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
