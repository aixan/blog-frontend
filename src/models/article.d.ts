
declare namespace ArticleType {

    interface ArticleVo {
        articleId?: number;
        articleTitle?: string;
        userId?: number;
        categoryId?: number;
        content?: string;
        totalViews?: number;
        status?: number;
        articleDesc?: string;
        imageUrl?: string;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 查询文章分页
     */
    interface ArticleQueryRequest  extends PageRequest {
        articleTitle?: string;
        userId?: number;
        categoryId?: number;
        totalViews?: number;
        status?: number;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 添加文章
     */
    interface ArticleAddRequest {
        articleTitle?: string;
        userId?: number;
        categoryId?: number;
        content?: string;
        totalViews?: number;
        status?: number;
        articleDesc?: string;
        imageUrl?: string;
    }

    /**
     * 更新文章
     */
    interface ArticleUpdateRequest {
        articleId?: number;
        articleTitle?: string;
        userId?: number;
        categoryId?: number;
        content?: string;
        totalViews?: number;
        status?: number;
        articleDesc?: string;
        imageUrl?: string;
    }

    /**
     * 删除文章
     */
    interface ArticleDeleteRequest {
        articleId?: number;
    }
}
