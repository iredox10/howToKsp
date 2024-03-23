import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from 'styled-components'

const MarkdownCont = style.div`
  backgroundColor: red,
  h1{
    color: yellow;
  }
`

const AdminHowTo = () => {
  const {slug} = useParams()
  const {data:howTo,err,loading} = useFetch(`http://localhost:4000/get-howto/${slug}`)  
  return (
    <div>
      {howTo && 
        <MarkdownCont>
        <Markdown  remarkPlugins={[remarkGfm]}>{howTo.markdown}</Markdown>
      </MarkdownCont>
      }
    </div>
  )
}

export default AdminHowTo