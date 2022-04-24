import React from "react";
import { Link } from "react-router-dom";

export default function Card(props){
    console.log("card")
    const post = props.post 

    return (
        <div className="card">
            <h5 className="card-header text-center">{ post.title }</h5>
            <div className="card-body text-center">
                <p className="card-text">{post.content}</p>
                <h6 className="card-subtitle mt-2 text-muted">By: {post.author.username}</h6>
                <div className="d-flex justify-content-center">
                    <Link className="btn btn-dark nav-link text-white w-25 mt-2 " to={`/singlepost/${post.id}`}>View More</Link>
                </div>
            </div>
        </div>
    )





}