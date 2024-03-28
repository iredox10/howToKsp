import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../components/Header";
import FormBtn from "../components/FormBtn";
import { AuthContext } from "../context/AuthContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const HowTo = () => {
  const { slug } = useParams();
  const { state } = useAuthContext();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const [reply, setReply] = useState("");
  const [resComment, setResComment] = useState(null);
  const [resReply, setResReply] = useState(null);
  const [model, setModel] = useState(false);

  const {
    data: howTo,
    err,
    loading,
  } = useFetch(`http://localhost:4000/get-howto/${slug}`);

  // const {
  //   data: comments,
  //   err: commentErr,
  //   loading: commentLoading,
  // } = useFetch(`http://localhost:4000/user/get-comments`);

  useEffect(() => {
    const fetch = async () => {
      // setLoading(true)
      try {
        const res = await axios(
          `http://localhost:4000/user/get-comments/${slug}`
        );
        setComments(res.data);
        console.log(res.data);
        // setLoading(false)
      } catch (err) {
        console.log(err);
        //  setErr(err)
      } finally {
        // setLoading(false)
      }
    };
    fetch();
  }, [ ]);

  const findComment = async (id) => {
    setModel(!model);
    try {
      const res = await axios(`http://localhost:4000/user/get-comment/${id}`);
      console.log(res.data);
      setResComment(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:4000/user/comment/${slug}`,
        {
          username: state.user.username,
          comment,
        }
      );
      setComments((prev) => {
        prev, res.data;
      });
      setComment("");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const findReply = async (commentId, replyId) => {
    try {
      const reply = await axios(
        `http://localhost:4000/user/get-reply/${commentId}/${replyId}`
      );
      const comment = await axios(
        `http://localhost:4000/user/get-comment/${commentId}`
      );

      setResReply(reply.data);
      setResComment(comment.data);
      resComment && setModel(!model);
      console.log(resComment);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReply = async (e, commentId, replyId) => {
    e.preventDefault();
    console.log(commentId, replyId);
    if (!reply) {
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:4000/user/post-reply/${commentId}/${replyId}`,
        {
          username: state.user.username,
          reply,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log('state in howto', state);
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
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="10"
              value={comment}
              className="border"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <FormBtn text={"comment"} />
          </form>
        </div>
        {comments &&
          comments.comments.map((comment) => (
            <div className="bg-gray-100 my-1" key={comment._id}>
              <div>
                <div className="flex capitalize mb-3 gap-3">
                  <p>{comment.comment}</p>
                  <span>by {comment.user}</span>
                </div>
                <button onClick={() => findComment(comment._id)}>reply</button>
              </div>
              <div>
                {comment.replies.map((r) => (
                  <div key={r._id} className="bg-gray-300 my-1">
                    <div className="flex gap-2">
                      <p>{r.comment}</p>
                      <span> by: {r.user}</span>
                    </div>
                    <button
                      className="bg-green-400 p-2"
                      onClick={() => findReply(comment._id, r._id)}
                    >
                      reply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      {model && (
        <div className="my-5">
          <h1>reply to {resComment && resComment.user} </h1>
          <form onSubmit={(e) => handleReply(e, resComment._id, resReply._id)}>
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="10"
              className="border"
              onChange={(e) => setReply(e.target.value)}
            ></textarea>
            <FormBtn text={"reply"} />
          </form>
        </div>
      )}
    </div>
  );
};

export default HowTo;
