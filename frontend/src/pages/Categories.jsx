import React from "react";
import useFetch from "../hooks/useFetch";
import Card from "../components/Card";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const Categories = () => {
  const {
    data: categories,
    loading,
    err,
  } = useFetch(`http://localhost:4000/get-categories`);
  console.log(categories);
  return (
    <div>
      <Header />
      <div className="mx-5 my-10">
        {" "}
        {categories &&
          categories.map((category) => (
            <div key={category._id}>
              <div className="shadow-lg pt-24 px-2 pb-2">
                <NavLink to={`/category/${category.slug}`}>
                  <span>for</span>
                  <p>{category.name}</p>
                </NavLink>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
