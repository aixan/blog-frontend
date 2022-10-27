import {request} from "@@/exports";


/**
 * 用户注册
 * @param params 登录请求对象
 */
export async function userRegister(params: UserType.UserRegisterRequest) {
    return request<BaseResponse<string>>('/front/user/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}
