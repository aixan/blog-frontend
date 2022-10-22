
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
     * 用户类型
     */
    interface UserVo {
        id: number;
        nickName?: string;
        username?: string;
        avatar?: string;
        gender?: number;
        userRole?: number;
        createTime?: Date;
        updateTime?: Date;
    }

}
