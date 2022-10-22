import {request} from '@umijs/max';

/**
 * 用户登录
 * @param params 登录请求对象
 */
export async function userLogin(params: UserType.UserLoginRequest) {
    return request<BaseResponse<string>>('/admin/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}

/**
 * 用户退出
 */
export async function userLogout() {
    return request<BaseResponse<string>>('/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

/**
 * 用户注册
 * @param params 登录请求对象
 */
export async function userRegister(params: UserType.UserRegisterRequest) {
    return request<BaseResponse<string>>('/user/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}

/**
 * 获取当前登录用户
 */
export async function getLoginUser() {
    return request<BaseResponse<UserType.UserVo>>('/admin/getInfo', {
        method: 'GET',
    });
}
