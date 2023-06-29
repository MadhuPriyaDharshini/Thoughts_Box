import React from 'react'
import ReactDOM from 'react-dom/client'
import CreatePost from './CreatePost'
import Posts from './Posts'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<App />}/>
        <Route path ="/create" element={<CreatePost />}/>
        <Route path ="/create/posts" element={<Posts />}/> 
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
)
