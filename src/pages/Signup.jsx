import { Button, Form, Input, Upload } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InboxOutlined,
} from "@ant-design/icons";
import ReactInputMask from "react-input-mask";
import { apiClient } from "../util/apiClient";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const registration = async (num) => {
    const formData = new FormData();
    num.phone = num.phone.replace(/\D/g, "");
    formData.append("full_name", num.full_name);
    formData.append("phone_number", num.phone);
    formData.append("password", num.password);
    formData.append("password2", num.password2);

    if (num.avatar && num.avatar.file) {
      formData.append("avatar", num.avatar.file);
    }
    if (num.phone.length < 9) {
      alert("Xatolik ketdi!");
    } else {
      num.phone = "+998" + num.phone;
      let res = await apiClient.post("/account/register/", formData);
      if (res?.status == 200 || res?.status == 201) {
        navigate("/login");
      }
    }
  };
  const { Dragger } = Upload;
  useEffect(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }, []);
  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-5">
  <div className="w-full max-w-[900px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 sm:p-10">
    <h1 className="text-3xl sm:text-4xl font-black text-center dark:text-white">Signup</h1>
    
    <div className="mt-10">
      <Form onFinish={registration}>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-5 gap-y-3 md:gap-y-10 mb-10">
          <Form.Item layout="vertical"
            label="Enter your FullName"
            rules={[{ required: true, message: "Please enter your name!" }]}
            name="full_name"
          >
            <Input placeholder="Enter your fullname" size="large" className="dark:bg-gray-700 dark:text-white" />
          </Form.Item>
          <Form.Item layout="vertical" name="phone" label="Enter your number">
            <ReactInputMask mask="(**)-***-**-**" maskChar="">
              {() => (
                <Input
                  addonBefore="+998"
                  placeholder="(**)-***-**-**"
                  size="large"
                  className="dark:bg-gray-700 dark:text-white"
                />
              )}
            </ReactInputMask>
          </Form.Item>
          <Form.Item layout="vertical"
            label="Enter Password"
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              { min: 6, message: "Password must be at least 6 characters long!" },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*().,?":{}|<>])[A-Za-z\d!@#$%^&*().,?":{}|<>]{6,}$/,
                message: "Password must contain letters, numbers & special characters!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>
          <Form.Item layout="vertical"
            label="Confirm Password"
            name="password2"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              { min: 6, message: "Password must be at least 6 characters long!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm your password"
              size="large"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>
          <div className="col-span-2">
            <Form.Item name="avatar">
              <Dragger beforeUpload={() => false} maxCount={1} accept=".png,.jpg,.jpeg">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag an avatar file to upload</p>
                <p className="ant-upload-hint text-gray-500 dark:text-gray-400">
                  Only one file is allowed.
                </p>
              </Dragger>
            </Form.Item>
          </div>
          
        </div>
        <Form.Item layout="vertical" className="text-center">
          <Button type="primary" htmlType="submit" size="large" className="w-full sm:w-auto">
            Submit
          </Button>
          <Button type="link" className="block sm:inline mt-3 sm:mt-0" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
</div>

  );
};

export default Signup;
