import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
import Sidebar from "../components/Sidebar"

Modal.setAppElement('#root');


class Spp extends React.Component{
constructor(){
    super()
    this.state = {
        
        action:"",
        spp:[],
        id_spp:"",
        angkatan:"",
        tahun:"",
        nominal:"",
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
saveSpp = event => {
    event.preventDefault()

    //window.$('#modal_petugas-id').modal("hide");
    this.setState({tampilkan:false});
    const data = {
        id_spp: this.state.id_spp,
        angkatan: this.state.angkatan,
        tahun: this.state.tahun,
        nominal: this.state.nominal
    }
    if (this.state.angkatan) {
        data.angkatan = this.state.angkatan
    }
    let url = base_url + "/spp"
    if (this.state.action === "insert") {
        axios.post(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            this.getSpp()
        })
        .catch(error => console.log(error))
        console.log(this.data.data)
    } else if(this.state.action === "update"){
        axios.put(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            this.getSpp()
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
            id_spp: 0,
            angkatan: "",
            tahun: "",
            nominal: ""
        })
    }

    
    //edit
    Edit = selectionItem => {
        this.setState({tampilkan:true});
        this.setState({
            action: "update",
            id_spp: selectionItem.id_spp,
            angkatan: selectionItem.angkatan,
            tahun: selectionItem.tahun,
            nominal: selectionItem.nominal
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

    //drop
    dropSpp = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/spp/" + selectionItem.id_spp
            axios.delete(url, this.headerConfig())
            .then(response => {
                console.log(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
            
        }
    }

    componentDidMount(){
        this.getSpp()
    }

    render(){
        return(
            <div>
                <Sidebar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Spp List</h3>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Spp
                    </button>
                    <br></br>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Angkatan</th>
                                <th>Tahun</th>
                                <th>Nominal</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.spp.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.angkatan}</td>
                                    <td>{item.tahun}</td>
                                    <td>{item.nominal}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropSpp(item)}>
                                            Hapus
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
                        <h4>Form Spp</h4>
                        <CloseButton onClick={this.handelClose}/>
                        </ModalHeader>             
                       
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveSpp(ev)}>
                                        Angakatan
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.angkatan}
                                        onChange={ev => this.setState({angkatan: ev.target.value})}
                                        required
                                        />
                                        Tahun
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.tahun}
                                        onChange={ev => this.setState({tahun: ev.target.value})}
                                        required
                                        />
                                        Nominal
                                        <input type="number" min="0.00" max="1000000.00" step="0.01" className="form-control mb-1"
                                        value={this.state.nominal}
                                        onChange={ev => this.setState({nominal: ev.target.value})}
                                        required
                                        />
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
export default Spp;