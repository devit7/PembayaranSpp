import React from "react"
import axios from "axios"
import { base_url } from "../config.js";
class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
            password : "",
            level : "",   
            message : "",
            logged : true
        }
    }

    //arrow function login => menjalankan fungsi login
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            level: this.state.level
        }
        console.log(sendData)
        let url = base_url + "/petugas/auth"
        axios.post(url, sendData)
            .then(response => {
                this.setState({logged: response.data.logged})
                if (this.state.logged) {
                    switch(this.state.level) {
                        case "admin":
                            let admin = response.data.data
                            let token_admin = response.data.token
                            localStorage.setItem("admin", JSON.stringify(admin))
                            localStorage.setItem("token", token_admin)
                            this.props.history.push("/")
                          break;
                        case "petugas":
                            let petugas = response.data.data
                            let token_petugas = response.data.token
                            localStorage.setItem("petugas", JSON.stringify(petugas))
                            localStorage.setItem("token", token_petugas)
                            this.props.history.push("/home_petugas")
                          break;
                        default:
                    }
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
               <div className="col-sm-4 card my-5">
               
             <div className="card-body">
                <form onSubmit={ev => this.Login(ev)}>
                    <h1 className="h3 mb-3 fw-normal text-center">Login Page</h1>
                    <hr/>
                    <div className="">
                    <label >Username</label>
                    <input type="text" className="form-control " id="floatingInput" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
                    </div>
                    <br/>
                    <div className="">
                    <label >Password</label>
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} autoComplete="false"/>
                    </div>
                    <br/>
                    <label >Level</label>
                    <select class="form-select" aria-label="Default select example" value={this.state.level} onChange={ev => this.setState({level: ev.target.value})} >
                        <option selected>Open this select menu</option>
                        <option value="admin">admin</option>
                        <option value="petugas">petugas</option>
                    </select>
                    
                    <br/>
                    <button className="w-100 btn btn-primary" type="submit">Sign in</button>
                    { !this.state.logged ?(
                    <div className="alert alert-danger mt-1">{this.state.message}</div>
                    ): null}
                    <a class="dropdown-item" href="/login_siswa">are you student? Sign in</a>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
                
            </div>
            

        </div>
        </div>
        )
    }
}
export default Login;
