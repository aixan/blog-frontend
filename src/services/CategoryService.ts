import {request} from '@umijs/max';

/**
 * 查询分类分页列表
 * @param params
 */
export function listCategoryPage(params: CategoryType.CategoryQueryRequest) {
    return request<BaseResponse<PageVo<TagType.TagVo[]>>>('/admin/category/list',{
        method: 'GET',
        params,
    })
}

/**
 * 添加分类
 */
export function addCategory(params: CategoryType.CategoryAddRequest){
    return request<BaseResponse<boolean>>('/admin/category',{
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}

/**
 * 更新分类
 */
export function updateCategory(params: CategoryType.CategoryUpdateRequest) {
    return request<BaseResponse<boolean>>('/admin/category',{
        method: 'PUT',
        header: {
          'Content-Type': 'application/json',
        },
        data: params
    })
}

/**
 * 删除分类
 * @param params
 */
export function deleteCategory(params: CategoryType.CategoryDeleteRequest){
    return request<BaseResponse<boolean>>(`/admin/category/${params.categoryId}`,{
        method: 'DELETE',
        header: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}
