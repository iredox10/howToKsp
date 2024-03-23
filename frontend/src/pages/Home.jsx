import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "styled-components";
import {NavLink} from 'react-router-dom'
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="text-center py-10">
      <h1 className="uppercase text-4xl"><span className="block">Get to know</span> <span>How to do it</span></h1>
      <p className="px-28 my-5">Find out about how to do almost anything in Kano State Polytechnic</p>
      <NavLink to={'/categories'} className='bg-[#045C0D;] px-6 py-2 capitalize rounded-full text-white '>explore</NavLink>      
      </div>
    </div>
 );
};

export default Home;
