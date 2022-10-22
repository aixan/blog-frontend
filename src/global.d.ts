

/**
 * 分页信息
 */
interface PageVo<T> {
    current: number;
    size: number;
    total: number;
    records: T[];
}

/**
 * 分页请求
 */
interface PageRequest {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: 'ascend' | 'descend';
}

/**
 * 全局统一响应
 */
interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
}

/**
 * 全局初始化状态
 */
interface InitialState {
    loginUser?: UserType.UserVo,
    roleMap?: number,
}
