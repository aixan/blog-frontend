import React, {useRef, useState} from "react";
import {listUserByPage, deleteUser} from '@/services/UserService';
import {Space, Divider, Typography, Popconfirm, message, Button, Tag} from 'antd';
import {ActionType, PageContainer, ProColumns, ProTable,} from "@ant-design/pro-components";
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

/**
 * 用户管理页面
 * @constructor
 */
const AdminUserPage: React.FC<unknown> = () => {
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<UserType.UserVo>({});
    const actionRef = useRef<ActionType>();

    /**
     * 删除数据
     * @param selectedRows
     */
    const doDelete = async (selectedRows: UserType.UserVo[]) => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            await deleteUser({
                id: selectedRows.find((row) => row.id)?.id || 0,
            });
            hide();
            message.success('操作成功');
        } catch (e: any) {
            hide();
            message.error('操作失败，' + e.message);
        }
        actionRef.current?.reload(true);
    }

    /**
     * 表格列配置
     */
    const columns: ProColumns<UserType.UserVo>[] = [
        {
            title: 'ID',
            align: 'center',
            dataIndex: 'id',
            valueType: 'index',
        },
        {
            title: '用户昵称',
            align: 'center',
            dataIndex: 'nickName',
            valueType: 'text',
        },
        {
            title: '账号',
            align: 'center',
            copyable: true,
            dataIndex: 'username',
            valueType: 'text',
        },
        {
            title: '密码',
            align: 'center',
            dataIndex: 'password',
            valueType: 'password',
            hideInTable: true,
        },
        {
            title: '用户头像',
            align: 'center',
            dataIndex: 'avatar',
            valueType: 'image',
        },
        {
            title: '性别',
            align: 'center',
            dataIndex: 'gender',
            valueType: 'select',
            fieldProps: {
                options: [
                    {label: '男', value: 0},
                    {label: '女', value: 1},
                ],
            },
        },
        {
            title: '电子邮箱',
            align: 'center',
            copyable: true,
            dataIndex: 'email',
            valueType: 'text',
        },
        {
            title: '手机',
            align: 'center',
            copyable: true,
            dataIndex: 'phone',
            valueType: 'text',
        },
        {
            title: '用户角色',
            align: 'center',
            dataIndex: 'userRole',
            valueType: 'select',
            fieldProps: {
                options: [
                    {label: '普通用户', value: 0},
                    {label: '管理员', value: 1},
                ],
            },
        },
        {
            title: '用户状态',
            align: 'center',
            dataIndex: 'status',
            valueType: 'select',
            fieldProps: {
                options: [
                    {label: '正常', value: 0},
                    {label: '禁用', value: 1},
                ],
            },
            render: (_, record) => (
                <Space>
                    {
                        record.status === 0 ? (
                            <Tag color={'success'}>
                                正常
                            </Tag>
                        ) : (
                            <Tag color={'error'}>
                                关闭
                            </Tag>
                        )
                    }
                </Space>
            )
        },
        {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInForm: true,
        },
        {
            title: '更新时间',
            align: 'center',
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            hideInForm: true,
        },
        {
            title: '操作',
            align: 'center',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <Space split={<Divider type="vertical"/>}>
                    <Typography.Link
                        onClick={() => {
                            setUpdateData(record);
                            setUpdateModalVisible(true);
                        }}
                    >
                        修改
                    </Typography.Link>
                    <Popconfirm
                        title="您确定要删除么？"
                        onConfirm={() => doDelete([record])}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Typography.Link type="danger">删除</Typography.Link>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <PageContainer>
            <ProTable<UserType.UserVo>
                headerTitle={"用户管理"}
                actionRef={actionRef}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                toolBarRender={() => [
                    <Button
                        key="1"
                        type="primary"
                        onClick={() => setCreateModalVisible(true)}
                    >
                        新建
                    </Button>,
                ]}
                request={async (params, sorter, filter) => {
                    const {data, code} = await listUserByPage({
                        ...params,
                        // @ts-ignore
                        sorter,
                        filter,
                    })
                    return {
                        data: data?.records || [],
                        success: code === 0,
                        total: data.total,
                    } as any;
                }}
                columns={columns}
            />
            <CreateModal
                modalVisible={createModalVisible}
                columns={columns}
                onSubmit={() => {
                    setCreateModalVisible(false)
                    actionRef.current?.reload(true)
                }}
                onClose={() => setCreateModalVisible(false)}
            />
            <UpdateModal
                oldData={updateData}
                modalVisible={updateModalVisible}
                columns={columns}
                onSubmit={() => {
                    setUpdateModalVisible(false)
                    actionRef.current?.reload(true)
                }}
                onClose={() => setUpdateModalVisible(false)}
            />
        </PageContainer>
    )
}

export default AdminUserPage;
