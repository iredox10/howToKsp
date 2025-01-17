import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminHowTo from "./pages/AdminHowTo";
import Categories from "./pages/Categories";
import AdminCategory from "./pages/AdminCategory";
import Category from "./pages/Category";
import HowTo from "./pages/HowTo";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-category/:slug" element={<AdminCategory />} />
        <Route path="/admin-how-to/:slug" element={<AdminHowTo />} />
        <Route path="/how-to/:slug" element={<HowTo />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<Category />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
