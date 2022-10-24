
declare namespace NoticeType {

    interface NoticeVo {
        noticeId?: number;
        noticeTitle?: string;
        noticeType?: number;
        status?: number;
        noticeContent?: string;
        createBy?: string;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 添加公告
     */
    interface NoticeAddRequest {
        noticeTitle?: string;
        noticeType?: number;
        status?: number;
        noticeContent?: string;
        createBy?: string;
    }

    /**
     * 更新公告请求
     */
    interface NoticeUpdateRequest {
        noticeId?: number;
        noticeTitle?: string;
        noticeType?: number;
        status?: number;
        noticeContent?: string;
    }

    /**
     * 公告分页请求
     */
    interface NoticeQueryRequest extends PageRequest {
        noticeTitle?: string;
        noticeType?: number;
        status?: number;
        noticeContent?: string;
        createBy?: string;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 删除公告请求
     */
    interface NoticeDeleteRequest {
        noticeId: number;
    }
}
