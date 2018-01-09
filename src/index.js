// React based stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Main app module
import App from './components/App';
import store from './store';

// Styles

import './styles.scss';

// Fetch polifill
import 'whatwg-fetch';

ReactDOM.render(<Provider store={store}>
    <App />
</Provider> , document.getElementById('app'));
