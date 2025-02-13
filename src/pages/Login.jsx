import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import ReactInputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../util/apiClient";

const Login = () => {
  const navigate = useNavigate();
  const login = async (num) => {
    num.phone_number = num.phone_number.replace(/\D/g, "");
    if (num.phone_number.length < 9) {
      alert("Xatolik ketdi!");
    } else {
      num.phone_number = "+998" + num.phone_number;
      let res = await apiClient.post("/account/login/", num);
      if (res) {
        localStorage.setItem("access", res?.data?.data?.token?.access);
        localStorage.setItem("refresh", res?.data?.data?.token?.refresh);
      }
      if (res?.status == 200 || res?.status == 201) {
        window.location.pathname = "/home";
      }
    }
  };
  useEffect(() => {
    if (localStorage.removeItem("access")) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center text-center dark:bg-gray-900">
      <div className="w-[400px] py-5 px-10">
        <h1 className="text-4xl font-black text text-regal-blue mb-10 dark:text-white">
          Login
        </h1>
        <Form onFinish={login} layout="vertical">
          <Form.Item
            name={"phone_number"}
            label="Enter your Number"
            layout="vertical"
            rules={[{ required: true, message: "Number is required!" }]}
          >
            <ReactInputMask mask={"(**)-***-**-**"} maskChar="">
              {() => {
                return (
                  <Input
                    addonBefore={"+998"}
                    placeholder="(**)-***-**-**"
                    size="large"
                  />
                );
              }}
            </ReactInputMask>
          </Form.Item>
          <Form.Item
            layout="vertical"
            label="Enter your Password"
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              placeholder="Please confirm your password!"
              size="large"
              iconRender={(visible) => null}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" size="large">
              Submit
            </Button>
            <Button
              type="link"
              onClick={() => {
                navigate("/register");
              }}
            >
              Registration
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
