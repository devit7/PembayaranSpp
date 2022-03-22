import React from "react"
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
import Sidebar from "../components/Sidebar"
import { PersonPlusFill,TrashFill,PencilFill } from 'react-bootstrap-icons';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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
        orderby:"id_spp",
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
saveSpp = event => {
    event.preventDefault()

    //window.$('#modal_petugas-id').modal("hide");
    this.setState({tampilkan:false});
    let data = {
        id_spp: this.state.id_spp,
        angkatan: this.state.angkatan,
        tahun: this.state.tahun,
        nominal: this.state.nominal
    }
    let url = base_url + "/spp"
    if (this.state.action === "insert") {
        axios.post(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            if(response.data.message === "data has been inserted"){
                this.setState(this.createNotification('success'))
            }else{
                this.setState(this.createNotification('error'))
            }
            this.getSpp()
        })
        .catch(error => console.log(error))
        this.getSpp()
    } else if(this.state.action === "update"){
        axios.put(url, data, this.headerConfig())
        .then(response => {
            console.log(response.data.message)
            if(response.data.message === "data has been update"){
                this.setState(this.createNotification('info'))
            }else{
                this.setState(this.createNotification('error'))
            }
            this.getSpp()
        })
        .catch(error => console.log(error))
        this.getSpp()
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
        if((this.state.keyword === null)||(this.state.keyword === undefined)||(this.state.keyword === "")){
            let url = base_url+"/spp"
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
            let url = base_url + "/spp/"+this.state.orderby+"/" + this.state.keyword
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

    //drop
    dropSpp = (selectionItem) => {
        if (window.confirm("are you sure to delete this data?")) {
            let url = base_url + "/spp/" + selectionItem.id_spp
            axios.delete(url, this.headerConfig())
            .then(response => {
                if(response.data.message === "data has been destroyed"){
                    this.setState(this.createNotification('warning'))
                }else{
                    this.setState(this.createNotification('error'))
                }
                this.getSpp()
            })
            .catch(error => console.log(error))
            this.getSpp()
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
    componentDidMount(){
        this.getSpp()
    }

    render(){
        return(
            <div>
                <Sidebar/>
                <div className="container">
                <br/><br/>
                <div class="card  shadow-lg rounded">
                <h5 class="card-header ">Pages Spp</h5>
                <div class="card-body">

                    <button className="btn btn-success" onClick={() => this.Add()}>
                    <PersonPlusFill/> add
                    </button>
                    <form className="float-end"> 
                    <input className="" id="myInput" type="text" placeholder="Search.." value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={this.getSpp} />
                    <select id="selectby" value={this.state.orderby} onChange={ev => this.setState({orderby: ev.target.value})} onClick={this.getSpp}>
                        <option value='id_spp'>id spp</option>
                        <option value='angkatan'>angkatan</option>
                        <option value='nominal'>nominal</option>
                        <option value='tahun'>tahun</option>
                    </select>
                    </form>
                    <NotificationContainer/>
                    <br></br>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Id Spp</th>
                                <th>Angkatan</th>
                                <th>Tahun</th>
                                <th>Nominal</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filter.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id_spp}</td>
                                    <td>{item.angkatan}</td>
                                    <td>{item.tahun}</td>
                                    <td>{item.nominal}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                          <PencilFill/>  Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropSpp(item)}>
                                          <TrashFill/>  Hapus
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
                                        <input type="number" className="form-control mb-1"
                                        value={this.state.nominal}
                                        onChange={ev => this.setState({nominal: ev.target.value})}
                                        required
                                        />
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
export default Spp;