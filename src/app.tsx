// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import Logo from '@/assets/logo.svg'
import GlobalFooter from '@/components/GlobalFooter';
import RightContent from '@/components/GlobalHeader/RightContent'
import {RequestConfig} from "@@/plugin-request/request";
import {getLoginUser} from "@/services/Admin/SysUserService";
import { RunTimeLayoutConfig } from '@@/plugin-layout/types';
import './global.less';
import React from "react";

/**
 * 全局初始化数据配置，用于 Layout 用户信息和权限初始化
 * 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
 */
export async function getInitialState(): Promise<InitialState> {
    const defaultState: InitialState = {
        loginUser: undefined,
        roleMap: 0,
    };
    // 获取当前登录用户
    try {
        const res = await getLoginUser();
        defaultState.loginUser = res.data;
        defaultState.roleMap = res.data.userRole;
    } catch (e:any) {
        localStorage.clear();
        // message.error("获取用户出错：" + e.message);
    }
    return defaultState;
}

/**
 * 全局布局配置
 * @param initialState
 */
export const layout: RunTimeLayoutConfig = ({initialState}) => {

    return {
        title: '开发生存时间',
        logo: Logo,
        menu: {
            locale: false,
        },
        fixedHeader: false,
        layout: 'top',
        contentStyle: {
            paddingBottom: 120,
        },
        // onPageChange: (location: Location) =>{
        //
        // },
        // 默认布局调整
        footerRender: () =>  <GlobalFooter />,
        rightContentRender: () => <RightContent />,
        menuExtraRender: () => <span>menuExtraRender</span>,
        menuFooterRender: () => <span>menuFooterRender</span>,
        // headerContentRender: () => <span>headerContentRender</span>,
    }
}

const isDev = process.env.NODE_ENV === 'development';

/**
 * 全局请求配置
 * https://umijs.org/docs/max/request
 */
export const request: RequestConfig = {
    baseURL: isDev ? 'http://localhost:8080/api' : '',
    timeout: 10000,
    withCredentials: true,
    // other axios options you want
    errorConfig: {
        errorHandler() {
        },
        errorThrower() {
        },
    },
    requestInterceptors: [
        (url, options) => {
            let token = localStorage.getItem('token');
            const headers = {
                Authorization: token,
            }
            return {
                url, options: {...options, headers}
            }
        }
    ],
    responseInterceptors: [
        (response) => {
            // 不再需要异步处理读取返回体内容，可直接在 data 中读出，部分字段可在 config 中找到
            const data: any = response.data;
            const path = response.request.responseURL;
            if (!data) {
                throw new Error('服务异常');
            }
            const code = data.code ?? 50000;
            // 未登录，且不为获取用户登录信息接口
            if (
                code === 40100 &&
                !path.includes('admin/login') &&
                !location.pathname.includes('/user/login')
            ) {
                // 跳转至登录页
                localStorage.clear();
                // window.location.href = `/user/login?redirect=${window.location.href}`;
                // throw new Error('请先登录');
            }
            if (code !== 0) {
                console.error(`request error, path = ${path}`, data);
                throw new Error(data.message ?? '服务器错误');
            }
            // do something
            return response;
        },
    ],

};
