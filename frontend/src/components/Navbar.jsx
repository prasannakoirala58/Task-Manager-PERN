import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="flex justify-between sticky top-0 p-4 bg-white shadow-sm items-center">
        <h2 className="cursor-pointer uppercase font-medium">
          <Link to="/"> Task Manager </Link>
        </h2>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-4 uppercase font-medium">
          {authState.isLoggedIn ? (
            <>
              {/* Removed Add Task button */}
              <li
                className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm"
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition rounded-sm">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {/* Mobile toggle */}
        <span className="md:hidden cursor-pointer" onClick={toggleNavbar}>
          <i className="fa-solid fa-bars"></i>
        </span>

        {/* Mobile sidebar */}
        <div
          className={`absolute md:hidden right-0 top-0 bottom-0 transition ${
            isNavbarOpen ? "translate-x-0" : "translate-x-full"
          } bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}
        >
          <div className="flex">
            <span className="m-4 ml-auto cursor-pointer" onClick={toggleNavbar}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>

          <ul className="flex flex-col gap-4 uppercase font-medium text-center">
            {authState.isLoggedIn ? (
              <>
                {/* Removed Add Task button on mobile as well */}
                <li
                  className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition rounded-sm">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
