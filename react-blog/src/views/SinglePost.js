import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SinglePost(props) {
    const base_url = props.base_url
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (!props.loggedIn){
            props.flashMessage('You must be logged to complete this action', 'danger')
            navigate('/login')
        }

        fetch(`${base_url}/blog/posts/${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.error){props.flashMessage(data.error, "danger")}
                else {setPost(data)}
                })

    }, [postId])

    useEffect(() => {
        if (post !== null && props.loggedIn == true){
            let myToken = localStorage.getItem('token')
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${myToken}`)
                
            var requestOptions={
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            
            fetch(`${base_url}/auth/me`, requestOptions)
                .then(res => res.json())
                .then(data => { if (data.username === post.author.username ){ setCanEdit(true)} })
        }
    }, [post])

    const handleEditSubmit = (e) => {
        e.preventDefault()
        let title = e.target.title.value; 
        let body  = e.target.body.value;
        let myToken = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${myToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw_data = JSON.stringify({
            "title" : title,
            "content" : body 
        })

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw_data,
            redirect : 'follow'
        };

        fetch(`${base_url}/blog/posts/${postId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error) { props.flashMessage(data.error, "danger")}
                else {
                    props.flashMessage(`${data.title} has been updated.`, 'success')
                    setPost(data)
                }
            })
    }

    const handleDeleteEvent = (e) => {
        e.preventDefault()
        let myHeaders = new Headers();
        let myToken = localStorage.getItem('token');
        myHeaders.append('Authorization', `Bearer ${myToken}`);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch(`${base_url}/blog/posts/${postId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.error){props.flashMessage(data.error, 'danger')}
                else {
                    props.flashMessage("Your post has been deleted", "success")
                    navigate('/allposts')
                }
            })
    }

    return (
        <>
            { post ? 
                // <PostCard post={post} /> 
                <>
                <div className="row">
                    <div>
                        <h3 className="mt-3"><strong>{post.title}</strong></h3>
                        <p className="">{post.content}</p>
                        <div className="footer border-top d-flex justify-content-between">
                            <p className="pt-3">&mdash; {post.author.username} | {post.date_created}</p>
                            {canEdit ? <i className="fas fa-edit align-self-center btn" onClick={() => setEditMode(!editMode)} ></i> : null}
                        </div>
                    </div>

                    {editMode ? 
                    <>
                        {/* Grab info from post and autofill the values  */}
                        <form onSubmit={handleEditSubmit} className="col-6">
                            <h3 className="text-center">Create Post</h3>
                            <div className="row d-flex justify-content-center">
                                <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" className="form-control" defaultValue={post.title} />
                                <label htmlFor="body">Body</label>
                                <textarea name="body" className="form-control" rows="5" defaultValue={post.content} />
                                <div className="d-flex justify-content-between align-items-center">
                                    <input type="submit" className="btn btn-primary w-50 mt-2" value="Edit Post" />
                                    {/* Delete Button */}
                                    <button className="btn btn-danger w-25 h-50 mt-2" onClick={(e) => e.preventDefault()} data-bs-toggle="modal" data-bs-target="#deleteModal" ><i className="fas fa-trash"></i></button>
                                </div>
                                </div>
                            </div>
                        </form>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="deleteModalLabel">Delete "{post.title}"?</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                    Warning: This cannot be undone.
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button className="btn btn-danger " data-bs-dismiss="modal" onClick={(e) => handleDeleteEvent(e)} ><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : null}
                </div>
                </>
            : null}
        </>
    )
}