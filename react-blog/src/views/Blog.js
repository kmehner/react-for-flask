import { useState, useEffect } from "react";
import Card from "../components/Card";

// View all posts 

export default function Blog(props){

    const [posts, setPosts] = useState([]);
    const base_url = props.base_url;

    // SortingMethods

    // SortPosts

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    useEffect(() => {
        console.log("Blog data fetch")
        fetch(`${base_url}/blog/posts`, requestOptions)
        .then(res => res.json())
        .then(data => setPosts(data))
        console.log("Fetch complete")
        console.log(posts)
    }, [])

    return (
        <>
            <h2 className="text-center">All Posts</h2>

            {posts.map(p => <Card post={p} key={p.id} base_url = {base_url}/>)}
        </>
    )







}