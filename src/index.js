// React based stuff
import React from 'react';
import ReactDOM from 'react-dom';

// Main app module
import App from './App';

// Styles
import './styles.scss';

// Fetch polifill
import 'whatwg-fetch';

ReactDOM.render(<App />, document.getElementById('app'));
