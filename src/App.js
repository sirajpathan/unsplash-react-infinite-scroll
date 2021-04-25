import React, { Component } from 'react';
import Home from './components/Home';
import ImageDetails from './components/ImageDetails';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="container">
          {/* TODO: move this block to separate file */}
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/image/:id">
                  <ImageDetails />
                </Route>
              </Switch>
            </Router>

        </div>
      </div>
    );
  }
}

export default App;
