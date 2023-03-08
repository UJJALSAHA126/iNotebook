import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';


function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Home />
        <Switch>

          <Route path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
