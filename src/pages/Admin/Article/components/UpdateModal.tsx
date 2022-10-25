import React, {PropsWithChildren} from "react";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {Drawer, message} from "antd";
import {updateArticle} from "@/services/Admin/SysArticleService";

interface UpdateModalProps {
    oldData: ArticleType.ArticleVo;
    modalVisible: boolean;
    columns: ProColumns<ArticleType.ArticleVo>[];
    onSubmit: () => void;
    onClose: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: ArticleType.ArticleVo) => {
    const hide = message.loading('正在配置');
    try {
        await updateArticle({
            articleId: fields.articleId ?? 0,
            ...fields,
        });
        hide();
        message.success('配置成功');
        return true;
    } catch (error) {
        hide();
        message.error('配置失败请重试！');
        return false;
    }
};

/**
 * 更新数据模态框
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<PropsWithChildren<UpdateModalProps>> = (props) => {
    const {oldData, modalVisible, columns, onSubmit, onClose} = props

    return (
        <Drawer
            title={'更新'}
            destroyOnClose
            open={modalVisible}
            onClose={onClose}
            footer={null}
        >
            <ProTable<ArticleType.ArticleVo, ArticleType.ArticleVo>
                rowKey={'articleId'}
                type={'form'}
                columns={columns}
                form={{
                    initialValues: oldData,
                }}
                onSubmit={async (value) => {
                    const success = await handleUpdate({
                        ...value,
                        articleId: oldData.articleId,
                    });
                    if (success) {
                        onSubmit?.();
                    }
                }}
            />
        </Drawer>
    )
}

export default UpdateModal;
