import React from "react"
import {Link} from "react-router-dom"
export default class Logout extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        localStorage.removeItem("petugas")
        localStorage.removeItem("siswa")
        window.location = "/login"
    }
    render(){
        return(
        <a onClick={() => this.Logout()}>Logout</a>
            
    );

    }
}
