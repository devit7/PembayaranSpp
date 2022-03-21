import React, { useState } from "react"
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import CloseButton from 'react-bootstrap/CloseButton'
import { PersonPlusFill,TrashFill,PencilFill } from 'react-bootstrap-icons';
import Sidebar from "../components/Sidebar"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import DataTable from 'react-data-table-component';
import Dasboard from '../components/Dasboard';

Modal.setAppElement('#root');

export default class Laporan extends React.Component {
constructor(){
    super()
    this.state = {
        
        action:"",
        pembayaran:[],
        columns:[{
            name: 'Tahun Bayar',
            selector: row => row.tahun_spp,
            sortable: true,
        },
        {
            name: 'Bulan Bayar',
            selector: row => row.bulan_spp,
            sortable: true,
        },
        {
            name: 'Tanggal Bayar',
            selector: row => row.tgl_bayar,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        }
    ],
        keyword:"",
        tampilkan:false
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

componentDidMount(){
    this.getPembayaran()
}

    render(){
        return(
            <div>
                
                
                   
                
                <Sidebar/>
                <div className="container">
                    <DataTable
                    columns={this.state.columns}
                    data={this.state.pembayaran}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    />
                    <p>total sudah bayar : </p>
                </div>
                
            </div>
        )
    }
}
