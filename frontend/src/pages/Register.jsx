import FormHeading from "../components/FormHeading";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import { useState } from "react";
import FormBtn from "../components/FormBtn";
import { NavLink } from "react-router-dom";
import ErrMsg from "../components/ErrMsg";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !username || !password || !repeatPassword) {
      setErrMsg("fields can't be empty");
      return
    }
    if (password !== repeatPassword) {
      setErrMsg("password do not match!!");
      return
    }
    try {
      const res = await axios.post(`http://localhost:4000/user/register`, {
        name,
        email,
        username,
        password,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={handleRegister}
        className="bg-white drop-shadow-2xl m-10 p-2 md:w-[50%] md:mx-auto"
      >
        <FormHeading text={"Register"} />
        {errMsg && <ErrMsg err={errMsg} />}
        <FormInput
          label={"name"}
          labelFor={"name"}
          onchange={(e) => setName(e.target.value)}
          type={"text"}
        />
        <FormInput
          label={"username"}
          labelFor={"username"}
          onchange={(e) => setUsername(e.target.value)}
          type={"text"}
        />
        <FormInput
          label={"email"}
          labelFor={"email"}
          onchange={(e) => setEmail(e.target.value)}
          type={"email"}
        />
        <FormInput
          label={"password"}
          labelFor={"password"}
          onchange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
        <FormInput
          label={"repeat password"}
          labelFor={"repeat password"}
          onchange={(e) => setRepeatPassword(e.target.value)}
          type={"password"}
        />
        <FormBtn text="Register" />
        <p className="capitalize my-2 ">
          Already have an account?{" "}
          <NavLink to={"/login"} className="text-green-500">
            login
          </NavLink>
        </p>
      </form>
    </div>
  );
};
export default Register;
