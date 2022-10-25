import React, {useRef, useState} from "react";
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, Divider, message, Popconfirm, Space, Typography} from "antd";
import {listTagPage,deleteTag} from "@/services/TagService";
import CreateModal from "@/pages/Admin/Tag/components/CreateModal";
import UpdateModal from "@/pages/Admin/Tag/components/UpdateModal";

/**
 * 标签管理页面
 * @constructor
 */
const AdminTagPage: React.FC<unknown> = () => {
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<TagType.TagVo>({});
    const actionRef = useRef<ActionType>();

    /**
     * 删除标签数据
     * @param selectedRows
     */
    const doDelete = async (selectedRows: TagType.TagVo[]) => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            await deleteTag({
                tagId: selectedRows.find((row) => row.tagId)?.tagId || 0,
            });
            hide();
            message.success('操作成功');
        } catch (e: any) {
            hide();
            message.error('操作失败，' + e.message);
        }
        actionRef.current?.reload(true);
    }

    const columns: ProColumns<TagType.TagVo>[] = [
        {
            title: 'ID',
            align: "center",
            dataIndex: 'tagId',
            valueType: 'index',
        },
        {
            title: '标签名称',
            align: "center",
            dataIndex: 'tagName',
            valueType: 'text',
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
                <Space split={<Divider type={'vertical'}/>}>
                    <Typography.Link
                        onClick={() => {
                            setUpdateData(record);
                            setUpdateModalVisible(true);
                        }}
                    >
                        修改
                    </Typography.Link>
                    <Popconfirm
                        title={'您确定要删除么？'}
                        onConfirm={() => doDelete([record])}
                        okText={'确定'}
                        cancelText={'取消'}>
                        <Typography.Link type={'danger'}>删除</Typography.Link>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    return (
        <PageContainer>
            <ProTable<TagType.TagVo>
                headerTitle={'标签管理'}
                rowKey={'tagId'}
                actionRef={actionRef}
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
                    const {data, code} = await listTagPage({
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
                    setCreateModalVisible(false);
                    actionRef.current?.reload(true);
                }}
                onCancel={() => {
                    setCreateModalVisible(false)
                }}/>
            <UpdateModal
                oldData={updateData}
                modalVisible={updateModalVisible}
                columns={columns}
                onSubmit={() => {
                    setUpdateModalVisible(false);
                    actionRef.current?.reload(true);
                }}
                onCancel={() => {
                    setUpdateModalVisible(false)
                }}
            />
        </PageContainer>
    )
}

export default AdminTagPage;
