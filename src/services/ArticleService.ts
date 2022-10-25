import {request} from "@umijs/max";

/**
 * 首页获取文章列表
 * @param params
 */
export function articlePage(params: ArticleType.ArticleQueryRequest) {
    return request<BaseResponse<PageVo<ArticleType.ArticleIndexVo>>>('/front/article/list',{
        method: 'GET',
        params
    })
}

/**
 * 根据文章id获取文章
 */
export function articleById(params: number) {
    return request<BaseResponse<ArticleType.ArticleVo>>(`/front/article/${params}`,{
        method: 'GET',
        params
    })
}
