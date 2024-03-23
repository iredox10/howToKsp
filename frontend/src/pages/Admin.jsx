import React, { useEffect, useState } from 'react'
// import useFetch from '../hooks/useFetch'
// import Category from '../components/Category'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Admin = () => {
const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
    useEffect(() => {
      const fetch = async () =>{
        try {
            const res = await axios('http://localhost:4000/get-categories')
            setCategories(res.data) 
            console.log(res.data);
        } catch (err) {
         console.log(err);   
        }
      }
      fetch()
    }, [])
  return (
    <div>
      {categories && categories.map(c =>(
        <div key={c._id}>
          <NavLink to={`/category/${c.slug}`}> {c.name}</NavLink>
        </div>
      ))}
    </div>
  )
}

export default Admin