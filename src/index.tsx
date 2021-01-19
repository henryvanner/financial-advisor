import React from 'react';
import ReactDOM from 'react-dom';
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites/js/foundation';
import 'foundation-sites/js/foundation.core';
import 'foundation-sites/js/foundation.tabs';
import 'foundation-sites/js/foundation.util.keyboard';
import 'foundation-sites/js/foundation.util.imageLoader';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
