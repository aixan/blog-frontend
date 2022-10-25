import {request} from '@umijs/max'

/**
 * 获取公告列表
 * @param params
 */
export function listNoticePage(params: NoticeType.NoticeQueryRequest) {
    return request<BaseResponse<PageVo<NoticeType.NoticeVo[]>>>('/admin/notice/list', {
        method: 'GET',
        params
    })
}

/**
 * 添加公告
 */
export function addNotice(params: NoticeType.NoticeAddRequest) {
    return request<BaseResponse<number>>('/admin/notice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params
    })
}

/**
 * 更新公告
 * @param params
 */
export function updateNotice(params: NoticeType.NoticeUpdateRequest) {
    return request<BaseResponse<any>>('/admin/notice',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params
    })
}

/**
 * 删除公告
 * @param params
 */
export function deleteNotice(params: NoticeType.NoticeDeleteRequest) {
    return request<BaseResponse<boolean>>(`/admin/notice/${params.noticeId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}
