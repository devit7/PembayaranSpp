import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import Sidebar from '../components/Sidebar';
export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login";
        }
    }
    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    render(){
        return(
            <div>
                <Sidebar/>
                <div className="container mt-2">
                    <h3 className="my-2 ">
                        <h4 className="light">home page</h4>
                    </h3>
                   
                </div>
            </div>
        )
    }
}

