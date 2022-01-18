import React from "react"
import { Link } from "react-router-dom"
export default class PetugasList extends React.Component{
    render(){
        return(
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                        <div className="col-sm-7">
                            {/** deskription */}
                            <h5 className="text-bold">username: {this.props.username}</h5>
                            <h6>password: {this.props.password}</h6>
                            <h6>nama_petugas: {this.props.nama_petugas}</h6>
                            <h6>level: {this.props.level}</h6>
                        </div>
                        <div className="col-sm-2">
                            {/** action */}
                            <button className="btn btn-sm btn-primary btn-block" onClick={this.props.onEdit}>
                                Edit
                            </button>
                            <button className="btn btn-sm btn-danger btn-block" onClick={this.props.onDrop}>
                                Delete
                            </button>
                        </div>
                </div>
            </div>
        )
    }
}
