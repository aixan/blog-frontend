

/**
 * 全局统一响应
 */
interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
}

interface InitialState {
    loginUser?: UserType.UserVo,
    roleMap?: number,
}
