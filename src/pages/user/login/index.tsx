import Logo from '@/assets/logo.svg';
import React, {useState} from 'react';
import {message, Tabs} from 'antd';
import {useModel} from "@umijs/max";
import {getLoginUser, userLogin} from "@/services/Admin/SysUserService";
import {LoginForm, ProFormCaptcha, ProFormText} from '@ant-design/pro-components';
import {LockOutlined, MobileOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useSearchParams} from "@@/exports";

// 登录方式
type LoginType = 'account' | 'phone';

export default () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const [searchParams] = useSearchParams();
    const {initialState, setInitialState} = useModel('@@initialState');

    const doUserLogin = async (fields: UserType.UserLoginRequest) => {
        const hide = message.loading('登录中');
        try {
            const res = await userLogin({...fields});
            hide();
            message.loading("登录成功");
            localStorage.setItem('token',res.data);
            const result = await getLoginUser();
            setInitialState({
                ...initialState,
                loginUser: result.data,
            } as InitialState);
            window.location.href = searchParams.get('redirect') ?? '/';
        } catch (e: any) {
            hide();
            message.loading(e.message);
        }
    }
    return (
        <div style={{
            // height: '100vh',
            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)',
            backgroundSize: '100% 100%',
        }}
        >
            <LoginForm<UserType.UserLoginRequest>
                logo={Logo}
                title="开发生存时间"
                subTitle='记录开发'
                onFinish={async (fromData: UserType.UserLoginRequest) => {
                    fromData.loginType = loginType
                    await doUserLogin(fromData);
                }}
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                    <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
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
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'请输入密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'} />,
                            }}
                            name="mobile"
                            placeholder={'手机号'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={'请输入验证码'}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'获取验证码'}`;
                                }
                                return '获取验证码';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <Link to="/user/register">新用户注册</Link>
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
