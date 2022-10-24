import {request} from '@umijs/max'


export function listTagPage(params: TagType.TagQueryPage) {
    return request<BaseResponse<PageVo<TagType.TagVo[]>>>('/admin/tag/list',{
        method: 'GET',
        params,
    })
}

/**
 * 添加标签
 * @param params
 */
export function addTag(params: TagType.TagAddRequest) {
    return request<BaseResponse<boolean>>('/admin/tag',{
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        data: params,
    })
}

/**
 * 更新标签
 * @param params
 */
export function updateTag(params: TagType.TagUpdateRequest) {
    return request<BaseResponse<any>> ('/admin/tag',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}

export function deleteTag(params: TagType.TagDeleteRequest) {
    return request<BaseResponse<any>> (`/admin/tag/${params.tagId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}
