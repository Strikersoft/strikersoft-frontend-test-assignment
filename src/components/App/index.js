import React, { Component } from 'react';
import MainPage from './../MainPage';
import './style.scss';

class App extends Component {
	render() {

		return (
			<div className={` container-fluid`} style={{ backgroundColor: "#eef0f7", paddingBottom: 50 }}>
				<div className="wrapper">					
					<div  id="logo" className="center-block"><img src="images/strikersoft.svg" /> </div>
					<MainPage />
				</div>
			</div>
		);
	}
}

export default App;
