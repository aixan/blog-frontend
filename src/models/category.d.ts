
declare namespace CategoryType {

    interface CategoryVo {
        categoryId?: number;
        categoryName?: string;
        articleCount?: number;
        categoryDesc?: string;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 查询分类分页列表
     */
    interface CategoryQueryRequest extends PageRequest{
        categoryName?: string;
        articleCount?: number;
        categoryDesc?: string;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 添加分类
     */
    interface CategoryAddRequest {
        categoryName?: string;
        categoryDesc?: string;
    }

    /**
     * 更新分类
     */
    interface CategoryUpdateRequest {
        categoryId?: number;
        categoryName?: string;
        categoryDesc?: string;
    }

    /**
     * 删除分类
     */
    interface CategoryDeleteRequest{
        categoryId?: number;
    }
}
