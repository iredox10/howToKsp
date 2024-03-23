import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (url) =>{
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  useEffect(() => {
      const fetch = async () =>{
        setLoading(true)
        try {
            const res = await axios(url)
            setData(res.data) 
            console.log(res.data);
            setLoading(false)
        } catch (err) {
         console.log(err);   
         setErr(err)
        }finally{
          setLoading(false)
        }
      }
      fetch()
    }, [])
   return {data,loading,err} 
}

export default useFetch;