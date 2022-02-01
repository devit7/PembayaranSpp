import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
Modal.setAppElement('#root');


class Siswa extends React.Component{
constructor(){
    super()
    this.state = {
        
        action:"",
        siswa:[],
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
    const data = {
        nisn: this.state.id_petugas,
        nis: this.state.username,
        nama: this.state.password,
        id_kelas: this.state.nama_petugas,
        alamat: this.state.level,
        no_tlp:this.state.no_tlp,
        id_spp: this.state.id_spp
    }
    let url = base_url + "/siswa"
    if (this.state.action === "insert") {
        axios.post(url, data, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getSiswa()
        })
        .catch(error => console.log(error))
        console.log(this.data)
    } else if(this.state.action === "update"){
        axios.put(url, data, this.headerConfig())
        .then(response => {
            window.alert(response.data.message)
            this.getSiswa()
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
            nisn: selectionItem.id_petugas,
            nis: selectionItem.username,
            nama: selectionItem.password,
            id_kelas: selectionItem.nama_petugas,
            alamat: selectionItem.level,
            no_tlp:selectionItem.no_tlp,
            id_spp:selectionItem.id_spp
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
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getSiswa()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Petugas List</h3>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Siswa
                    </button>
                    <br></br>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
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
                     
                                <div className="modal-body">
                                    <form onSubmit={ev => this.savePetugas(ev)}>
                                        Nisn
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nisn}
                                        onChange={ev => this.setState({nisn: ev.target.value})}
                                        required
                                        />
                                        Nis
                                        <input type="text" className="form-control mb-1"
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
                                        Id Kelas
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.id_kelas}
                                        onChange={ev => this.setState({id_kelas: ev.target.value})}
                                        required
                                        />
                                        Alamat
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.alamat}
                                        onChange={ev => this.setState({alamat: ev.target.value})}
                                        required
                                        />
                                        no Tlp
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.no_tlp}
                                        onChange={ev => this.setState({no_tlp: ev.target.value})}
                                        required
                                        />
                                        Id Spp
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.id_spp}
                                        onChange={ev => this.setState({id_spp: ev.target.value})}
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
export default Siswa;