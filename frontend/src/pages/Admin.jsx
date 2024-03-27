import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import FormBtn from "../components/FormBtn";
import FormHeading from "../components/FormHeading";
import axios from "axios";
const Admin = () => {
  const [model, setModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: categories,
    loading,
    err,
  } = useFetch(`http://localhost:4000/get-categories`);
  console.log(categories);
  console.log(name);
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/add-category`, {
        name,
        desc,
      });
      if (res.status == 201) {
        setModel(false);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   const getCategory = async (slug) => {
  //     setEditModel(!editModel);
  //     setIsLoading(true);
  //     try {
  //       const res = await axios(`http://localhost:4000/get-category/${slug}`);
  //       if (res.status == 200) {
  //         setIsLoading(false);
  //         setCategory(res.data);
  //       }
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getCategory();
  // }, [slug]);
  const getCategory = async (slug) => {
    setEditModel(!editModel);
    setIsLoading(true);
    try {
      const res = await axios(`http://localhost:4000/get-category/${slug}`);
      if (res.status == 200) {
        setIsLoading(false);
        setCategory(res.data);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4000/add-category/${slug}`,
        {
          name,
          desc,
        },
      );
      if (res.status == 201) {
        setModel(false);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-5 my-10">
        {categories &&
          categories.map((category) => (
            <div key={category._id}>
              <div className="shadow-lg pt-24 px-2 pb-2">
                <NavLink to={`/admin-category/${category.slug}`}>
                  <span>for</span>
                  <p>{category.name}</p>
                </NavLink>
                <div>
                  <button onClick={() => getCategory(category.slug)}>
                    edit
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <button
          onClick={() => setModel(!model)}
          className="absolute right-5 bg-green-500 p-3 rounded-full hover:text-white"
        >
          <FaPlus />
        </button>
      </div>
      {model && (
        <div className="bg-black/50 absolute top-0 h-full w-full ">
          <form
            onSubmit={handleSumbit}
            className="bg-white w-[80%] mx-auto drop-shadow-2xl my-14 p-5 "
          >
            <button
              className="bg-red-500 absolute top-3 right-5 text-white rounded-full p-1"
              onClick={() => setModel(!model)}
            >
              <FaTimes />
            </button>
            <FormHeading text={"add category"} />
            <FormInput
              label={"name"}
              labelFor={"name"}
              type={"text"}
              onchange={(e) => setName(e.target.value)}
            />
            <FormInput
              label={"description"}
              labelFor={"description"}
              type={"text"}
              onchange={(e) => setDesc(e.target.value)}
            />
            <FormBtn text={"add"} />
          </form>
        </div>
      )}
      {editModel && (
        <div className="bg-black/50 absolute top-0 h-full w-full ">
          <form
            onSubmit={handleSumbit}
            className="bg-white w-[80%] mx-auto drop-shadow-2xl my-14 p-5 "
          >
            <button
              className="bg-red-500 absolute top-3 right-5 text-white rounded-full p-1"
              onClick={() => setEditModel(!editModel)}
            >
              <FaTimes />
            </button>

            <FormHeading text={`edit ${category.name}`} />
            <FormInput
              label={"name"}
              labelFor={"name"}
              type={"text"}
              value={category.name}
              onchange={(e) => setName(e.target.value)}
            />
            <FormInput
              label={"description"}
              labelFor={"description"}
              type={"text"}
              onchange={(e) => setDesc(e.target.value)}
            />
            <FormBtn text={"add"} />
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
