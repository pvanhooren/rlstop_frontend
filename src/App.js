import React from 'react';
import logo from './logo.svg';
import './App.css';
import Overview from "./components/Overview/Overview";
import NewTradeForm from "./components/NewTradeForm/NewTradeForm";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import People from "./components/People/People";
import Demo from "./components/Demo/Demo";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
      <Navbar />
      <Switch>

            <Route exact from="/" component={Overview}/>} />
            <Route exact path="/new" component={NewTradeForm}/>} />
            <Route exact path="/people" component={People}/>
            <Route exact path="/demo" component={Demo}/>} />
            <Route component={NotFound}/>

        {/*<Route exact path="/about" render="./components/Overview/Overview" />} />*/}
      </Switch>
      </Router>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
