import {request} from '@umijs/max';

/**
 * 登录日志查询请求
 * @param params
 */
export async function listLogLoginPage(params: LogLoginType.LogLoginQueryRequest) {
    return request<BaseResponse<PageVo<LogLoginType.Login[]>>>('/admin/log/login', {
        method: 'GET',
        params,
    });
}
