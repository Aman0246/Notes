
import './App.css'
import Navebar from './Components/Navebar'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Register from './Pages/Register'
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import CreateBlog from './Pages/CreateNotes';
import SingleNotes from './Pages/SingleNotes';
axios.defaults.baseURL = import.meta.env.VITE_PORT;
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <Navebar></Navebar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/notes/:id' element={<SingleNotes/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<CreateBlog/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Routes>

    </>
  )
}

export default App
