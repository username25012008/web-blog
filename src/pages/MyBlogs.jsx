import React, { useEffect, useState } from "react";
import { apiClient } from "../util/apiClient";
import { Link } from "react-router-dom";
import { notification } from "antd";
import Spinner from "./Spinner";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  const getMyBlogs = async () => {
    try {
      const res = await apiClient.get("/blog/my-blogs/");
      setBlogs(res?.data);
    } catch (error) {
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMyBlogs();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-[#F5F7FA] dark:bg-gray-500 py-10 min-h-[700px]">
          <div className="w-11/12 sm:w-10/12 mx-auto bg-white dark:bg-gray-600 py-10 px-5 rounded-xl">
            <div className="md:mb-10 mb-3">
              <h1 className="md:text-4xl sm:text-2xl font-bold dark:text-white">
                My blogs
              </h1>
            </div>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {blogs?.map((blog) => (
                <Link
                  key={blog?.id}
                  to={`/blog/${blog?.id}`}
                  className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{blog?.title}</a>
                  </h2>
                  <p className="mb-5 font-light text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    {blog?.description.slice(0, 200)} ...
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-7 h-7 sm:w-10 sm:h-10 rounded-full object-cover"
                        src={blog?.owner?.avatar}
                        alt="Author avatar"
                      />
                      <span className="font-medium dark:text-white text-sm sm:text-base">
                        {blog?.owner?.full_name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBlogs;
