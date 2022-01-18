import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config"
import $ from "jquery"
import axios from "axios"
import PetugasList from "../components/PetugasList"

class Petugas extends React.Component{
    constructor(){
        super()
        this.state = {
            petugas: [],
            token: "",
            action: "",
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillPassword: true,
            id_petugas: "",
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    //untuk akses token
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, {headers:{ 
            Authorization: "Bearer " + this.state.token
        }})
        .then(response => {
            this.setState({petugas: response.data})
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

    Add = () => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillPassword: true
        })
    }

    Edit = selectedItem => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: 0,
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillPassword: false,
        })
    }

    savePetugas = event => {
        event.preventDefault()
        $("#modal_petugas").modal("hide")
        let form = new FormData()
        form.append("id_petugas", this.state.id_petugas)
        form.append("username", this.state.username)
        form.append("password", this.state.password)
        form.append("nama_petugas", this.state.nama_petugas)
        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }
        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, {headers:{ 
            Authorization: "Bearer " + this.state.token
        }})
            .then(response => {
                // window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, {headers:{ 
            // Authorization: "Bearer " + this.state.token
        }})
            .then(response => {
                // window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }
    
    dropPetugas = selectedItem => {
        if (window.confirm("Yakin nih dihapus?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, {headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
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
                <h3 className="text-bold text-info mt-2">petugas List</h3>
                <div className="row">
                    { this.state.petugas.map( item => (
                        < PetugasList
                            key = {item.id_petugas}
                            username = {item.username}
                            password = {item.password}
                            nama_petugas = {item.nama_petugas}
                            level = { item.level }
                            onEdit = {() => this.Edit(item)}
                            onDrop = {() => this.dropPetugas(item)}
                        />
                    ))}
                </div>
                <button className="btn btn-success" onClick={() => this.Add()}>
                    Add customer
                </button>
            </div>

            {/* modal customer 1 */}
            <div class="modal fade" id="modal_petugas" tabindex="-1" aria-labelledby="modal_petugasLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal_petugasLabel">Form customer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={ev => this.savePetugas(ev)}>
                            <div class="modal-body">
                                
                                Username
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Name" 
                                    value={this.state.username}
                                    onChange={ev => this.setState({username: ev.target.value})}
                                    required/>
                                </div>
                                
                                Password
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" placeholder="Phone" 
                                    value={this.state.password}
                                    onChange={ev => this.setState({password: ev.target.value})}
                                    required/>
                                </div>
                                
                                Nama Petugas
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Address" 
                                    value={this.state.nama_petugas}
                                    onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                    required/>
                                </div>

                                Level
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Address" 
                                    value={this.state.level}
                                    onChange={ev => this.setState({level: ev.target.value})}
                                    required/>
                                </div>
                                

                                { this.state.action === "update" && this.state.fillPassword === false ? (
                                    <button type="button" class="btn btn-secondary m-2"
                                        onClick={() => this.setState({fillPassword: true})}>
                                        Change Password
                                    </button>
                                ) : (
                                    <div>
                                        Password
                                        <input type="password" className="form-control mb-1"
                                            value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Petugas;