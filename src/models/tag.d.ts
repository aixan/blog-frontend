

declare namespace TagType {

    interface TagVo {
        tagId?: number;
        tagName?: string;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 标签分页列表
     */
    interface TagQueryPage extends PageRequest {
        tagName?: string;
        createTime: Date;
        updateTime: Date;
    }

    /**
     * 添加标签
     */
    interface TagAddRequest {
        tagName?: string;
    }


    /**
     * 更新标签
     */
    interface TagUpdateRequest {
        tagId?: number;
        tagName?: string;
    }

    /**
     * 删除标签
     */
    interface TagDeleteRequest {
        tagId?: number;
    }
}
