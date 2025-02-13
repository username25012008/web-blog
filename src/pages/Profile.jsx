import React, { useContext, useEffect, useRef, useState } from "react";
import { Person } from "../context/PersonProvider";
import { apiClient } from "../util/apiClient";
import { notification, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Spinner from "./Spinner";
const Profile = () => {
  const { info, setInfo } = useContext(Person);
  let access = localStorage.getItem("access");
  const formRef = useRef();
  const [loading,setLoading]=useState(true)
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [birth, setBirth] = useState();
  const [town, setTown] = useState();
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const { Dragger } = Upload;
  const [disable, setDisable] = useState(true);
  const person = async () => {
    try {
      const res = await apiClient.get("/account/me/", access);
    if (res?.data?.gender == 0) {
      const person = { ...res.data };
      person.gender = 1;
      person.gender == 1
        ? (person.gender_display = "Male")
        : person.gender == 2 && (person.gender_display = "Female");

      setInfo(person);
    } else {
      const person = { ...res.data };
      person.gender == 1
        ? (person.gender_display = "Male")
        : person.gender == 2 && (person.gender_display = "Female");

      setInfo(person);
    }
    } catch (error) {
      notification.error({message:error.message})
    } finally {
      setLoading(false)
    }
  };
  const editHandle = () => {
    let formData = new FormData();
    formData.append("full_name", name);
    formData.append("phone_number", number);
    formData.append("gender", formRef?.current?.gender?.value);
    formData.append(
      "gender_display",
      formRef?.current?.gender?.value == 1 ? "Male" : "Female"
    );
    formData.append("town_city", town);
    formData.append("email", email);
    formData.append("date_birth", birth);
    formRef?.current?.avatar?.files[0];
    if (avatar) {
      formData.append("avatar", avatar);
    }
    let res = apiClient.put("/account/me/", formData);
    notification.info({
      message: "Refresh site please",
      description: "Refresh site because you edit your profile",
    });
  };

  const handleFileChange = (info) => {
    info.fileList[0].originFileObj && setAvatar(info.fileList[0].originFileObj);
  };
  useEffect(() => {
    setName(info?.full_name || "");
    setNumber(info?.phone_number || "");
    setBirth(info?.date_birth || "Unknown");
    setTown(info?.town_city || "Unknown");
    setEmail(info?.email || "Unknown");
  }, [info]);
  useEffect(() => {
    person();
  }, []);
  return (
    <>
    {loading ? (<Spinner />) : (<div className="bg-[#F5F7FA] dark:bg-gray-900 py-10 px-4 sm:px-0">
      <div className="max-w-[900px] mx-auto">
        <form ref={formRef}>
          <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
            <div className="flex items-center gap-7">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src={info?.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold dark:text-white">
                  {info?.full_name}
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {info?.phone_number}
                </p>
              </div>
            </div>
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  className="text-xl font-semibold pl-2 dark:text-gray-300"
                  htmlFor="full_name"
                >
                  Full name
                </label>
                <input
                  type="text"
                  className="outline-0 text-lg font-normal bg-[#f5f7fa] dark:bg-gray-700 dark:text-white py-2 px-3 rounded-lg"
                  name="full_name"
                  id="full_name"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                  disabled={disable}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-xl font-semibold pl-2 dark:text-gray-300"
                  htmlFor="phone_number"
                >
                  Number
                </label>
                <input
                  type="text"
                  className="outline-0 text-lg font-normal bg-[#f5f7fa] dark:bg-gray-700 dark:text-white py-2 px-3 rounded-lg"
                  name="phone_number"
                  id="phone_number"
                  value={number}
                  onInput={(e) => setNumber(e.target.value)}
                  disabled={disable}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-xl font-semibold pl-2 dark:text-gray-300"
                  htmlFor="date_birth"
                >
                  Birth date
                </label>
                <input
                  type="date"
                  className="outline-0 text-lg font-normal bg-[#f5f7fa] dark:bg-gray-700 dark:text-white py-2 px-3 rounded-lg"
                  name="date_birth"
                  id="date_birth"
                  value={birth}
                  onInput={(e) => setBirth(e.target.value)}
                  disabled={disable}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-xl font-semibold pl-2 dark:text-gray-300"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  disabled={disable}
                  className="appearance-none outline-0 text-lg font-normal bg-[#f5f7fa] py-2 px-3 rounded-lg"
                >
                  {info?.gender == 1 ? (
                    <>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </>
                  ) : (
                    <>
                      <option value="2">Female</option>
                      <option value="1">Male</option>
                    </>
                  )}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-xl font-semibold pl-2 dark:text-gray-300"
                  htmlFor="town"
                >
                  Town
                </label>
                <input
                  type="text"
                  className="outline-0 text-lg font-normal bg-[#f5f7fa] dark:bg-gray-700 dark:text-white py-2 px-3 rounded-lg"
                  name="town"
                  id="town"
                  value={town}
                  onInput={(e) => setTown(e.target.value)}
                  disabled={disable}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-xl font-semibold pl-2 dark:text-gray-300"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="outline-0 text-lg font-normal bg-[#f5f7fa] dark:bg-gray-700 dark:text-white py-2 px-3 rounded-lg"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  disabled={disable}
                />
              </div>
            </div>
            <div className={`mt-5 ${disable && "hidden"}`}>
              <label htmlFor="avatar"></label>
              <Dragger
                onChange={handleFileChange}
                type="avatar"
                id="avatar"
                beforeUpload={() => false}
                maxCount={1}
                accept=".png,.jpg,.jpeg"
                className="dark:border-gray-600"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined className="dark:text-gray-300" />
                </p>
                <p className="ant-upload-text dark:text-gray-300">
                  Click or drag an avatar file to upload
                </p>
                <p className="ant-upload-hint dark:text-gray-400">
                  Only one file is allowed.
                </p>
              </Dragger>
            </div>
            <div className={`text-end mt-10`}>
              <button
                type="button"
                className={`px-10 py-3 inline-block rounded-lg text-white ${
                  disable
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
                onClick={() => {
                  disable ? setDisable(false) : setDisable(true);
                  disable == false && editHandle();
                }}
              >
                {disable == false ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>)}
    </>
  );
};

export default Profile;
