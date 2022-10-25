import React, {useRef, useState} from "react";
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, Divider, message, Popconfirm, Space, Tag, Typography} from "antd";
import CreateModal from "@/pages/Admin/Article/components/CreateModal";
import {deleteArticle, listArticlePage} from "@/services/Admin/SysArticleService";
import UpdateModal from "@/pages/Admin/Article/components/UpdateModal";

/**
 * 文章管理页面
 * @constructor
 */
const AdminArticlePage: React.FC<unknown> = () => {
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<ArticleType.ArticleVo>({});
    const actionRef = useRef<ActionType>()

    /**
     * 删除文章数据
     * @param selectedRows
     */
    const doDelete = async (selectedRows: ArticleType.ArticleVo[]) => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        try {
            await deleteArticle({
                articleId: selectedRows.find((row) => row.articleId)?.articleId || 0,
            });
            hide();
            message.success('操作成功');
        } catch (e: any) {
            hide();
            message.error('操作失败，' + e.message);
        }
        actionRef.current?.reload(true);
    }

    const columns: ProColumns<ArticleType.ArticleVo>[] = [
        {
            title: 'ID',
            align: 'center',
            dataIndex: 'articleId',
            valueType: 'index',
        },
        {
            title: '标题',
            align: 'center',
            dataIndex: 'articleTitle',
            valueType: 'text',
        },
        {
            title: '用户',
            align: 'center',
            hideInForm: true,
            dataIndex: 'userId',
            valueType: 'text',
        },
        {
            title: '分类',
            align: 'center',
            dataIndex: 'categoryId',
            valueType: 'text',
        },
        {
            title: '浏览',
            align: 'center',
            dataIndex: 'totalViews',
            valueType: 'text',
        },
        {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            valueType: 'select',
            fieldProps: {
                options: [
                    {label: '发布', value: 0},
                    {label: '草稿', value: 1},
                ],
            },
            render: (_, record) => (
                <Space>
                    {
                        record.status === 0 ? (
                            <Tag color={'success'}>
                                发布
                            </Tag>
                        ) : (
                            <Tag color={'error'}>
                                草稿
                            </Tag>
                        )
                    }

                </Space>
            ),
        },
        {
            title: '文章内容',
            align: 'center',
            search: false,
            hideInTable: true,
            dataIndex: 'content',
            valueType: 'textarea',
        },
        {
            title: '备注',
            align: 'center',
            dataIndex: 'articleDesc',
            valueType: 'textarea',
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
            <ProTable
                headerTitle={'文章管理'}
                rowKey={'articleId'}
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
                    const {data, code} = await listArticlePage({
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
                    setCreateModalVisible(false);
                    actionRef.current?.reload(true);
                }}
                onClose={() => {setCreateModalVisible(false)}}
            />
            <UpdateModal
                oldData={updateData}
                modalVisible={updateModalVisible}
                columns={columns}
                onSubmit={() => {
                    setUpdateModalVisible(false);
                    actionRef.current?.reload(true);
                }}
                onClose={() => {setUpdateModalVisible(false)}}
            />
        </PageContainer>
    )
}

export default AdminArticlePage;
