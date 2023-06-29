//import { useState } from 'react'
import './App.css'
import {Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"


function App() {
  const navigate = useNavigate();
 
  return (
   
      <div className="App" style={{width:"90%", margin:"auto auto", textAlign:"center"}}>
      <h1>Home page</h1>
      <Button variant="outline-dark"  onClick={()=>navigate("create")}>NEXT</Button>
      </div>
        
   
  )
}

export default App
