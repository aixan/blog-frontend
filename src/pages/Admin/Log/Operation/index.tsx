import React, {useRef} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {listLogOperationPage} from "@/services/LogOperationService";
import {Space, Tag} from "antd";

const LogOperationPage: React.FC = () => {
    const actionRef = useRef<ActionType>()

    const columns: ProColumns<LogOperationType.Operation>[] = [

        {
            title: 'ID',
            align: 'center',
            dataIndex: 'operationLogId',
            valueType: 'index',
        },
        {
            title: '操作地址',
            align: 'center',
            dataIndex: 'operationIp',
            valueType: 'text',
        },
        {
            title: '操作地址',
            align: 'center',
            dataIndex: 'operaLocation',
            valueType: 'text',
        },
        {
            title: '操作人',
            align: 'center',
            dataIndex: 'operationName',
            valueType: 'text',
        },
        {
            title: '操作类型',
            align: 'center',
            dataIndex: 'operationType',
            valueType: 'text',
        },
        {
            title: '操作时间',
            align: 'center',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInForm: true,
        },
    ]

    return (
        <PageContainer>
            <ProTable<LogOperationType.Operation>
                headerTitle={'操作日志'}
                rowKey={'operationLogId'}
                actionRef={actionRef}
                search={{
                    labelWidth: 'auto',
                }}
                request={async (params, sorter, filter) => {
                    const {data, code} = await listLogOperationPage({
                        ...params,
                        // @ts-ignore
                        sorter,
                        filter
                    })
                    return {
                        data: data?.records || [],
                        success: code === 0,
                        total: data.total,
                    } as any;
                }}
                columns={columns}
            />
        </PageContainer>
    );
}

export default LogOperationPage;
