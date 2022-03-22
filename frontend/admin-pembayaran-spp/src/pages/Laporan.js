import React, { useState } from "react"
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
import { PersonPlusFill,TrashFill,PencilFill } from 'react-bootstrap-icons';
import Sidebar from "../components/Sidebar"
import 'react-notifications/lib/notifications.css';
import { jsPDF } from "jspdf";
import { html2canvas } from "html2canvas"
 import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import $ from "jquery"
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
Modal.setAppElement('#root');

export default class Laporan extends React.Component {
constructor(){
    super()
    this.state = {
        
        action:"",
        pembayaran:[],
        orderby:"id_pembayaran",
        ordertahun:"",
        orderbulan:"",
        orderstatus:"",
        filter:[],
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
    if((this.state.keyword !== null)&&(this.state.keyword !== undefined)&&(this.state.keyword !== "")){
        let url = base_url + "/pembayaran/"+this.state.orderby+"/" + this.state.keyword
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
    }else if(this.state.ordertahun !== "" || this.state.orderbulan !== "" || this.state.orderstatus !== ""){
        let url
        if(this.state.ordertahun !== "" && this.state.orderbulan === "" && this.state.orderstatus === ""){
        url = base_url+"/pembayaran/tahun/"+this.state.ordertahun
        }else if(this.state.orderbulan !== "" && this.state.ordertahun === "" && this.state.orderstatus === ""){
        url = base_url+"/pembayaran/bulan/"+this.state.orderbulan
        }else if(this.state.orderstatus !== "" && this.state.orderbulan === "" && this.state.ordertahun=== ""){
        url = base_url+"/pembayaran/status/"+this.state.orderstatus
        }else if(this.state.ordertahun !== "" && this.state.orderbulan !== "" && this.state.orderstatus === ""){
        url = base_url+"/pembayaran/tahunbulan/"+this.state.ordertahun+"/"+this.state.orderbulan
        }else if(this.state.ordertahun !== "" && this.state.orderstatus !== "" && this.state.orderbulan === ""){
        url = base_url+"/pembayaran/tahunstatus/"+this.state.ordertahun+"/"+this.state.orderstatus
        }else if(this.state.orderbulan !== "" && this.state.orderstatus !== "" && this.state.ordertahun === ""){
        url = base_url+"/pembayaran/bulanstatus/"+this.state.orderbulan+"/"+this.state.orderstatus
        }else if(this.state.ordertahun !== "" && this.state.orderbulan !== "" && this.state.orderstatus !== ""){
        url = base_url+"/pembayaran/tahun_spp/"+this.state.ordertahun+"/"+this.state.orderbulan+"/"+this.state.orderstatus
        }
        console.log(url)
        axios.get(url , this.headerConfig())
        .then(response => {
            this.setState({filter: response.data.data})
            console.log(response.data.data.length)
            
        
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
        let url = base_url+"/pembayaran"
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
    }
}
exportPDFWithMethod = () => {
    let element = document.querySelector(".k-grid") || document.body;
    savePDF(element, {
      paperSize: "A4",
    });
}
componentDidMount(){
    this.getPembayaran()
}

    render(){
        return(
            <div>
                <Sidebar/>
            <div >
                <br/><br/>
                <ReactToPrint
                
                trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <button type="button" class="btn btn-outline-primary float-end">Print Pdf</button>;
                }}
                content={() => this.componentRef}
                />
                
                <br/>
                <br/>
                <ComponentToPrint ref={el => (this.componentRef = el)} />
               </div> 
            </div>
        )
    }
}
