import React from "react";
import 'react-notifications/lib/notifications.css';
import { jsPDF } from "jspdf";
import { html2canvas } from "html2canvas"
import { base_url } from "../config"
import axios from "axios"
import Modal from "react-modal"
 import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import $ from "jquery"
import ReactToPrint from 'react-to-print';
Modal.setAppElement('#root');
// Using a class component, everything works without issue
// but we need to use the "static" keyword to tell React

export class ComponentToPrint extends React.Component {
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
                    
                    <br/>
                    <div className="shadow-lg p-3 mb-5 bg-body rounded">
                    {/* <button
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    onClick={this.exportPDFWithMethod}
                    >
                    Export to PDF
                    </button> */}
                    
                    <form className="float-start"style={({width: '500px'})}> 
                    <div class="row">
                        <div class="col">
                        <select class="form-select" value={this.state.ordertahun} onChange={ev => this.setState({ordertahun: ev.target.value})} onClick={this.getPembayaran}>
                            <option select value=''>Choose Tahun</option>
                            <option >2020</option>
                            <option >2021</option>
                            <option >2022</option>
                            <option >2023</option>
                            <option >2024</option>
                            <option >2025</option>
                            <option >2026</option>
                            <option >2027</option>
                            <option >2028</option>
                            <option >2029</option>
                            <option >2030</option>
    
                        </select>
                        </div>
                        <div class="col">
                        <select class="form-select" value={this.state.orderbulan} onChange={ev => this.setState({orderbulan: ev.target.value})} onClick={this.getPembayaran}>
                            <option select value=''>Choose Bulan</option>
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                            <option >5</option>
                            <option >6</option>
                            <option >7</option>
                            <option >8</option>
                            <option >9</option>
                            <option >10</option>
                            <option >11</option>
                            <option >12</option>
                        </select>
                        </div>
                        <div class="col">
                        <select class="form-select" value={this.state.orderstatus} onChange={ev => this.setState({orderstatus: ev.target.value})} onClick={this.getPembayaran}>
                            <option select value=''>Choose Status</option>
                            <option >Sudah Bayar</option>
                            <option >Belum Bayar</option>
                        </select>
                        </div>
                        </div>                  
                    </form>
                    <form className="float-end">  
                    <div class="row">
                            <div class="col">
                            <input className="form-control float-end" id="myInput" type="text" placeholder="Search.." value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={this.getPembayaran} />                     
                        </div>
                        <div class="col">
                            <select  className="form-select float-end" id="selectby" value={this.state.orderby} onChange={ev => this.setState({orderby: ev.target.value})} onClick={this.getPembayaran}>
                                <option value='id_pembayaran'>id pembayaran</option>
                                <option value='nisn'>nisn</option>
                            </select>
                        </div>
                        </div> 
                    </form>
                    {/* <PDFExport ref={this.pdfExportComponent} 
                    paperSize='Legal' margin="2cm"
                    > */}
                    <br/><br/><br/>
                    <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Id Pembayaran</th>
                                    <th>Id Petugas</th>
                                    <th>Nisn</th>
                                    <th>Tgl Bayar</th>
                                    <th>Bulan Bayar</th>
                                    <th>Tahun Bayar</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filter.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.id_pembayaran}</td>
                                        <td>{item.id_petugas}</td>
                                        <td>{item.nisn}</td>
                                        <td>{item.tgl_bayar}</td>
                                        <td>{item.bulan_spp}</td>
                                        <td>{item.tahun_spp}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* </PDFExport> */}
                        
                    </div>
                    
                </div>
            )
        }
  }