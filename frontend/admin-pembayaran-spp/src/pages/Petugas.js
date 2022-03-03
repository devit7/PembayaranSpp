import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
import GlobalFilter from '../table/petugas.table'
import { PersonPlusFill,TrashFill,PencilFill } from 'react-bootstrap-icons';
import Sidebar from "../components/Sidebar"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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
        level:"ASC",
        order:"",
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
    let data = {
        id_petugas: this.state.id_petugas,
        username: this.state.username,
        password: this.state.password,
        nama_petugas: this.state.nama_petugas,
        level: this.state.level
    }
    let url = base_url + "/petugas"
    if (this.state.action === "insert") {
        axios.post(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            if(response.data.message === "data has been inserted"){
                this.setState(this.createNotification('success'))
            }else{
                this.setState(this.createNotification('error'))
            }
            this.getPetugas()
        })
        .catch(error => console.log(error))
        this.getPetugas()
    } else if(this.state.action === "update"){
        axios.put(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            if(response.data.message === "data has been update"){
                this.setState(this.createNotification('info'))
            }else{
                this.setState(this.createNotification('error'))
            }
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

    
    //edit
    Edit = selectionItem => {
        this.setState({tampilkan:true});
        this.setState({
            action: "update",
            id_petugas: selectionItem.id_petugas,
            username: selectionItem.username,
            password: selectionItem.password,
            nama_petugas: selectionItem.nama_petugas,
            level: selectionItem.level
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

    //drop
    dropPetugas = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/petugas/" + selectionItem.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                console.log(response.data.message)
                if(response.data.message === "data has been destroyed"){
                    this.setState(this.createNotification('warning'))
                }else{
                    this.setState(this.createNotification('error'))
                }
                this.getPetugas()
            })
            .catch(error => console.log(error))
            this.getPetugas()
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
    sorting=(col)=>{
        let data = {
            id_petugas: this.state.id_petugas,
            username: this.state.username,
            password: this.state.password,
            nama_petugas: this.state.nama_petugas,
            level: this.state.level
        }
        if(this.state.order === "ASC"){
            const sorted =[...data].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase()?1:-1
            );
            this.setState({data:sorted})
            this.setState({order:"DSC"})
        }
        if(this.state.order === "DSC"){
            const sorted =[...data].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase()?1:-1
            );
            this.setState({data:sorted})
            this.setState({order:"ASC"})
        }
    }

    componentDidMount(){
        this.getPetugas()
    }


    render(){
        return(
            <div>
                <Sidebar/>

                <div className="container">
                    <br/>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                    <PersonPlusFill/>
                    </button>
                    <NotificationContainer/>
                    <br></br>
                    <br></br>
                    <h3>
        </h3>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr class="filters">
                                <th>No</th>
                                <th scope="col" onClick={()=>this.sorting(this.id_petugas)} >Id</th>
                                <th scope="col">Nama Petugas</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Level</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.petugas.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.username}</td>
                                    <td>{item.password}</td>
                                    <td>{item.level}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            <PencilFill/> Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropPetugas(item)}>
                                            <TrashFill/> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   

                    {/** modal petugas */}
                    <div className="modal fade" id="modal_petugas">
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
                                                <label for="exampleInputPassword1" className="form-label">LEVEL</label>
                                                <select className="form-select" aria-label="Default select example" value={this.state.level} onChange={ev => this.setState({level: ev.target.value})}required>
                                                    <option selected>Open this select menu</option>
                                                    <option value="1">petugas</option>
                                                    <option value="2">admin</option>
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
        )
    }
}
export default Petugas;