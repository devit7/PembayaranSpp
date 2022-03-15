import React from "react"
import axios from "axios"
import { base_url } from "../config.js"
import Sidebar_petugas from "../components/sidebar_petugas/Sidebar"
import '../css/home.css'
export default class Home_petugas extends React.Component{
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
                <Sidebar_petugas/>

                <br/>
                <div className="container mt-2">
                    <div className="main-content">
                        <div className="header bg-gradient-primary pb-8 pt-5 pt-md-7">
                        <div className="container-fluid">
                            <h2 className="mb-5 text-white">Stats Card</h2>
                            <div className="header-body">
                            <div className="row">
                                <div className="col-xl-3 col-lg-6">
                                <div className="card card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">Siswa</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                            <i className="fas fa-chart-bar"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p class="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                    </div>
                                </div>
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                <div className="card card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">Petugas</h5>
                                        <span className="h2 font-weight-bold mb-0">2,356</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                            <i className="fas fa-chart-pie"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span>
                                        <span className="text-nowrap">Since last week</span>
                                    </p>
                                    </div>
                                </div>
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                <div className="card card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">Lunas</h5>
                                        <span className="h2 font-weight-bold mb-0">924</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                            <i className="fas fa-users"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-warning mr-2"><i className="fas fa-arrow-down"></i> 1.10%</span>
                                        <span className="text-nowrap">Since yesterday</span>
                                    </p>
                                    </div>
                                </div>
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                <div className="card card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">Tunggakan</h5>
                                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i className="fas fa-percent"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-success mr-2"><i className= "fa-arrow-up"></i> 12%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    <footer className="footer">
                        <div className="row align-items-center justify-content-xl-between">
                        <div className="col-xl-6 m-auto text-center">
                            <div className="copyright">
                            <p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
                            </div>
                        </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

