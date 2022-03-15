import React from "react"
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import Petugas from "./pages/Petugas";
import Kelas from "./pages/Kelas";
import Spp from "./pages/Spp";
import Siswa from "./pages/Siswa";
import Pembayaran from "./pages/Pembayaran";
import Logout from "./components/Logout";
import Home_petugas from "./pages/Home_petugas";
import Home_siswa from "./pages/Home_siswa";
import Pembayaran_petugas from "./pages/Pembayaran_petugas"
import Login_siswa from "./pages/Login_siswa";
export default class App extends React.Component{
  render(){
    return (
      <Router>
        
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home_petugas" component={Home_petugas}/>
            <Route path="/home_siswa" component={Home_siswa}/>
            <Route path="/login" component={Login} />
            <Route path="/login_siswa" component={Login_siswa} />
            <Route path="/petugas" component={Petugas}/>
            <Route path="/kelas" component={Kelas}/>
            <Route path="/spp" component={Spp} />
            <Route path="/siswa" component={Siswa}/>
            <Route path="/pembayaran" component={Pembayaran}/>
            <Route path="/pembayaran_petugas" component={Pembayaran_petugas}/>
            <Route path="/logout" component={Logout}/>
          </Switch>
      </Router>
    )
  }
}


