import React, {useEffect, useState} from "react";
import {ProCard} from "@ant-design/pro-components";
import {useLocation, useSearchParams} from "@@/exports";
import {articleById} from "@/services/ArticleService";
import {Divider, message, Tooltip} from "antd";
import ReactMarkdown from "react-markdown";
import './index.less'

const ArticlePage = () => {
    const [searchParams] = useSearchParams();

    let location = useLocation();
    const path = location.pathname
    const id = Number(path.substring(path.lastIndexOf('/') + 1))
    const [loading, setLoading] = useState<boolean>(false);
    const [article, setArticle] = useState<ArticleType.ArticleIndexVo>({});
    useEffect(() => {
        setLoading(true);
        articleById(id)
            .then((res) => {
                setArticle(res.data)
            })
            .catch((e) => {
                message.error("系统错误：" + e.message)
                        window.location.href = searchParams.get('redirect') ?? '/';
            })
            .finally(() => setLoading(false))
    },[id])

    return (
        <ProCard split="vertical" loading={loading}>
            <ProCard>
                <h1 id={'title'}>{article.articleTitle}</h1>
                <p id="subtitle">
                    <Tooltip title={"最后编辑于：" + article.updateTime}  placement="bottom">
                        {article.createTime?.toString()}
                    </Tooltip>
                </p>
                <Divider />
                <div className={'v-md-editor-preview'}>
                    <ReactMarkdown>{article.content + ""}</ReactMarkdown>
                </div>
            </ProCard>
            <ProCard colSpan="30%" title="目录" headerBordered>
                标题
            </ProCard>
        </ProCard>
    )
}

export default ArticlePage;
