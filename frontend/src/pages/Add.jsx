
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [book, setBook] = useState({
    title:"",
    desc:"",
    score:null,
    cover:null,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook(prev=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/books", book)
        navigate("/");
    }catch(err){
      console.log(err)
    }
  }

  return(
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" className="inputBox" placeholder='title' onChange={handleChange} name="title"/>
      <input type="text" className="inputBox" placeholder='desc' onChange={handleChange} name="desc"/>
      <input type="number" className="inputBox" placeholder='score' onChange={handleChange} name="score" />
      <input type="text" className="inputBox" placeholder='cover' onChange={handleChange} name="cover" />

    <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add
