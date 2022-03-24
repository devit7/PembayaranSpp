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
            tahun: "",
            bulan:"",
            belumbayar:"",
            sudahbayar:"",
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
    getPembayaran=()=>{
        const d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        this.setState({tahun: year})
        this.setState({bulan: month})
    let url = base_url+"/pembayaran/tahun_spp/"+year+"/"+month+"/Sudah Bayar"
    axios.get(url , this.headerConfig())
    .then(response => {
        this.setState({sudahbayar: response.data.data.length})
        console.log(this.state.sudahbayar)
    })
    let url1 = base_url+"/pembayaran/tahun_spp/"+year+"/"+month+"/Belum Bayar"
    axios.get(url1 , this.headerConfig())
    .then(response => {
        this.setState({belumbayar: response.data.data.length})
        console.log(this.state.belumbayar)
    })
    .catch(error => {
        if (error.response) {
            if(error.response.status) {
                window.alert(error.response.data.message)
                this.props.history.push("/login")
            }
        }else{
            console.log('data show')
            console.log(this.state.filter)
            console.log(error);
        }
    })
}
componentDidMount(){
    this.getPembayaran()
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
                                        <h5 className="card-title text-uppercase text-muted mb-0">Tahun</h5>
                                        <span className="h2 font-weight-bold mb-0">{this.state.tahun}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                            <i className="fas fa-chart-bar"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p class="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-nowrap">Since last year</span>
                                    </p>
                                    </div>
                                </div>
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                <div className="card card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-muted mb-0">Bulan</h5>
                                        <span className="h2 font-weight-bold mb-0">{this.state.bulan}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                            <i className="fas fa-chart-pie"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
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
                                        <h5 className="card-title text-uppercase text-muted mb-0">Lunas</h5>
                                        <span className="h2 font-weight-bold mb-0">{this.state.sudahbayar}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                            <i className="fas fa-users"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
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
                                        <h5 className="card-title text-uppercase text-muted mb-0">Tunggakan</h5>
                                        <span className="h2 font-weight-bold mb-0">{this.state.belumbayar}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                            <i className="fas fa-percent"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
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
                            <p></p>
                            </div>
                        </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

