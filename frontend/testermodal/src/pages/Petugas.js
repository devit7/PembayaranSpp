import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
Modal.setAppElement('#root');

class Petugas extends React.Component{
    constructor(){
        super()
        this.state = {
            
            action:"",
            petugas:[],
            id_petugas:"",
            username:"",
            password:"",
            nama_petugas:"",
            level:"",
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
savePetugas = event => {
    event.preventDefault()

    //window.$('#modal_petugas-id').modal("hide");
    this.setState({tampilkan:false});
    const data = {
        id_petugas: this.state.id_petugas,
        username: this.state.username,
        password: this.state.password,
        nama_petugas: this.state.nama_petugas,
        level: this.state.level
    }
    if (this.state.password) {
        data.password = this.state.password
    }
    let url = base_url + "/petugas"
    if (this.state.action === "insert") {
        axios.post(url, data, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPetugas()
        })
        .catch(error => console.log(error))
        console.log(this.data)
    } else if(this.state.action === "update"){
        axios.put(url, data, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPetugas()
        })
        .catch(error => console.log(error))
    }
}
    //add
    Add = () => {
        //$('#modal_petugas-id').modal("show");
        this.setState({tampilkan:true});
        this.setState({
            action: "insert",
            id_petugas: 0,
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
        })
    }
    render(){
        return(
            <div>
              <Navbar/>
                <div>
                <Modal 
                isOpen={this.state.tampilkan}
                onHide={this.handelClose}
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
                    
                <div className="modal-body card-body ">
                                    <form onSubmit={ev => this.savePetugas(ev)}>
                                        USERNAME
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                        />
                                        PASSWORD
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.password}
                                        onChange={ev => this.setState({password: ev.target.value})}
                                        required
                                        />
                                        NAMA PETUGAS
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama_petugas}
                                        onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                        required
                                        />
                                        <label for="exampleInputPassword1" class="form-label">LEVEL</label>
                                        <select class="form-select" aria-label="Default select example" value={this.state.level} onChange={ev => this.setState({level: ev.target.value})}required>
                                            <option value="1">admin</option>
                                            <option value="2">petugas</option>
                                        </select>
                                        <br/>
                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                                
                </Modal>
                <button onClick={()=>this.Add()}>Tambah Petugas</button>
                </div>
            </div>
        )
    }
}
export default Petugas;