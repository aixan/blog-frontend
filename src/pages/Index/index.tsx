import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from "react";
import {Button, Divider, List, Space, Tag, Typography} from "antd";
import {LikeFilled, LikeOutlined} from '@ant-design/icons';
import {articlePage} from "@/services/ArticleService";
import './index.less';
import {Link, useModel} from "@@/exports";

// 默认分页大小
const DEFAULT_PAGE_SIZE = 10;

const IndexPage: React.FC = () => {
    // 获取登录用户
    const {initialState} = useModel('@@initialState');
    const loginUser = initialState?.loginUser;

    const [articleList, setArticleList] = useState<ArticleType.ArticleIndexVo[]>([]);
    const [total, setTotal] = useState<number>(0);
    const initSearchParams: ArticleType.ArticleQueryRequest = {
        current: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        // 只展示已发布的
        status: 1,
        sortField: 'createTime',
        sortOrder: 'descend',
    }
    const [searchParams, setSearchParams] = useState<ArticleType.ArticleQueryRequest>(initSearchParams);
    const [loading, setLoading] = useState<boolean>(false);

    // 加载数据
    useEffect(() => {
        setLoading(true);
        articlePage(searchParams)
            .then((res) => {
                setArticleList(res.data.records);
                setTotal(res.data.total);
                console.log(res.data.records)
            })
            .finally(() => setLoading(false))
    }, [searchParams])
    // const { name } = useModel('global');
    return (
        <PageContainer
            ghost
            className="post-list-wrapper"
            header={{
                title: ''
            }}
        >
            <List
                itemLayout="vertical"
                size="large"
                loading={loading}
                pagination={{
                    total,
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: DEFAULT_PAGE_SIZE,
                }}
                dataSource={articleList}
                renderItem={item => (
                    <List.Item key={item.articleId}>
                        <div style={{marginBottom: '1em'}}>
                            <Tag color={'#2db7f5'}>{item.categoryName}</Tag>
                        </div>
                        <Link to={`/article/${item.articleId}`} target="_blank">
                            <Typography.Title level={3}>
                                {item.articleTitle}
                            </Typography.Title>
                            <Typography.Paragraph>
                                {item.articleDesc}
                            </Typography.Paragraph>
                        </Link>
                        <Space
                            split={<Divider type={'vertical'}/>}
                            style={{fontSize: 14}}
                        >
                            <Typography.Text type={'secondary'}>
                                {item.nickName?.toString()}
                            </Typography.Text>
                            <Typography.Text type={'secondary'}>
                                {item.createTime?.toString()}
                            </Typography.Text>
                            <Button type={'text'} onClick={() => {
                            }} size={'small'} disabled={!loginUser}>
                                <Space>
                                    {item.totalViews ? <LikeFilled/> : <LikeOutlined/>}
                                    {item.totalViews}
                                </Space>
                            </Button>
                        </Space>
                    </List.Item>
                )}
            />
        </PageContainer>
    );
};

export default IndexPage;
