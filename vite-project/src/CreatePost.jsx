import {Button, Form} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import axios from "axios"


export default function CreatePost(){
    const navigate = useNavigate();
    const [post,setPost] = useState({
        title:"",
        description:"",
    })

    const handleChange=(event)=>{
        const{name, value} = event.target;
        setPost(prev=>{
            return({
                ...prev,
                [name]:value,
            })
        })
        console.log(event.target.value);
    }

    useEffect(()=>{
        console.log(post);
    },[post]);


    const handleClick=(event)=>{
        event.preventDefault();

        axios
        .post("http://localhost:3001/create",post)
        .then(res=>console.log(res))
        .catch((err)=>console.log(err));

        navigate("posts");
    }

    return(
        <div style={{width:"90%", margin:"auto auto",textAlign:"center"}}>
            <h1>Create Post</h1>
            <Form>
                <Form.Group>
                 <Form.Label style={{textAlign:"left", alignItems:"flex-start"}}>Title</Form.Label>
                    <Form.Control name="title"
                    value={post.title}
                     placeholder="Enter the title" 
                     style={{marginBottom:"1rem"}}
                        onChange={handleChange}
                     />
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    name="description"
                    value = {post.description}
                     placeholder="Enter the Description"
                      style={{marginBottom:"1rem"}}
                      onChange={handleChange}
                      />
                      <Button  onClick={handleClick} style={{marginBottom:"1rem", width:"100%"}}>SAVE POST</Button>
                </Form.Group>
            </Form>
            <Button variant="outline-dark" onClick={()=>navigate(-1)}>BACK to Homepage</Button>
        </div>
    )
}