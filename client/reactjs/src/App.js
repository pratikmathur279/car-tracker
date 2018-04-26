import React, { Component } from 'react';
import logo from './logo.svg';
import Vehicle from './Components/Vehicle/Vehicle';
import Alert from './Components/Alert/Alert';
import Map from './Components/Map/Map';
import Analytic from './Components/Analytic/Analytic';
import './App.css';
import {Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 name="heading" id="heading">Welcome to Car Tracker</h2>
        </div>
          <Route exact path="/" component={Vehicle}/>
          <Route path="/alerts/:vin" component={Alert}/>
          <Route path="/map/:vin" component={Map}/>
          <Route path="/analytics/:vin" component={Analytic}/>
      </div>
    );
  }
}

export default App;
