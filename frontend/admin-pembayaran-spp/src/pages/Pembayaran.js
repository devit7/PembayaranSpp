import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config"
import $, { event } from "jquery";
import axios from "axios"


class Pembayaran extends React.Component{
constructor(){
    super()
    this.state = {
        
        action:"",
        pembayaran:[],
        id_pembayaran:"",
        id_petugas:"",
        nisn:"",
        tgl_bayar:"",
        bulan_spp:"",
        tahun_spp:"",
        status:""
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

savePembayaran = event => {
    event.preventDefault()

    //window.$('#modal_petugas-id').modal("hide");
     $("#modal_pembayaran").modal("hide")
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
            window.alert(response.data.message)
            this.getPembayaran()
        })
        .catch(error => console.log(error))
        console.log(this.data)
    } else if(this.state.action === "update"){
        axios.put(url, data, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getPembayaran()
        })
        .catch(error => console.log(error))
    }
}
    //add
    Add = () => {
        //$('#modal_petugas-id').modal("show");
        $("#modal_pembayaran").modal("show")
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
        $("#modal_pembayaran").modal("show")
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


    getPembayaran=()=>{
        let url = base_url+"/pembayaran"
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({pembayaran: response.data.data})
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
    dropPembayran = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/pembayaran/" + selectionItem.id_pembayaran
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getPembayaran()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Pembayaran List</h3>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Pembayaran
                    </button>
                    <br></br>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
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
                            {this.state.pembayaran.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.nisn}</td>
                                    <td>{item.tgl_bayar}</td>
                                    <td>{item.bulan_spp}</td>
                                    <td>{item.tahun_spp}</td>
                                    <td>{item.satus}</td>
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
                    <div className="modal fade" id="modal_pembayaran">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Pembayaran</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.savePembayaran(ev)}>
                                        Id Petugas
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.id_petugas}
                                        onChange={ev => this.setState({id_petugas: ev.target.value})}
                                        required
                                        />
                                        Nisn
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nisn}
                                        onChange={ev => this.setState({nisn: ev.target.value})}
                                        required
                                        />
                                        NAMA PETUGAS
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama_petugas}
                                        onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                        required
                                        />
                                        LEVEL
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.level}
                                        onChange={ev => this.setState({level: ev.target.value})}
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
export default Pembayaran;