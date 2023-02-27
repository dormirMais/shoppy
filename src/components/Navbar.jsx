import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout, onUserStateChange } from "../api.js/firbase.js";
import User from "./User.jsx";
import Button from "./ui/Button.jsx";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  const handleLogin = () => {
    login();
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex justify-between border-b-4  border-gray-300 pb-2">
      <Link to="/" className="flex items-center text-4xl text-brand ">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={handleLogin} />}
        {user && <Button text={"Logout"} onClick={handleLogout} />}
      </nav>
    </header>
  );
}
