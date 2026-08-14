import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Homepage } from './pages/Home';
import './styles/global.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Homepage />
    </Provider>
  </StrictMode>
);