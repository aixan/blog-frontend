
declare namespace UserType {

    /**
     * 登录请求
     */
    interface UserLoginRequest {
        username: string;
        password: string;
    }

    /**
     * 用户注册请求
     */
    interface UserRegisterRequest {
        username: string;
        password: string;
        checkPassword: string;
        phone: string;
        captcha: number;
    }

    /**
     * 用户创建请求
     */
    interface UserAddRequest {
        nickName: string;
        username: string;
        password: string;
        avatar?: string;
        gender?: number;
        phone?: string;
        email?: string;
        userRole: number;
    }

    /**
     * 用户类型
     */
    interface UserVo {
        id?: number;
        nickName?: string;
        username?: string;
        password?: string;
        avatar?: string;
        gender?: number;
        phone?: string;
        email?: string;
        userRole?: number;
        status?: number;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 用户查询请求
     */
    interface UserQueryRequest extends PageRequest {
        id?: number;
        nickName?: string;
        username?: string;
        avatar?: string;
        gender?: number;
        phone?: string;
        email?: string;
        userRole?: number;
        status?: number;
        createTime?: Date;
        updateTime?: Date;
    }

    /**
     * 用户更新请求
     */
    interface UserUpdateRequest {
        id: number;
        nickName?: string;
        username?: string;
        avatar?: string;
        gender?: number;
        phone?: string;
        email?: string;
        userRole?: number;
        status?: number;
    }

    /**
     * 用户删除请求
     */
    interface UserDeleteRequest {
        id: number;
    }
}
