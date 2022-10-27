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
 * 获取当前登录用户
 */
export async function getLoginUser() {
    return request<BaseResponse<UserType.UserVo>>('/admin/getInfo', {
        method: 'GET',
    });
}

/**
 * 分页获取用户列表
 * @param params
 */
export async function listUserByPage(params: UserType.UserQueryRequest) {
    return request<BaseResponse<PageVo<UserType.UserVo[]>>>('/admin/user/list', {
        method: 'GET',
        params,
    });
}

/**
 * 创建用户
 * @param params
 */
export async function addUser(params: UserType.UserAddRequest) {
    return request<BaseResponse<number>>('/admin/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}

/**
 * 更新用户
 * @param params
 */
export async function updateUser(params: UserType.UserUpdateRequest) {
    return request<BaseResponse<any>>(`/admin/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}

/**
 * 删除用户
 * @param params
 */
export async function deleteUser(params: UserType.UserDeleteRequest) {
    return request<BaseResponse<boolean>>(`/admin/user/${params.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}
