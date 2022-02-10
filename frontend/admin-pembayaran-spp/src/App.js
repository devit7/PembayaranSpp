import React from "react"
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import Petugas from "./pages/Petugas";
import Kelas from "./pages/Kelas";
import Spp from "./pages/Spp";
import Siswa from "./pages/Siswa";
import Pembayaran from "./pages/Pembayaran";
import Sidebar from './components/Sidebar';


export default class App extends React.Component{
  render(){
    return (
      <Router>
        <Sidebar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/petugas" component={Petugas}/>
            <Route path="/kelas" component={Kelas}/>
            <Route path="/spp" component={Spp} />
            <Route path="/siswa" component={Siswa}/>
            <Route path="/pembayaran" component={Pembayaran}/>
          </Switch>
      </Router>
    )
  }
}


