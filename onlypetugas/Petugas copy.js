import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config"
import $, { event } from "jquery";
import axios from "axios"


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
        level:""
    }
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

savePetugas = event => {
    event.preventDefault()

    //window.$('#modal_petugas-id').modal("hide");
     $("#modal_petugas").modal("hide")
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
        $("#modal_petugas").modal("show")
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
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectionItem.id_petugas,
            username: selectionItem.username,
            password: selectionItem.password,
            nama_petugas: selectionItem.nama_petugas,
            level: selectionItem.level,
            fillPassword: false
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
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
            console.log(this.state.token);
            console.log(this.headerConfig())
            console.log(this.id_petugas)
        }
    }

    componentDidMount(){
        this.getPetugas()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Petugas List</h3>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Petugas
                    </button>
                    <br></br>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama Petugas</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.petugas.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropPetugas(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   

                    {/** modal petugas */}
                    <div className="modal fade" id="modal_petugas">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Petugas</h4>
                                </div>
                                <div className="modal-body card-body col-sm-3 card my-5">
                                    <form onSubmit={event => this.savePetugas(event)}>
                                    <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Username</label>
                                    <input type="text" class="form-control" aria-describedby="emailHelp" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}required/>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control"  value={this.state.password} onChange={ev => this.setState({password: ev.target.value})}required/>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Nama Petugas</label>
                                    <input type="text" class="form-control" value={this.state.nama_petugas} onChange={ev => this.setState({nama_petugas: ev.target.value})}required/>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Level</label>
                                    <select class="form-select" aria-label="Default select example" value={this.state.level} onChange={ev => this.setState({level: ev.target.value})}required>
                                        <option value="1">admin</option>
                                        <option value="2">petugas</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">Add Petugas</button>
                                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Petugas;