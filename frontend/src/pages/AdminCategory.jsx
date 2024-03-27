import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Header from "../components/Header";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";
import { NavLink } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormHeading from "../components/FormHeading";
import FormBtn from "../components/FormBtn";

const AdminCategory = () => {
  const { slug } = useParams();
  const {
    data: howTos,
    err,
    loading,
  } = useFetch(`http://localhost:4000/get-category/${slug}`);
  // console.log(howTos);
  const [markdown, setMarkdown] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState(false);
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/add-howto/${slug}`, {
        name,
        markdown,
        desc,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header />
      {howTos &&
        howTos.howTo.map((howTo) => (
          <div key={howTo._id}>
            <NavLink to={`/admin-how-to/${howTo.slug}`}>{howTo.name}</NavLink>
          </div>
        ))}
      <button
        onClick={() => setModel(!model)}
        className="absolute right-5 bottom-5 bg-green-500 p-3 rounded-full hover:text-white"
      >
        <FaPlus />
      </button>
      {model && (
        <div className="bg-black/50 absolute top-0 h-full w-full z-10 flex ">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-[80%] mx-auto drop-shadow-2xl my-14 p-5 "
          >
            <button
              className="bg-red-500 absolute top-3 right-5 text-white rounded-full p-1"
              onClick={() => setModel(!model)}
            >
              <FaTimes />
            </button>
            <FormHeading text={`add how to `} />
            <FormInput
              label={"name"}
              labelFor={"name"}
              onchange={(e) => setName(e.target.value)}
              type={"text"}
            />
            <FormInput
              label={"desc"}
              labelFor={"desc"}
              onchange={(e) => setDesc(e.target.value)}
              type={"text"}
            />

            <label labelFor="markdown">Markdown</label>
            <textarea
              name="markdown"
              id="markdown"
              onChange={(e) => setMarkdown(e.target.value)}
              cols="30"
              className="border w-full p-1 md:p-2 "
              rows="10"
            ></textarea>
            <FormBtn text={"add"} />
          </form>
          <div className="flex-1">
            <MarkdownPreview source={markdown} style={{ padding: '16', width: '100%' }} />
            {/* <MDEditor value={markdown} style={{width: '100%'}} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
