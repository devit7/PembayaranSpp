import React from "react"
import axios from "axios"
import { base_url } from "../config.js";

class Login_siswa extends React.Component{
    constructor(){
        super()
        this.state = {
            nisn : "",
            nama : "",
            level : "",   
            message : "",
            logged : true
        }
    }

    //arrow function login => menjalankan fungsi login
    Login = event => {
        event.preventDefault()
        let sendData = {
            nisn: this.state.nisn,
            nama: this.state.nama
        }
        console.log(sendData)
        let url = base_url + "/siswa/auth"
        axios.post(url, sendData)
            .then(response => {
                this.setState({logged: response.data.logged})
                if (this.state.logged) {
                            let siswa = response.data.data
                            let token_siswa = response.data.token
                            localStorage.setItem("siswa", JSON.stringify(siswa))
                            localStorage.setItem("token", token_siswa)
                            this.props.history.push("/home_siswa")
                } else {
                    this.setState({message: response.data.message})
                }
    
        })
        // menangkap error 
        .catch(error => console.log(error));
    }

    render(){
        return(
            // container flex responsive ditengah dan rata

           <div className="container d-flex h-100 justify-content-center align-items-center">
               <div className="col-sm-3 card my-5">
               
            <div className="card-body">
                <form onSubmit={ev => this.Login(ev)}>
                    <h1 className="h3 mb-3 fw-normal">Student sign in</h1>
                
                    <div className="">
                    <label >Nisn</label>
                    <input type="password" className="form-control " id="floatingInput" placeholder="Username" value={this.state.nisn} onChange={ev => this.setState({nisn: ev.target.value})}/>
                    </div>
                    <br/>
                    <div className="">
                    <label >Name</label>
                    <input type="text" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.nama} onChange={ev => this.setState({nama: ev.target.value})} autoComplete="false"/>
                    </div>
                    
                    <br/>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    { !this.state.logged ?(
                    <div className="alert alert-danger mt-1">{this.state.message}</div>
                    ): null}
                    <a class="dropdown-item" href="/login">are you petugas? Sign in</a>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
                
            </div>
            </div>
        </div>
        
        )
    }
}
export default Login_siswa;
