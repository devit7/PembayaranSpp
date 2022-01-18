import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import Petugas from "./pages/Petugas";


export default class App extends React.Component{
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/petugas" component={Petugas}/>
      </Switch>
  
    )
  }
}


