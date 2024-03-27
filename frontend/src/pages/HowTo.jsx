import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../components/Header";
import FormBtn from "../components/FormBtn";

const HowTo = () => {
  const { slug } = useParams();
  const {
    data: howTo,
    err,
    loading,
  } = useFetch(`http://localhost:4000/get-howto/${slug}`);
  const handleComment = async() =>{
      
  }

  return (
    <div>
      <Header />
      <div className="p-4 w-full md:w-[80%] md:mx-auto">
        {howTo && (
          <div className="prose  ">
            <Markdown remarkPlugins={[remarkGfm]}>{howTo.markdown}</Markdown>
          </div>
        )}
        <div className="my-5">
            <h1>comment sections</h1>
           <form onSubmit={handleComment}>
            <textarea name="comment" id="comment" cols="30" rows="10" className="border"></textarea>
            <FormBtn text={'comment'}/>
            </form> 
        </div>
      </div>
    </div>
  );
};

export default HowTo;
