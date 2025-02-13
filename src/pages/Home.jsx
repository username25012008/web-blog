import React, { useEffect, useState } from "react";
import { apiClient } from "../util/apiClient";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import Spinner from "./Spinner";

const Home = () => {
  let access = localStorage.getItem("access");
  const [blogForm] = useForm();
  const [loading, setLoading] = useState(true);
  let verify = access ? true : false;
  localStorage.setItem("verify", verify);
  const ver = localStorage.getItem("verify");
  const [blogs, setBlogs] = useState([]);
  const { Dragger } = Upload;
  const [modalOpen, setModalOpen] = useState(false);
  const blogsRender = async () => {
    try {
      const res = await apiClient.get("/blog/list/");
      setBlogs(res?.data);
    } catch (error) {
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };
  const createBlog = async (value) => {
    const formData = new FormData();
    formData.append("title", value?.title);
    formData.append("description", value?.description);
    formData.append("category", value?.category);
    formData.append("image", value?.image?.file);
    const res = await apiClient.post("/blog/create/", formData);
    if ((res?.status == 200) | 201) {
      setModalOpen(false);
      blogsRender();
      blogForm.resetFields();
    }
  };

  useEffect(() => {
    blogsRender();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-[#F5F7FA] dark:bg-gray-500 py-10">
          <div className="w-11/12 sm:w-10/12 mx-auto bg-white dark:bg-gray-600 py-10 px-5 rounded-xl">
            <div className="text-end mb-10">
              {access && (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Create Blog
                </Button>
              )}
              <Modal
                open={modalOpen}
                className="text-xl dark:text-white font-semibold hover:text-red-500 transition"
                footer={null}
                onCancel={() => {
                  setModalOpen(false);
                }}
                title="Create new blog"
              >
                <Form onFinish={createBlog} form={blogForm}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    label="Title"
                    className="mt-10"
                    name={"title"}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    label="Category"
                    name={"category"}
                  >
                    <Select>
                      <Select.Option key={"1"}>1</Select.Option>
                      <Select.Option key={"2"}>2</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    label="Description"
                    className="mt-10"
                    name={"description"}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name={"image"}
                  >
                    <Dragger
                      beforeUpload={() => false}
                      maxCount={1}
                      accept=".png,.jpg,.jpeg"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag an poster file to upload
                      </p>
                      <p className="ant-upload-hint">
                        Only one file is allowed.
                      </p>
                    </Dragger>
                  </Form.Item>
                  <Form.Item style={{ textAlign: "end" }}>
                    <Button htmlType="submit" size="large" type="primary">
                      Add blog
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {blogs?.map((blog) =>
                ver === "true" ? (
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
                ) : (
                  <Link
                    to={"/login"}
                    key={blog?.id}
                    className="cursor-pointer p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h2 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">{blog?.title}</a>
                    </h2>
                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                      {blog?.description?.slice(0, 150)}
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
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
