import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

export default function Posts () {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [updatedPost,setUpdatedPost] = useState({});

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        axios.get("http://localhost:3001/create/posts")
            .then((res) => {
                console.log(res);
                setPosts(res.data)
            })
            .catch((err) => console.log(err))

    }, [])

    const deletePost = (id) => {
        console.log("Frontend ID" + id);

        axios.delete(`http://localhost:3001/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        window.location.reload();
    };

    const updatePost =(post)=>{
        console.log(post);
        setUpdatedPost(post);
        handleShow();
    }

    const handleChange=(event)=>
    {
        const {name, value} =event.target;
        setUpdatedPost((prev)=>{
            return({
                ...prev,
                [name]:value,

            });
        });
    };

    const savePost=()=>{
        console.log(updatedPost);
        axios.put(`http://localhost:3001/update/${updatedPost._id}`, updatedPost)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))

        handleClose();
        //window.location.reload();


    }

    return (
        <div style={ { width: "90%", margin: "auto auto", textAlign: "center" } }>
            <h1>Posts Page</h1>
            <Button style={ { marginBottom: "1rem" } } variant="outline-dark" onClick={ () => navigate(-1) }>Back to Homepage</Button>


            <Modal show={ show } onHide={ handleClose } >
                <Modal.Header closeButton style={{backgroundColor:"slateblue"}}>
                    <Modal.Title>Update Your Post</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:"slateblue"}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Edit Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the title"
                                autoFocus
                                name="title"
                                value={updatedPost.title?updatedPost.title:""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Edit Description</Form.Label>
                            <Form.Control as="textarea" rows={ 3 }
                            name="description"
                            onChange={handleChange}
                            value={updatedPost.description?updatedPost.description:""}
                          
                             />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor:"slateblue"}}>
                    <Button variant="secondary" onClick={ handleClose }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ savePost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            { posts ? (
                <>{ posts.map((post) => {
                    return (
                        <div key={ post._id } style={ { border: "solid grey 1px", borderRadius: "8px", marginBottom: "1rem", padding: "1rem" } }>
                            <h4>{ post.title }</h4>
                            <p>{ post.description }</p>
                            <div style={ { display: "flex", flexDirection: "row", justifyContent: "space-between" } }>
                                <Button onClick={()=>updatePost(post)} style={ { marginRight: "1rem" } }>UPDATE</Button>
                                <Button onClick={ () => deletePost(post._id) }>DELETE</Button>
                            </div>
                        </div>
                    );
                }) }

                </>) :
                (
                    ""
                ) }
        </div>
    )

}