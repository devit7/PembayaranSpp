import React from "react"
import { base_url } from "../config"
import $, { event } from "jquery";
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
import Sidebar from "../components/Sidebar"
import { PersonPlusFill,TrashFill,CurrencyDollar } from 'react-bootstrap-icons';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
Modal.setAppElement('#root');
class Pembayaran extends React.Component{
constructor(){
    super()
    this.state = {
        
        action:"",
        pembayaran:[],
        petugas:[],
        siswa:[],
        id_pembayaran:"",
        id_petugas:null,
        nisn:[],
        tgl_bayar:"",
        bulan_spp:"",
        tahun_spp:[],
        status:"",
        orderby:"id_pembayaran",
        keyword:"",
        filter:[],
        tampilkan:false
    }
    this.handelClose=this.handelClose.bind(this)
    if(localStorage.getItem("token")){
        this.state.token = localStorage.getItem("token")
    }else{
        window.location = "/login"
    }
    this.headerConfig.bind(this)
}

headerConfig = () => {
    let header = {
        headers: { Authorization: `Bearer ${this.state.token}`}
        
    }
    return header
    
}
handelClose(){
    this.setState({tampilkan:false})
}

    //add
    Add = () => {
        //$('#modal_petugas-id').modal("show");
        const d = new Date();
        let year = d.getFullYear();
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        for (var i=0; i<this.state.siswa.length; i++) {
            this.state.siswa[i].checked = false
                const data ={
                    id_petugas: null,
                    nisn:this.state.siswa[i].nisn,
                    bulan_spp:mm,
                    tahun_spp:year,
                    status:"Belum Bayar"
                }
                let url = base_url + "/pembayaran"
                axios.post(url, data, this.headerConfig())
                .then(response => {
                    console.log(response.data.message)
                    if(response.data.message === "data has been inserted"){
                        this.setState(this.createNotification('success'))
                    }else{
                        this.setState(this.createNotification('error'))
                    }
                    this.getPembayaran()
                })
                .catch(error => console.log(error))
                this.getPembayaran()
                console.log(this.data)
            
        }
    }

    //edit
    Edit = selectionItem => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        if(admin === null){
            window.location = "/login";
        }
        let adminName= admin.id_petugas
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        const data={
            id_pembayaran: selectionItem.id_pembayaran,
            id_petugas:adminName,
            tgl_bayar: dd,
            status:"Sudah Bayar"
        }
        let url = base_url + "/pembayaran"
        axios.put(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            if(response.data.message === "data has been update"){
                this.setState(this.createNotification('info'))
            }else{
                this.setState(this.createNotification('error'))
            }
            this.getPembayaran()
        })
        this.getPembayaran()
        .catch(error => console.log(error))
    }
    getSiswa=()=>{
        let url = base_url+"/siswa"
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({siswa: response.data.data})
            console.log(this.state.siswa)
          
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
    getPembayaran=()=>{
        if((this.state.keyword === null)||(this.state.keyword === undefined)||(this.state.keyword === "")){
            let url = base_url+"/pembayaran"
            axios.get(url , this.headerConfig())
            .then(response => {
                this.setState({filter: response.data.data})
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
        }else{
            let url = base_url + "/pembayaran/"+this.state.orderby+"/" + this.state.keyword
            axios.get(url , this.headerConfig())
            .then(response => {
                this.setState({filter: response.data.data})
                console.log(response.data.data)
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

            console.log('test')
        }

    }

    //drop
    dropPembayaran = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/pembayaran/" + selectionItem.id_pembayaran
            axios.delete(url, this.headerConfig())
            .then(response => {
                console.log(response.data.message)
                if(response.data.message === "data has been destroyed"){
                    this.setState(this.createNotification('warning'))
                }else{
                    this.setState(this.createNotification('error'))
                }
                this.getPembayaran()
            })
            .catch(error => console.log(error))
            this.getPembayaran()
        }
    }
    createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('data has been update','Successfully Update');
              break;
            case 'success':
              NotificationManager.success('data has been inserted', 'Successfully Add');
              break;
            case 'warning':
              NotificationManager.warning('data has been destroyed', 'Successfully Delete', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
    }
}
    componentDidMount(){
        this.getPembayaran()
        this.getSiswa()
    }

    render(){
        return(
            <div>
                <Sidebar/>
                <div className="container">
                <br/><br/>
                <div class="card shadow-lg rounded">
                <h5 class="card-header ">Pages Pembayaran</h5>
                <div class="card-body">
                    <button className="btn btn-outline-success" onClick={() => this.Add()}>
                    <PersonPlusFill/> add
                    </button>
                    {/* <form className="float-end"> 
                    <input className="" id="myInput" type="text" placeholder="Search.." value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={this.getPembayaran} />
                    <select id="selectby" value={this.state.orderby} onChange={ev => this.setState({orderby: ev.target.value})} onClick={this.getPembayaran}>
                        <option value='id_pembayaran'>id pembayaran</option>
                        <option value='nisn'>nisn</option>
                        <option value='status'>status</option>
                    </select>
                    </form> */}
                    <form className="float-end">
                    <div class="row">
                        <div class="col">
                        <input className="form-control " id="myInput" type="text" placeholder="Search.." value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={this.getPembayaran} />
                    </div>
                    <div class="col">
                    <select id="selectby" class="form-select"style={({width: '150px'})} value={this.state.orderby} onChange={ev => this.setState({orderby: ev.target.value})} onClick={this.getPembayaran}>
                        <option value='id_pembayaran'>id pembayaran</option>
                            <option value='nisn'>nisn</option>
                            <option value='status'>status</option>
                        </select>
                        </div>
                    </div> 
                    </form>
                    <NotificationContainer/>
                    </div>
                </div>
                <br/>
                <div class="card shadow-lg rounded">
                <div class="card-body">
                    <table className="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Id Pembayaran</th>
                                <th>Id Petugas</th>
                                <th>Nisn</th>
                                <th>Tgl Bayar</th>
                                <th>Spp Bulan</th>
                                <th>Spp Tahun</th>
                                <th>Status</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filter.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id_pembayaran}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.nisn}</td>
                                    <td>{item.tgl_bayar}</td>
                                    <td>{item.bulan_spp}</td>
                                    <td>{item.tahun_spp}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btn btn-outline-success"
                                        onClick={() => this.Edit(item)}>
                                          <CurrencyDollar/>  Bayar
                                        </button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-outline-danger"
                                        onClick={() => this.dropPembayaran(item)}>
                                          <TrashFill/>  Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Pembayaran;