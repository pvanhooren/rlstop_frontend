import React from 'react';
import logo from './logo.svg';
import TradeOverview from "./components/TradeOverview/TradeOverview";
import NewTradeForm from "./components/NewTradeForm/NewTradeForm";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import PeopleOverview from "./components/PeopleOverview/PeopleOverview";
import Demo from "./components/Demo/Demo";
import WishlistEditor from "./components/WishlistEditor/WishlistEditor";
import UserTrades from "./components/UserTrades/UserTrades";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">

      <Router>
      <Navbar />
      <Switch>
            <Route exact from="/" component={TradeOverview}/>} />
            <Route exact path="/new" component={NewTradeForm}/>} />
            <Route exact path="/people" component={PeopleOverview}/>
            <Route exact path="/demo" component={Demo}/>} />
            <Route exact path="/me/wishlist" component={WishlistEditor}/>} />
            <Route exact path="/me/trades" component={UserTrades}/>} />
            <Route exact path="/me/settings" component={Settings}/>} />
            <Route exact path="/me/login" component={Login}/>}/>
            <Route exact path="/me/register" component={Register}/>}/>
            <Route component={NotFound}/>

        {/*<Route exact path="/about" render="./components/TradeOverview/TradeOverview" />} />*/}
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
