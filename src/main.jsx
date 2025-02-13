import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./assets/style/main.css";
import App from "./App";
import PersonProvider from "./context/PersonProvider";
import Spinner from "./pages/Spinner";
import Error from "./pages/Error";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const MyBlogs = lazy(() => import("./pages/MyBlogs"));
const Profile = lazy(() => import("./pages/Profile"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));

createRoot(document.getElementById("root")).render(
  <PersonProvider>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="blog/:id" element={<Blog />} />
            <Route path="my-blogs" element={<MyBlogs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Error />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </PersonProvider>
);