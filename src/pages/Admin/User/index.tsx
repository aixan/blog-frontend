import React, {useRef, useState} from "react";
import {listUserByPage, deleteUser} from '@/services/UserService';
import {Space, Divider, Typography, Popconfirm, message,Button} from 'antd';
import {ActionType, PageContainer, ProColumns, ProTable,} from "@ant-design/pro-components";
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';


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
}

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
     * B表格列配置
     */
    const columns: ProColumns<UserType.UserVo>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            valueType: 'index',
        },
        {
            title: '用户昵称',
            dataIndex: 'nickName',
            valueType: 'text',
        },
        {
            title: '账号',
            dataIndex: 'username',
            valueType: 'text',
        },
        {
            title: '用户头像',
            dataIndex: 'avatar',
            valueType: 'image',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            valueEnum: {
                0: {text: '男'},
                1: {text: '女'},
            },
        },
        {
            title: '电子邮箱',
            dataIndex: 'email',
            valueType: 'text',
        },
        {
            title: '手机',
            dataIndex: 'phone',
            valueType: 'text',
        },
        {
            title: '用户角色',
            dataIndex: 'userRole',
            valueEnum: {
                0: {text: '普通用户'},
                1: {text: '管理员'},
            },
        },
        {
            title: '用户状态',
            dataIndex: 'status',
            valueEnum: {
                0: {text: '正常'},
                1: {text: '禁用'},
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInForm: true,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            hideInForm: true,
        },
        {
            title: '操作',
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
                onSubmit={() => setCreateModalVisible(false)}
                onCancel={() => setCreateModalVisible(false)}
            />
            <UpdateModal
                oldData={updateData}
                modalVisible={updateModalVisible}
                columns={columns}
                onSubmit={() => setUpdateModalVisible(false)}
                onCancel={() => setUpdateModalVisible(false)}
            />
        </PageContainer>
    )
}

export default AdminUserPage;
