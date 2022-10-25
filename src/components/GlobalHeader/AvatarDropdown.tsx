import React from 'react';
import {useModel, history} from "@umijs/max";
import {Avatar, Button, Dropdown, Menu, message} from "antd";
import {Link} from "@@/exports";
import styles from './index.less';
import {stringify} from 'querystring';
import {userLogout} from "@/services/Admin/SysUserService";
import {LogoutOutlined} from "@ant-design/icons";

/**
 * 头像下拉菜单
 * @constructor
 */
const AvatarDropdown: React.FC = () => {
    // 获取登录用户
    const {initialState, setInitialState} = useModel('@@initialState');
    const loginUser = initialState?.loginUser;

    const onMenuClick = async (event: {
        key: React.Key;
        keyPath: React.Key[];
    }) => {
        const {key} = event;

        if (key === 'logout') {
            try {
                await userLogout();
                message.success('已退出登录');
                localStorage.clear();
            } catch (e: any) {
                message.error('操作失败');
            }
            // @ts-ignore
            await setInitialState({...initialState, loginUser: undefined});
            history.replace({
                pathname: '/user/login',
                search: stringify({
                    redirect: window.location.href,
                }),
            });
            return;
        }
    };

    /**
     * 下拉菜单
     */
    const menuHeaderDropdown = loginUser ? (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key='current' disabled>
                {loginUser.nickName}
            </Menu.Item>
            <Menu.Item key={'logout'}>
                <span style={{color: 'red'}}>
                    <LogoutOutlined/>
                    退出登录
                </span>
            </Menu.Item>
        </Menu>
    ) : (
        <></>
    );

    return loginUser ? (
        <Dropdown
            overlayClassName={(styles.container)}
            overlay={menuHeaderDropdown}
        >
            <div className={`${styles.action} ${styles.account}`}>
                <Avatar src={loginUser.avatar}></Avatar>
            </div>
        </Dropdown>
    ) : (
        <Link to='/user/login'>
            <Button type='primary' ghost>登录</Button>
        </Link>
    );
}

export default AvatarDropdown;
