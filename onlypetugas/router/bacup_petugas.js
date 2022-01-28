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

    savePetugas = event => {
        event.preventDefault()
        // console.log("ini save")
        // $("#modal_petugas").modal("hide")
        let form = new FormData()
        form.append("id_petugas", this.state.id_petugas)
        form.append("username", this.state.username)
        form.append("password", this.state.password)
        form.append("nama_petugas", this.state.nama_petugas)
        form.append("level",this.state.level)
        console.log(form)
        // let url = base_url + "/petugas"
        // // console.log(url)
        // // if (this.state.action === "insert") {
        //     axios.post(url, form, {headers:{ 
        //     Authorization: "Bearer " + this.state.token
        // }})
        //     .then(response => {
        //         // window.alert(response.data.message)
        //         // this.getPetugas()
        //         console.log("berhasil");
        //     })
        //     .catch(error => console.log(error))
        // } else if(this.state.action === "update") {
        //     axios.put(url, form, {headers:{ 
        //     // Authorization: "Bearer " + this.state.token
        // }})
        //     .then(response => {
        //         // window.alert(response.data.message)
        //         // this.getPetugas()
        //         console.log("gagal")
        //     })
        //     .catch(error => console.log(error))
        // }
    }

    save = event => {
        event.preventDefault()
        console.log("ini save")
    }
    
    componentDidMount(){
        this.getPetugas()
    }
    
    render(){
        return(
        <div>
            <Navbar />
            <div className="container" id="modal_petugas">
                <h3 className="text-bold text-info mt-2">Tambah Petugas</h3>
                <div className="card-body col-sm-3 card my-5">
                <form onSubmit={ev=>this.savePetugas(ev)}>
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
        )
    }
}
export default Petugas;