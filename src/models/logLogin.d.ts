
declare namespace LogLoginType {

    interface Login {
        loginLogId: number;
        loginName?: string;
        ipAddress?: string;
        loginLocation?: string;
        browserType?: string;
        os?: string;
        loginStatus?: number;
        createTime: Date;
        updateTime: Date;
    }

    interface LogLoginQueryRequest extends PageRequest {
        loginName?: string;
        ipAddress?: string;
        loginLocation?: string;
        browserType?: string;
        os?: string;
        loginStatus?: number;
        createTime: Date;
        updateTime: Date;
    }
}
