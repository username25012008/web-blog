import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../util/apiClient";
import { notification } from "antd";
import Spinner from "./Spinner";

const Blog = () => {
  const id = useParams();
  const userId = localStorage.getItem("user");
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState();
  const [com, setCom] = useState();
  const [loading, setLoading] = useState(true);
  const blogInfo = async () => {
    const res = await apiClient?.get(`/blog/retrieve/${id?.id}`);
    setBlog(res?.data);
  };
  const postComment = async () => {
    if (com == "") {
      notification.error({ message: "Enter your comment" });
    } else {
      const comment = {
        blog: id?.id,
        user: userId,
        description: com,
      };
      const res = await apiClient.post("/blog/comment/post/", comment);
      notification.success({ message: "Your comment has been accepted." });
      setCom("");
      getComment();
    }
  };
  const getComment = async () => {
    try {
      const res = await apiClient?.get(`/blog/comment/list?blog_id=${id?.id}`);
      setComments(res?.data);
    } catch (error) {
      notification.error({ message: error?.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getComment();
    blogInfo();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-11/12 sm:w-10/12 mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white text-center mb-6">
            {blog?.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            <img
              src={blog?.image}
              className="h-40 sm:h-[200px] w-full sm:w-auto rounded-lg object-cover"
            />
            <p className="w-full sm:w-6/12 text-lg font-medium text-gray-800 dark:text-gray-300">
              {blog?.description}
            </p>
          </div>
          <div className="text-end mt-3">
            <div className="inline-block">
              <div className="flex gap-2 items-center">
                <img
                  src={blog?.owner?.avatar}
                  alt={blog?.owner?.full_name}
                  className="w-12 sm:w-14 h-12 sm:h-14 object-cover rounded-full"
                />
                <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                  {blog?.owner?.full_name}
                </h1>
              </div>
              <h1 className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                Published on:{" "}
                {new Date(blog?.date_created).toLocaleDateString()}
              </h1>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-10 sm:mt-14 ml-2 sm:ml-5 text-gray-800 dark:text-white">
            Comments
          </h1>
          <div className="flex flex-col gap-5 mt-6 sm:mt-10">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
              <input
                type="text"
                className="bg-[#f5f7fa] dark:bg-gray-700 dark:text-white outline-0 py-2 sm:py-3 px-3 w-full sm:w-10/12 rounded-md"
                placeholder="Enter your comment"
                value={com}
                onChange={(e) => {
                  setCom(e.target.value);
                }}
              />
              <button
                className="w-full sm:w-2/12 bg-[#d1d1f9] dark:bg-[#4c51bf] text-gray-800 dark:text-white font-semibold cursor-pointer py-2 sm:py-3 rounded-md"
                onClick={postComment}
              >
                Add
              </button>
            </div>
            {comments?.map((item) => (
              <div
                className="bg-[#f5f7fa] dark:bg-gray-700 py-3 px-3 rounded-md"
                key={item?.id}
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={item?.user?.avatar}
                    alt="comment"
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <div>
                    <h1 className="text-base font-medium text-gray-800 dark:text-white">
                      {item?.user?.full_name}
                    </h1>
                  </div>
                </div>
                <div className="ml-10 mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
