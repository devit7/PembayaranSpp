import React from "react"
import axios from "axios"
import { base_url } from "../config.js"
import Sidebar_siswa from "../components/sidebar_siswa/Sidebar"
import '../css/home.css'
import DataTable from 'react-data-table-component';
export default class Home_siswa extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            admin : JSON.parse(localStorage.getItem('siswa')),
            adminName: null,
            adminsCount: 0,
            pembayaran:[],
            spp:[],
            kelas:[],
            columns:[{
                name: 'Tgl Bayar',
                selector: row => row.tgl_bayar,
                sortable: true,
            },
            {
                name: 'Bulan Bayar',
                selector: row => row.bulan_spp,
                sortable: true,
            },
            {
                name: 'Tahun Bayar',
                selector: row => row.tahun_spp,
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
            },]
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
        let url = base_url+"/pembayaran/nisn/"+this.state.admin.nisn
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({pembayaran: response.data.data})
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
    getSpp=()=>{
        let url = base_url+"/spp/"+this.state.admin.id_spp
        console.log(this.state.admin.id_spp)
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({spp: response.data.data})
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
    getKelas=()=>{
        let url = base_url+"/kelas/"+this.state.admin.id_kelas
        console.log(this.state.admin.id_kelas)
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({kelas: response.data.data})
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
    componentDidMount(){
    this.getPembayaran()
    this.getSpp()
    this.getKelas()
    }
    render(){
        return(
            <div>
                <Sidebar_siswa/>
                <div className="container">

                <br/><br/>
                <table class="table table-striped table-secondary shadow-lg rounded ">
                <thead>
                    <tr>
                    <th scope="col">Nisn</th>
                    <th scope="col">Nis</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Kelas</th>
                    <th scope="col">Angkatan</th>
                    <th scope="col">Spp</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{this.state.admin.nisn}</td>
                    <td>{this.state.admin.nis}</td>
                    <td>{this.state.admin.nama}</td>
                    <td>{this.state.kelas.nama_kelas}</td>
                    <td>{this.state.kelas.angkatan}</td>
                    <td>{this.state.spp.nominal}</td>
                    </tr>
                </tbody>
                </table>
                
                <div class="card shadow-lg rounded ">
                <h5 class="card-header ">Detail Status Pembayaran</h5>
                <div class="card-body"/>
                <DataTable
                        columns={this.state.columns}
                        data={this.state.pembayaran}
                        pagination
                        highlightOnHover
		                pointerOnHover
                    />
                </div>
                </div>
            </div>
        )
    }
}

