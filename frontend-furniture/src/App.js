import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Adminpanel from "./pages/Adminpanel";
import Dashboard from "./pages/Dashboard";
import View from "./components/View";
import Wishlist from "./components/Wishlist";
import Bag from "./components/Bag";
import Category from "./components/Category";
import Order from "./components/Order";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-panel" element={<Adminpanel />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
