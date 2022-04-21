import React from "react";
import { Link } from "react-router-dom";

export default function Card(props){
    console.log("card")
    const post = props.post 

    return (
        <div className="card">
            <h5 className="card-header">{ post.title }</h5>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">By: {post.user_id}</h6>
                <p className="card-text">{post.body}</p>
            </div>
        </div>
    )





}