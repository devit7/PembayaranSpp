import React from "react"
import {Link} from "react-router-dom"
export default class Logout extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render(){
        return(
        <a onClick={() => this.Logout()}>Logout</a>
            
    );

    }
}
