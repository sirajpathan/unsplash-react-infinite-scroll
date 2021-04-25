import React, { Component } from 'react';
import Images from './components/Images';
import ImageDetails from './components/ImageDetails';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css'
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
            <Router>
              <Switch>
                <Route exact path="/">
                  <Images />
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
