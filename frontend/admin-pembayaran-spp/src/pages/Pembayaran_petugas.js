import React from "react"
import { base_url } from "../config"
import $, { event } from "jquery";
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
import Sidebar_petugas from "../components/sidebar_petugas/Sidebar"
import { PersonPlusFill,TrashFill,PencilFill } from 'react-bootstrap-icons';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
Modal.setAppElement('#root');
class Pembayaran_petugas extends React.Component{
    constructor(){
        super()
        this.state = {
            
            action:"",
            pembayaran:[],
            petugas:[],
            siswa:[],
            id_pembayaran:"",
            id_petugas:"",
            nisn:"",
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
    
    savePembayaran = event => {
        event.preventDefault()
    
        //window.$('#modal_petugas-id').modal("hide");
        this.setState({tampilkan:false});
        const data = {
            id_pembayaran: this.state.id_pembayaran,
            id_petugas: this.state.id_petugas,
            nisn: this.state.nisn,
            tgl_bayar: this.state.tgl_bayar,
            bulan_spp: this.state.bulan_spp,
            tahun_spp:this.state.tahun_spp,
            status:this.state.status
        }
    
        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
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
        } else if(this.state.action === "update"){
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
    }
        //add
        Add = () => {
            //$('#modal_petugas-id').modal("show");
            this.setState({tampilkan:true});
            this.setState({
                action: "insert",
                id_pembayaran:0,
                id_petugas:"",
                nisn:"",
                tgl_bayar:"",
                bulan_spp:"",
                tahun_spp:"",
                status:""
            })
        }
    
        
        //edit
        Edit = selectionItem => {
            this.setState({tampilkan:true});
            this.setState({
                action: "update",
                id_pembayaran: selectionItem.id_pembayaran,
                id_petugas:selectionItem.id_petugas,
                nisn:selectionItem.nisn,
                tgl_bayar:selectionItem.tgl_bayar,
                bulan_spp:selectionItem.bulan_spp,
                tahun_spp:selectionItem.tahun_spp,
                status:selectionItem.status
            })
        }
        getSiswa=()=>{
            let url = base_url+"/siswa"
            axios.get(url , this.headerConfig())
            .then(response => {
                this.setState({siswa: response.data.data})
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
                this.setState({petugas: response.data.data})
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
    generateArrayOfYears=()=> {
        // let max = new Date().getFullYear()
        // let min = max - 9
        // let years = []
      
        // for (let i = max; i >= min; i--) {
        //   years.push(i)
        // }
        // console.log("ini tahun"+years)
        console.log(this.state.pembayaran)
        function isCherries(pembayaran) { 
            return this.state.pembayaran.tahun_spp === 2020;
          }
        console.log("show"+this.state.pembayaran.find(isCherries))
      }
        componentDidMount(){
            this.getPembayaran()
            this.getPetugas()
            this.getSiswa()
            this.generateArrayOfYears()
        }
    
        render(){
            return(
                <div>
                    <Sidebar_petugas/>
                    <div className="container">
                    <br/><br/>
                    <div class="card shadow-lg rounded">
                    <h5 class="card-header ">Pages Pembayaran</h5>
                    <div class="card-body">
    
                        <button className="btn btn-success" onClick={() => this.Add()}>
                        <PersonPlusFill/> add
                        </button>
                        <form className="float-end"> 
                        <input className="" id="myInput" type="text" placeholder="Search.." value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={this.getPembayaran} />
                        <select id="selectby" value={this.state.orderby} onChange={ev => this.setState({orderby: ev.target.value})} onClick={this.getPembayaran}>
                            <option value='id_pembayaran'>id pembayaran</option>
                            <option value='nisn'>nisn</option>
                            <option value='status'>status</option>
                        </select>
                        </form>
                        <NotificationContainer/>
                        <br></br>
                        <br></br>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Id Pembayaran</th>
                                    <th>Id Petugas</th>
                                    <th>Nisn</th>
                                    <th>Tgl Bayar</th>
                                    <th>Bulan Bayar</th>
                                    <th>Tahun Bayar</th>
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
                                            <button className="btn btn-sm btn-info m-1"
                                            onClick={() => this.Edit(item)}>
                                              <PencilFill/>  Edit
                                            </button>
    
                                            <button className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.dropPembayaran(item)}>
                                              <TrashFill/>  Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                       
    
                        {/** modal petugas */}
                        <div className="modal fade" id="modal_pembayaran">
                        <Modal 
                            isOpen={this.state.tampilkan}
                            contentLabel="Minimal Modal Example"
                            style={{
                                content: {
                                    border: '0',
                                    borderRadius: '4px',
                                    bottom: 'auto',
                                    minHeight: '10rem',
                                    left: '50%',
                                    padding: '2rem',
                                    position: 'fixed',
                                    right: 'auto',
                                    top: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    minWidth: '20rem',
                                    width: '30%',
                                    maxWidth: '60rem'
                                }
                                }
                            }
                        >
                            <ModalHeader>
                            <h4>Form Petugas</h4>
                            <CloseButton onClick={this.handelClose}/>
                            </ModalHeader>
                                    <div className="modal-body">
                                        <form onSubmit={ev => this.savePembayaran(ev)}>
                                            <label className="form-label">Id Petugas</label>
                                                <select select class="form-select" aria-label="Default select example"  value={this.state.id_petugas} onChange={ev => this.setState({id_petugas: ev.target.value})}required>
                                                        {this.state.petugas.map((item, index) => (
                                                        <option value={item.id_petugas}>{item.id_petugas} - {item.nama_petugas}</option>
                                                        ))}
                                                </select>
                                            <label className="form-label">Nisn</label>
                                                <select select class="form-select" aria-label="Default select example"  value={this.state.nisn} onChange={ev => this.setState({nisn: ev.target.value})}required>
                                                        {this.state.siswa.map((item, index) => (
                                                        <option value={item.nisn} >{item.nisn} - {item.nama}</option>
                                                        ))}
                                                </select>
                                                <label className="form-label">Tanggal Bayar</label>
                                            <select class="form-select" aria-label="Default select example" value={this.state.tgl_bayar}
                                            onChange={ev => this.setState({tgl_bayar: ev.target.value})}
                                            required>
                                                <option selected>Open this select menu</option>
                                                <option >1</option>
                                                <option >2</option>
                                                <option >3</option>
                                                <option >4</option>
                                                <option >5</option>
                                                <option >6</option>
                                                <option >7</option>
                                                <option >8</option>
                                                <option >9</option>
                                                <option >10</option>
                                                <option >11</option>
                                                <option >12</option>
                                                <option >13</option>
                                                <option >14</option>
                                                <option >15</option>
                                                <option >16</option>
                                                <option >17</option>
                                                <option >18</option>
                                                <option >19</option>
                                                <option >20</option>
                                                <option >21</option>
                                                <option >22</option>
                                                <option >23</option>
                                                <option >24</option>
                                                <option >25</option>
                                                <option >26</option>
                                                <option >27</option>
                                                <option >28</option>
                                                <option >29</option>
                                                <option >30</option>
                                                <option >31</option>
                                            </select>
                                            <label className="form-label">Bulan Bayar</label>
                                                <select select class="form-select" aria-label="Default select example"  value={this.state.bulan_spp}
                                            onChange={ev => this.setState({bulan_spp: ev.target.value})}
                                            required>
                                                <option selected>Open this select menu</option>
                                                <option >1</option>
                                                <option >2</option>
                                                <option >3</option>
                                                <option >4</option>
                                                <option >5</option>
                                                <option >6</option>
                                                <option >7</option>
                                                <option >8</option>
                                                <option >9</option>
                                                <option >10</option>
                                                <option >11</option>
                                                <option >12</option>
                                            </select>
                                            <label className="form-label">Tahun Bayar</label>
                                                <select select class="form-select" aria-label="Default select example"  value={this.state.tahun_spp}
                                            onChange={ev => this.setState({tahun_spp: ev.target.value})}
                                            required>
                                                <option selected>Open this select menu</option>
                                                <option >2020</option>
                                                <option >2021</option>
                                                <option >2022</option>
                                                <option >2023</option>
                                                <option >2024</option>
                                                <option >2025</option>
                                                <option >2026</option>
                                                <option >2027</option>
                                                <option >2028</option>
                                                <option >2029</option>
                                                <option >2030</option>
                                            </select>
                                            <label for="exampleInputPassword1" className="form-label">Status</label>
                                            <select className="form-select" aria-label="Default select example" value={this.state.status} onChange={ev => this.setState({status: ev.target.value})}required>
                                                        <option selected>Open this select menu</option>
                                                        <option >Sudah Bayar</option>
                                                        <option >Belum Bayar</option>
                                            </select>
                                            <br/>
                                            <button type="submit" className="btn btn-block btn-success">
                                                Simpan
                                            </button>
                                        </form>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
            )
        }
}
export default Pembayaran_petugas;