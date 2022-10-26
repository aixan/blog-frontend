import Logo from '@/assets/logo.svg';
import React from 'react';
import {message} from 'antd';
import {useModel} from "@umijs/max";
import {getLoginUser, userLogin} from "@/services/Admin/SysUserService";
import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useSearchParams} from "@@/exports";


export default () => {
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
                    await doUserLogin(fromData);
                }}
            >
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
