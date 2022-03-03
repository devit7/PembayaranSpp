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
            level: "admin"
        }
        console.log(sendData)
        let url = base_url + "/petugas/auth"
        axios.post(url, sendData)
            .then(response => {
                this.setState({logged: response.data.logged})
                if (this.state.logged) {
                    let admin = response.data.data
                    let token = response.data.token
                    localStorage.setItem("admin", JSON.stringify(admin))
                    localStorage.setItem("token", token)
                    this.props.history.push("/")
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
            
            /*
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header text-white text-center">
                        <h4>TESTER</h4>
                        <strong className="text-warning">Admin Sign In</strong>
                    </div>
                    <div className="card-body">
                        { !this.state.logged ?(
                            <div className="alert alert-danger mt-1">{this.state.message}</div>
                        ): null}
                        <form onSubmit={ev => this.Login(ev)}>
                            <input type="text" className="form-control mb-1" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} />
                            <input type="password" className="form-control mb-1" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} autoComplete="false"/>
                            <button className="btn btn-block btn-primary mb-1" type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            */

           <div className="container d-flex h-100 justify-content-center align-items-center">
               <div className="col-sm-3 card my-5">
               
            <div className="card-body">
                <form onSubmit={ev => this.Login(ev)}>
                    <h1 className="h3 mb-3 fw-normal">Admin sign in</h1>
                
                    <div className="">
                    <label >Username</label>
                    <input type="text" className="form-control " id="floatingInput" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
                    </div>
                    <br/>
                    <div className="">
                    <label >Password</label>
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} autoComplete="false"/>
                    </div>
                    <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    { !this.state.logged ?(
                    <div className="alert alert-danger mt-1">{this.state.message}</div>
                    ): null}
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
                
            </div>
            </div>
        </div>
        
        )
    }
}
export default Login;
