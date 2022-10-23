
declare namespace LogOperationType {

    interface Operation {
        operationLogId: number;
        operationIp?: string;
        operaLocation?: string;
        methods?: string;
        args?: string;
        operationName?: string;
        operationType?: string;
        returnValue?: string;
        createTime: Date;
        updateTime: Date;
    }

    interface LogOperationQueryRequest extends PageRequest {
        operationIp?: string;
        operaLocation?: string;
        methods?: string;
        args?: string;
        operationName?: string;
        operationType?: string;
        returnValue?: string;
        createTime: Date;
        updateTime: Date;
    }
}
