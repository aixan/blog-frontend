import {request} from '@umijs/max';

/**
 * 登录日志查询请求
 * @param params
 */
export async function listLogOperationPage(params: LogOperationType.LogOperationQueryRequest) {
    return request<BaseResponse<PageVo<LogOperationType.Operation[]>>>('/admin/log/operation', {
        method: 'GET',
        params,
    });
}
