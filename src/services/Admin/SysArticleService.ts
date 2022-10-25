import {request} from '@umijs/max';

/**
 * 查询万丈分页列表
 * @param params
 */
export function listArticlePage(params: ArticleType.ArticleQueryRequest) {
    return request<BaseResponse<PageVo<ArticleType.ArticleVo[]>>>('/admin/article/list',{
        method: 'GET',
        params,
    })
}

/**
 * 添加文章
 */
export function addArticle(params: ArticleType.ArticleAddRequest){
    return request<BaseResponse<boolean>>('/admin/article',{
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}

/**
 * 更新文章
 */
export function updateArticle(params: ArticleType.ArticleUpdateRequest) {
    return request<BaseResponse<boolean>>('/admin/article',{
        method: 'PUT',
        header: {
          'Content-Type': 'application/json',
        },
        data: params
    })
}

/**
 * 删除文章
 * @param params
 */
export function deleteArticle(params: ArticleType.ArticleDeleteRequest){
    return request<BaseResponse<boolean>>(`/admin/article/${params.articleId}`,{
        method: 'DELETE',
        header: {
            'Content-Type': 'application/json',
        },
        data: params,
    })
}
