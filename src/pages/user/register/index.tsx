import Logo from '@/assets/logo.svg';
import { useNavigate } from '@umijs/max';
import {message} from "antd";
import {userRegister} from "@/services/UserService";
import {LoginForm, ProFormCaptcha, ProFormText} from "@ant-design/pro-components";
import {LockOutlined, MailTwoTone, UserOutlined, PhoneOutlined} from "@ant-design/icons";
import {Link} from "@@/exports";
import React from "react";


export default () => {
    const navigate = useNavigate();

    /**
     * 用户注册
     */
    const doUserRegister = async (fields: UserType.UserRegisterRequest) => {
        const hide = message.loading('注册中');
        try {
            await userRegister({...fields});
            hide();
            message.loading("注册成功");
            navigate('/user/login', {
                replace: true,
            })
        } catch (e: any) {
            hide();
            message.error('注册失败，请重试！');
        }
    }

    const waitTime = (time: number = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };

    /**
     * 校验手机号码
     * @param rule
     * @param value
     * @param callback
     */
    const checkPhone = (rule: any, value: string, callback: any) =>{
        console.log(value)
        if (value) {
            let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (!reg.test(value)) {
                callback("手机号码输入有误")
            } else {
                callback()
            }
        } else {
            callback('手机号码不能为空')
        }
    }

    return (
        <div
            style={{
                // height: '100vh',
                background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)',
                backgroundSize: '100% 100%',
            }}
        >
            <LoginForm<UserType.UserRegisterRequest>
                logo={Logo}
                title="开发生存时间"
                subTitle="记录开发"
                submitter={{
                    searchConfig: {
                        submitText: '注册',
                    },
                }}
                onFinish={async (formData) => {
                    await doUserRegister(formData);
                }}
            >
                <>
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'请输入账号'}
                        rules={[
                            {
                                required: true,
                                message: '请输入账号!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'请输入密码'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="checkPassword"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'请输入确认密码'}
                        rules={[
                            {
                                required: true,
                                message: '请输入确认密码！',
                            },
                        ]}
                    />
                    <ProFormText
                        name="phone"
                        fieldProps={{
                            size: 'large',
                            prefix: <PhoneOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'请输入手机号'}
                        rules={[
                            {
                                validator: checkPhone,
                            },
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <MailTwoTone />,
                        }}
                        captchaProps={{
                            size: 'large',
                        }}
                        // 手机号的 name，onGetCaptcha 会注入这个值
                        phoneName="phone"
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                            {
                                len: 6,
                                message: '请输入6位验证码',
                            },
                        ]}
                        placeholder="请输入验证码"
                        // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
                        // throw new Error("获取验证码错误")
                        onGetCaptcha={async (phone) => {
                            await waitTime(1000);
                            message.success(`手机号 ${phone} 验证码发送成功!`);
                        }}
                    />
                </>
                <div
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <Link to="/user/login">老用户登录</Link>
                    <Link
                        to="/"
                        style={{
                            float: 'right',
                        }}
                    >
                        返回主页
                    </Link>
                </div>
            </LoginForm>
        </div>
    );
}
