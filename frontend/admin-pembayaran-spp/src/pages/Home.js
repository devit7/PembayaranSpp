import React from "react"
import axios from "axios"
import { base_url } from "../config.js"
import Sidebar from '../components/Sidebar';
export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            siswa: "",
            petugas:"",
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
    getSiswa=()=>{
        let url = base_url+"/siswa"
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({siswa: response.data.data.length})
            console.log(response.data.data)
          
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })

    }
    getPetugas=()=>{
        let url = base_url+"/petugas"
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({petugas: response.data.data.length})
            console.log(response.data.data)
          
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })

    }
    getStatus=()=>{
        let url = base_url+"/pembayaran/status/Sudah Bayar"
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({sudahbayar: response.data.data.length})
            console.log(response.data.data)
            
        })
        let url1 = base_url+"/pembayaran/status/Belum Bayar"
        axios.get(url1 , this.headerConfig())
        .then(response => {
            this.setState({belumbayar: response.data.data.length})
            console.log(response.data.data)
            
        })
        .catch(error => {
            if (error.response) {
                if(error.response.sudahbayar) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })

    }

    componentDidMount(){
        this.getSiswa()
        this.getPetugas()
        this.getStatus()
    }
    render(){
        return(
            <div>
                 <Sidebar/>

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
                                        <span className="h2 font-weight-bold mb-0">{this.state.siswa}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                            <i className="fas fa-chart-bar"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p class="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-danger mr-2">Jumlah Siswa saat ini</span>
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
                                        <span className="h2 font-weight-bold mb-0">{this.state.petugas}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                            <i className="fas fa-chart-pie"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-warning mr-2">Jumlah Petugas saat ini</span>
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
                                        <span className="text-warning mr-2">Jumlah Sudah Bayar saat ini</span>
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
                                        <span className="text-primary mr-2">Jumlah Belum Bayar saat ini</span>
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

