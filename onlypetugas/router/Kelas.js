import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config"
import $, { event } from "jquery";
import axios from "axios"


class Kelas extends React.Component{
constructor(){
    super()
    this.state = {
        
        action:"",
        kelas:[],
        id_kelas:"",
        nama_kelas:"",
        jurusan:"",
        angkatan:""
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

saveKelas = event => {
    event.preventDefault()

    //window.$('#modal_petugas-id').modal("hide");
     $("#modal_kelas").modal("hide")
    const data = {
        id_kelas: this.state.id_kelas,
        nama_kelas: this.state.nama_kelas,
        jurusan: this.state.jurusan,
        angkatan: this.state.angkatan
    }
    if (this.state.nama_kelas) {
        data.nama_kelas = this.state.nama_kelas
    }
    let url = base_url + "/kelas"
    if (this.state.action === "insert") {
        axios.post(url, data, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getKelas()
        })
        .catch(error => console.log(error))
        console.log(this.data)
    } else if(this.state.action === "update"){
        axios.put(url, data, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getKelas()
        })
        .catch(error => console.log(error))
    }
}
    //add
    Add = () => {
        //$('#modal_petugas-id').modal("show");
        $("#modal_kelas").modal("show")
        this.setState({
            action: "insert",
            id_kelas: 0,
            nama_kelas: "",
            jurusan: "",
            angkatan: ""
        })
    }

    
    //edit
    Edit = selectionItem => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "update",
            id_kelas: selectionItem.id_kelas,
            nama_kelas: selectionItem.nama_kelas,
            jurusan: selectionItem.jurusan,
            angkatan: selectionItem.angkatan,
            fillPassword: false
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

    //drop
    dropKelas = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/kelas/" + selectionItem.id_kelas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getKelas()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Petugas List</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name Kelas</th>
                                <th>Jurusan</th>
                                <th>Angkatan</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.kelas.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.jurusan}</td>
                                    <td>{item.angkatan}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropKelas(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Kelas
                    </button>

                    {/** modal kelas */}
                    <div className="modal fade" id="modal_kelas">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Kelas</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveKelas(ev)}>
                                        Nama Kelas
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama_kelas}
                                        onChange={ev => this.setState({nama_kelas: ev.target.value})}
                                        required
                                        />
                                        Jurusan
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.jurusan}
                                        onChange={ev => this.setState({jurusan: ev.target.value})}
                                        required
                                        />
                                        Angkatan
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.angkatan}
                                        onChange={ev => this.setState({angkatan: ev.target.value})}
                                        required
                                        />
                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
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
export default Kelas;