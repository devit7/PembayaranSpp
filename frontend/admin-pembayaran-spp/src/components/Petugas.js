import React from "react"
import axios from "axios"
import { base_url } from "../config.js"
export default class Petugas extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            adminsCount: 0
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
    getPetugas = () => {
        let admin = JSON.parse(localStorage.getItem('petugas'))
        this.setState({adminName: admin.nama_petugas})
    }
    componentDidMount(){

        this.getPetugas()

    }
    render(){
        return(
            <div>
                
                <div className="container mt-2">
                    <h3 className="my-2 ">
                        <h4 className="light">{this.state.adminName}</h4>
                    </h3>
                   
                </div>
            </div>
        )
    }
}
