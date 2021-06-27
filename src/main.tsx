import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

import { routes } from './routes';
import { store } from './store';

import App from './App';

import './lib/i18n';
import './styles/index.css';
import 'simplebar/dist/simplebar.min.css';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <Suspense fallback="loading">
          <App routes={routes} />
        </Suspense>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
