import FormHeading from "../components/FormHeading";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import { useState } from "react";
import FormBtn from "../components/FormBtn";
import { NavLink, useNavigate } from "react-router-dom";
import ErrMsg from "../components/ErrMsg";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const {dispatch} = useAuthContext()

  const navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrMsg("all fields must be fill");
      return
    }

    try {
      const res = await axios.post(`http://localhost:4000/user/login`, {
        username,
        password,
      });
    if(res.status == 200){
        localStorage.setItem('howtokspUSER', JSON.stringify(res.data))
        dispatch({type: 'LOGIN', payload: res.data})
    }
      if(res.data.user.isAdmin){
        navigate('/admin')
      }else{
        navigate('/')
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      setErrMsg(err.response.data)
    }
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={handleLogin}
        className="bg-white drop-shadow-2xl m-10 p-2 md:w-[50%] md:mx-auto"
      >
        <FormHeading text={"Login"} />
        {errMsg && <ErrMsg err={errMsg} />}

        <FormInput
          label={"username"}
          labelFor={"username"}
          onchange={(e) => setUsername(e.target.value)}
          type={"text"}
        />

        <FormInput
          label={"password"}
          labelFor={"password"}
          onchange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
        <FormBtn text="Login" />
        <p className="capitalize my-2 ">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="text-green-500">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};
export default Login;
