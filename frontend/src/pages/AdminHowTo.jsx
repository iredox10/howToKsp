import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from "../components/Header";


const AdminHowTo = () => {
  const {slug} = useParams()
  const {data:howTo,err,loading} = useFetch(`http://localhost:4000/get-howto/${slug}`)  
  return (
    <div>
    <Header />      
      {howTo && 
       <div className='prose m-4'>
        <Markdown  remarkPlugins={[remarkGfm]}>{howTo.markdown}</Markdown>
      </div>
      }
    </div>
  )
}

export default AdminHowTo