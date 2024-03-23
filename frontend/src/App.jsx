import {Routes, BrowserRouter as Router,Route } from 'react-router-dom'
import Home from "./pages/Home";
import Admin from './pages/Admin';
import AdminHowTo from './pages/AdminHowTo';
import Categories from './pages/Categories';
import AdminCategory from './pages/AdminCategory';
import Category from './pages/Category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-category/:slug" element={<AdminCategory />} />
        <Route path="/how-to/:slug" element={<AdminHowTo />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<Category />} />
      </Routes>
    </Router>
  )
}

export default App;
