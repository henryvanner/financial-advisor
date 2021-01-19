import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import SelectRiskPreference from './pages/SelectRiskPreference';
import Layout from './components/Layout';
import GiveAdvice from './pages/GiveAdvice';

function App() {

	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/">
						<Redirect to="/selectRiskPreference" />
					</Route>
					<Route path="/selectRiskPreference">
						<SelectRiskPreference />
					</Route>
					<Route path="/advise">
						<GiveAdvice />
					</Route>
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
