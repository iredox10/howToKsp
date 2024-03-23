import React from "react";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { NavLink, useParams } from "react-router-dom";

const Category = () => {
  const { slug } = useParams();
  const {
    data: howTos,
    err,
    loading,
  } = useFetch(`http://localhost:4000/get-category/${slug}`);
  console.log(howTos);
  return (
    <div>
      <Header />
      <div className="p-2">
        {howTos && <h2 className="capitalize font-bold text-2xl">{howTos.name} how to </h2>}
        {howTos &&
          howTos.howTo.map((howTo) => (
            <div key={howTo._id}>
              <div className="p-2 capitalize bg-gray-500 my-8">
                <NavLink to={`/how-to/${howTo.slug}`}>{howTo.name}</NavLink>{" "}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
