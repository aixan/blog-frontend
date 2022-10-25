import React, {useRef} from 'react';
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {listLogLoginPage} from "@/services/Admin/SysLogLoginService";
import {Space, Tag} from "antd";

const LogLoginPage: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<LogLoginType.Login>[] = [
        {
            title: 'ID',
            align: 'center',
            dataIndex: 'loginLogId',
            valueType: 'index',
        },
        {
            title: '登录账号',
            align: 'center',
            dataIndex: 'loginName',
            valueType: 'text',
        },
        {
            title: '登录IP',
            align: 'center',
            dataIndex: 'ipAddress',
            valueType: 'text',
        },
        {
            title: '登录地址',
            align: 'center',
            dataIndex: 'loginLocation',
            valueType: 'text',
        },
        {
            title: '浏览器类型',
            align: 'center',
            dataIndex: 'browserType',
            valueType: 'text',
        },
        {
            title: '登录系统',
            align: 'center',
            dataIndex: 'os',
            valueType: 'text',
        },
        {
            title: '登录状态',
            align: 'center',
            dataIndex: 'loginStatus',
            render: status => (
                <Space>
                    {
                        status === 0 ? (
                            <Tag color={'success'}>
                                登录成功
                            </Tag>
                        ) : (
                            <Tag color={'error'}>
                                登录失败
                            </Tag>
                        )
                    }
                </Space>
            )
        },
        {
            title: '登录时间',
            align: 'center',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInForm: true,
        },
    ]

    return (
        <PageContainer>
            <ProTable<LogLoginType.Login>
                headerTitle={'登录日志'}
                actionRef={actionRef}
                rowKey={'loginLogId'}
                search={{
                    labelWidth: 'auto',
                }}
                request={async (params, sorter, filter) => {
                    const {data, code} = await listLogLoginPage({
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

export default LogLoginPage;
