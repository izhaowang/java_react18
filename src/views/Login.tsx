import React, { useState } from 'react';
import { Card, Space, Button, Form, Input, Tag, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { userLogin } from "../api/user";
import { useNavigate } from "react-router-dom";
import useToken from '../store/index.js';
import "./Login.scss"

const Login: React.FC = () => {
  const { token, setToken } = useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [visiable, setVisiable] = useState(false);
  const nav = useNavigate();
  const onFinish = async (values: object) => {
    console.log('Success:', values);
    let res = await userLogin(values)
    console.log(res);
    if (res.code === 0) {
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
      setToken(res.data);
      nav("/");
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    confirm?: string,
  };
  type ValidateRule = {
    required?: true,
    message: string,
    max?: number,
    min?: number,
  }

  const useV: ValidateRule[] = [
    {
      required: true, message: 'Please input !', min: 6, max: 16
    }

  ]
  return (
    <div className='login_content'>
      {contextHolder}
      <Space direction="vertical" >
        <Card style={{ width: 500, opacity: 0.93 }}>
          <Form
            className={!visiable ? "show" : "hidden"}
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 18, }}
            style={{ maxWidth: 600 }}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={useV}
              validateTrigger="onBlur"
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={useV}
              validateTrigger="onBlur"
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 12, span: 25 }}>


              <Button type="primary" htmlType="submit"

              >
                Login
              </Button>
            </Form.Item>
            <Tag style={{ cursor: "pointer" }} onClick={() => {
              setVisiable(!visiable)
            }}>{!visiable ? "Registry" : "Login"}</Tag>
          </Form>
          <Form
            className={visiable ? "show" : "hidden"}
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 18, }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={useV}
              validateTrigger="onBlur"
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item<FieldType>
              label="rePassword"
              name="password"
              rules={useV}
              validateTrigger="onBlur"
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirm"
              dependencies={['password']}


              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 12, span: 25 }}>
              <Button type="primary" htmlType="submit">
                Registry
              </Button>

            </Form.Item>
            <Tag style={{ cursor: "pointer" }} onClick={() => {
              setVisiable(!visiable)
            }}>{!visiable ? "Registry" : " Login"}</Tag>
          </Form>
        </Card>
      </Space >
    </div >

  )
};
export default Login;