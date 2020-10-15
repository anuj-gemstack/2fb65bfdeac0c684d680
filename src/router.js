import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home'
import WeatherReport from './weatherReport'

export default function router() {
  return (
    <Router>
      <Switch>
      <Route path="/weather" component={WeatherReport}/>
      <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}
