import React, { useState } from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import MDEditor from '@uiw/react-md-editor'
import axios from "axios";
import { NavLink } from "react-router-dom";

const AdminCategory = () => {
  const { slug } = useParams();
  const {data:howTos,err,loading} = useFetch(`http://localhost:4000/get-category/${slug}`)  
  // console.log(howTos);
  const [markdown, setMarkdown] = useState('')
  const [name, setName] = useState('')
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post(`http://localhost:4000/add-howto/${slug}`,{
        name,
        markdown
      })
      console.log(res.data);
    }catch(err){
      console.log(err)
    }
  }
  return <div>
    {howTos && howTos.howTo.map(howTo =>(
      <div key={howTo._id}>
      <NavLink to={`/how-to/${howTo.slug}`}>{howTo.name}</NavLink>  
      </div>
    ))}
  
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" onChange={e => setName(e.target.value)}/>
        <textarea name="markdown" id="markdown" onChange={(e) => setMarkdown(e.target.value)} cols="30" rows="10"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div>
      <MDEditor 
      value={markdown}
      // onChange={setMarkdown}
      />
    </div>
  </div>;
};

export default AdminCategory;
