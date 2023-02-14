import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout, onUserStateChange } from "../api.js/firbase.js";

export default function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  });
  const handleLogin = () => {
    login().then((user) => {
      setUser(user);
    });
  };
  const handleLogout = () => {
    logout().then((result) => {
      if (result === true) setUser(null);
      else throw new Error(`로그아웃 실패 =>  ${result}`);
    });
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
        <Link to="/products/new" className="text-2xl">
          <BsFillPencilFill />
        </Link>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
