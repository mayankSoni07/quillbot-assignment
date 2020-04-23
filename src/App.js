import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

import Home from "./Home";

class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
