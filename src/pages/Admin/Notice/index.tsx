import React, {useRef, useState} from "react";
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {listNoticePage} from "@/services/Admin/SysNoticeService";
import {Button, Divider, message, Popconfirm, Space, Tag, Typography} from "antd";
import CreateModal from "@/pages/Admin/Notice/components/CreateModal";
import {deleteNotice} from "@/services/Admin/SysNoticeService";
import UpdateModal from "@/pages/Admin/Notice/components/UpdateModal";

/**
 * 公告管理页面
 * @constructor
 */
const AdminNoticePage: React.FC<unknown> = () => {
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<NoticeType.NoticeVo>({});
    const actionRef = useRef<ActionType>();

    /**
     * 删除公告数据
     * @param selectedRows
     */
    const doDelete = async (selectedRows: NoticeType.NoticeVo[]) => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            await deleteNotice({
                noticeId: selectedRows.find((row) => row.noticeId)?.noticeId || 0,
            });
            hide();
            message.success('操作成功');
        } catch (e: any) {
            hide();
            message.error('操作失败，' + e.message);
        }
        actionRef.current?.reload(true);
    }

    const columns: ProColumns<NoticeType.NoticeVo>[] = [
        {
            title: 'ID',
            align: 'center',
            dataIndex: 'noticeId',
            valueType: 'index',
        },
        {
            title: '标题',
            align: 'center',
            dataIndex: 'noticeTitle',
            valueType: 'text',
        },
        {
            title: '类型',
            align: 'center',
            dataIndex: 'noticeType',
            valueType: 'select',
            fieldProps: {
                options: [
                    {label: '公告', value: 0},
                    {label: '通知', value: 1},
                    {label: '提醒', value: 2},
                ],
            }
        },
        {
            title: '类型',
            align: 'center',
            dataIndex: 'status',
            valueType: 'select',
            fieldProps: {
                options: [
                    {label: '正常', value: 0},
                    {label: '关闭', value: 1},
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
            ),
        },
        {
            title: '内容',
            align: 'center',
            dataIndex: 'noticeContent',
            valueType: 'textarea',
            hideInTable: true,
        },
        {
            title: '创建者',
            align: 'center',
            dataIndex: 'createBy',
            valueType: 'text',
            hideInForm: true,
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
            <ProTable<NoticeType.NoticeVo>
                headerTitle={'公告管理'}
                rowKey={'noticeId'}
                actionRef={actionRef}
                search={{
                    labelWidth: 'auto',
                }}
                toolBarRender={() => [
                    <Button
                        key={'1'}
                        type={'primary'}
                        onClick={() => setCreateModalVisible(true)}
                    >
                        新建
                    </Button>,
                ]}
                request={async (params, sorter, filter) => {
                    const {data, code} = await listNoticePage({
                        ...params,
                        // @ts-ignore
                        sorter,
                        filter,
                    })
                    return {
                        data: data?.records || [],
                        success: code === 0,
                        total: data.total,
                    } as any
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
                onCancel={() => setCreateModalVisible(false)}
            />
            <UpdateModal
                oldData={updateData}
                modalVisible={updateModalVisible}
                columns={columns}
                onSubmit={() => {
                    setUpdateModalVisible(false)
                    actionRef.current?.reload(true)
                }}
                onCancel={() => setUpdateModalVisible(false)}/>
        </PageContainer>
    )
}

export default AdminNoticePage;
