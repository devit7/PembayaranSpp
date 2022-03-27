import React, { useState } from "react"
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
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
        level:"",
        orderby:"id_petugas",
        keyword:"",
        filter:[],
        moment:[{ id_petugas: 0, nama_petugas: "", username: "", password: "", createdAt: "", updatedAt: "" }],
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

    //drop
    dropPetugas = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/petugas/" + selectionItem.id_petugas
            console.log(selectionItem.id_petugas)
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

getPetugas=()=>{
            if((this.state.keyword === null)||(this.state.keyword === undefined)||(this.state.keyword === "")){
                let url = base_url+"/petugas"
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
                let url = base_url + "/petugas/"+this.state.orderby+"/" + this.state.keyword
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
    componentDidMount(){
        this.getPetugas()
    }

    render(){
        return(
            <div>
            <Sidebar/>

            <div className="container">
            <NotificationContainer/>
            <br/><br/>
            <div class="card shadow-lg rounded">
            <h5 class="card-header">Pages Petugas</h5>
            <div class="card-body">
                    <button className="btn btn-outline-success" onClick={() => this.Add()}>
                    <PersonPlusFill/> add
                    </button>
                    <form className="float-end">
                        <div class="row">
                            <div class="col">
                            <input className="form-control " id="myInput" type="text" placeholder="Search.." value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={this.getPetugas} />
                        </div>
                        <div class="col">
                        <select id="selectby" class="form-select"style={({width: '150px'})} value={this.state.orderby} onChange={ev => this.setState({orderby: ev.target.value})} onClick={this.getPetugas}>
                                <option value='id_petugas'>id petugas</option>
                                <option value='level'>level</option>
                                <option value='username'>username</option>
                                <option value='nama_petugas'>nama petugas</option>
                            </select>
                            </div>
                        </div> 
                    </form>
                </div>
                </div>
                <br/>
                <div class="card shadow-lg rounded">
                <div class="card-body">
                    
                    {/* <form className="floa">
                        <input class="form-control w-25" type="text" placeholder="Search" aria-label="Search"/>
                        <select class="form-select " aria-label="Default select example" style={({width: '200px'})}>
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                    </form> */}
                    
                    
                    <table className="table table-bordered border-primary">
                        <thead className=" ">
                            <tr class="filters">
                                <th>No</th>
                                <th scope="col" >Id Petugas</th>
                                <th scope="col">Nama Petugas</th>
                                <th scope="col">Username</th>
                                <th scope="col">Level</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody >
                            {this.state.filter.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.username}</td>
                                    <td>{item.level}</td>
                                    <td>
                                        <button className="btn btn-outline-primary"
                                        onClick={() => this.Edit(item)}>
                                            <PencilFill/> Edit
                                        </button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-outline-danger"
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
                                                    <option >petugas</option>
                                                    <option >admin</option>
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
export default Petugas;