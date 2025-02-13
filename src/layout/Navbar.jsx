import React, { useContext, useEffect, useState } from "react";
import { Person } from "../context/PersonProvider";
import { BsDoorOpen } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoClose, IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import { apiClient } from "../util/apiClient";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { info, setInfo } = useContext(Person);
  let access = localStorage.getItem("access");
  const logOutHandle = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.setItem("verify", false);
    localStorage.removeItem("user");
    window.location.pathname = "/login";
  };
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const person = async () => {
    const res = await apiClient.get("/account/me/", access);
    if (res?.data?.gender == 0) {
      const person = { ...res?.data };
      person.gender = null;
      person.gender == 1
        ? (person.gender_display = "Male")
        : person.gender == 2
        ? (person.gender_display = "Female")
        : person.gender == null
        ? (person.gender_display = "Unknown")
        : "";
      setInfo(person);
    } else {
      const person = { ...res?.data };
      person.gender == 1
        ? (person.gender_display = "Male")
        : person.gender == 2
        ? (person.gender_display = "Female")
        : person.gender == null || person.gender > 2
        ? (person.gender_display = "Unknown")
        : "";
      setInfo(person);
    }
    localStorage.setItem("user", res?.data?.id);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  useEffect(() => {
    access && person();
  }, []);

  return (
    <nav className="dark:bg-gray-600 bg-white px-[5%] py-4 flex justify-between items-center">
      <Link to={"/"} className="text-3xl font-black dark:text-white text-black">
        Reg - <span className="text-red-600">Log</span>
      </Link>
      <button
        className="lg:hidden text-3xl dark:text-white text-black"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <IoClose /> : <IoMenu />}
      </button>
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row items-center gap-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white dark:bg-gray-600 shadow-lg lg:shadow-none py-6 lg:py-0 px-5 lg:px-0 lg:space-x-6`}
      >
        <Link
          to={"/home"}
          className="text-xl dark:text-white font-semibold hover:text-red-500 transition"
        >
          Home
        </Link>
        {access && (
          <Link
            to={"/my-blogs"}
            className="text-xl dark:text-white font-semibold hover:text-red-500 transition"
          >
            My Blogs
          </Link>
        )}
        <button
          className="w-9 h-9 flex justify-center items-center dark:bg-white bg-black rounded-full"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <IoSunny className="text-black text-2xl" />
          ) : (
            <IoMoon className="text-white text-2xl" />
          )}
        </button>
        {access ? (
          <>
            <Link to={"/profile"} className="flex items-center gap-2">
              <img
                src={info?.avatar}
                alt="me"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <div className="flex flex-col">
                <h1 className="dark:text-white text-black text-lg font-semibold">
                  {info?.full_name}
                </h1>
              </div>
            </Link>
            <button
              className="text-white font-medium flex items-center gap-1 bg-red-500 py-2 px-4 rounded-lg text-lg active:bg-red-500/40 cursor-pointer"
              onClick={logOutHandle}
            >
              <BsDoorOpen /> Logout
            </button>
          </>
        ) : (
          <Link
            to={"/login"}
            className="text-xl dark:bg-gray-400 py-1 px-5 rounded-2xl border-2 border-gray-500 font-medium dark:text-white hover:bg-gray-300 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
