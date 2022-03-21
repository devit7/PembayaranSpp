import React from "react"
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
import Sidebar from "../components/Sidebar"
import { PersonPlusFill,TrashFill,PencilFill } from 'react-bootstrap-icons';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
Modal.setAppElement('#root');


class Siswa extends React.Component{
constructor(){
    super()
    this.state = {
        
        action:"",
        siswa:[],
        kelas:[],
        spp:[],
        nisn:"",
        nis:"",
        nama:"",
        id_kelas:"",
        alamat:"",
        no_tlp:"",
        id_spp:"",
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
saveSiswa = event => {
    event.preventDefault()

    //window.$('#modal_petugas-id').modal("hide");
    this.setState({tampilkan:false});
    let data = {
        nisn: this.state.nisn,
        nis: this.state.nis,
        nama: this.state.nama,
        id_kelas: this.state.id_kelas,
        alamat: this.state.alamat,
        no_tlp:this.state.no_tlp,
        id_spp: this.state.id_spp
    }
    let url = base_url + "/siswa"
    if (this.state.action === "insert") {
        axios.post(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            if(response.data.message === "data has been inserted"){
                this.setState(this.createNotification('success'))
            }else{
                this.setState(this.createNotification('error'))
            }
            this.getSiswa()
        })
        .catch(error => console.log(error))
        this.getSiswa()
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
            this.getSiswa()
        })
        this.getPetugas()
        .catch(error => console.log(error))
    }
}
    //add
    Add = () => {
        //$('#modal_petugas-id').modal("show");
        this.setState({tampilkan:true});
        this.setState({
            action: "insert",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_tlp:"",
            id_spp:""
        })
    }

    
    //edit
    Edit = selectionItem => {
        this.setState({tampilkan:true});
        this.setState({
            action: "update",
            nisn: selectionItem.nisn,
            nis: selectionItem.nis,
            nama: selectionItem.nama,
            id_kelas: selectionItem.id_kelas,
            alamat: selectionItem.alamat,
            no_tlp:selectionItem.no_tlp,
            id_spp:selectionItem.id_spp
        })
    }

    getKelas=()=>{
        let url = base_url+"/kelas"
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
    getSpp=()=>{
        let url = base_url+"/spp"
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

    //drop
    dropSiswa = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/siswa/" + selectionItem.nisn
            axios.delete(url, this.headerConfig())
            .then(response => {
                console.log(response.data.message)
                if(response.data.message === "data has been destroyed"){
                    this.setState(this.createNotification('warning'))
                }else{
                    this.setState(this.createNotification('error'))
                }
                this.getSiswa()
            })
            .catch(error => console.log(error))
            this.getSiswa()
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
        this.getSiswa()
        this.getKelas()
        this.getSpp()
    }

    render(){
        return(
            <div>
                <Sidebar/>
                <div className="container">
                <br/><br/>
                <div class="card shadow-lg rounded">
                <h5 class="card-header ">Pages Siswa</h5>
                <div class="card-body">

                    <button className="btn btn-success" onClick={() => this.Add()}>
                    <PersonPlusFill/> add
                    </button>
                    <NotificationContainer/>
                    <br></br>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nisn</th>
                                <th>Nis</th>
                                <th>Nama</th>
                                <th>Id kelas</th>
                                <th>Alamat</th>
                                <th>No Tlp</th>
                                <th>Id Spp</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.siswa.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nisn}</td>
                                    <td>{item.nis}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.id_kelas}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.no_tlp}</td>
                                    <td>{item.id_spp}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                          <PencilFill/>  Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropSiswa(item)}>
                                          <TrashFill/>  Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   

                    {/** modal petugas */}
                    <div className="modal fade" id="modal_siswa">
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
                        <h4>Form Siswa</h4>
                        <CloseButton onClick={this.handelClose}/>
                        </ModalHeader>             
                     
                                <div className="modal-body  card-body">
                                    <form onSubmit={ev => this.saveSiswa(ev)}>
                                        Nisn
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.nisn}
                                        onChange={ev => this.setState({nisn: ev.target.value})}
                                        required
                                        />
                                        Nis
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.nis}
                                        onChange={ev => this.setState({nis: ev.target.value})}
                                        required
                                        />
                                        Nama
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({nama: ev.target.value})}
                                        required
                                        />
                                        <label className="form-label">Id kelas</label>
                                            <select select class="form-select" aria-label="Default select example"  value={this.state.id_kelas} onChange={ev => this.setState({id_kelas: ev.target.value})}required>
                                                    {this.state.kelas.map((item, index) => (
                                                    <option >{item.id_kelas}</option>
                                                    ))}
                                            </select>
                                        Alamat
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.alamat}
                                        onChange={ev => this.setState({alamat: ev.target.value})}
                                        required
                                        />
                                        No tlp
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.no_tlp}
                                        onChange={ev => this.setState({no_tlp: ev.target.value})}
                                        required
                                        />
                                        <label className="form-label">Id spp</label>
                                            <select select class="form-select" aria-label="Default select example"  value={this.state.id_spp} onChange={ev => this.setState({id_spp: ev.target.value})}required>
                                                    {this.state.spp.map((item, index) => (
                                                    <option >{item.id_spp}</option>
                                                    ))}
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
export default Siswa;