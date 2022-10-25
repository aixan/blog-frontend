import React, {PropsWithChildren} from "react";
import {Drawer, message} from "antd";
import {addArticle} from "@/services/ArticleService";
import {ProColumns, ProTable} from "@ant-design/pro-components";


interface CreateModalProps {
    modalVisible: boolean;
    columns: ProColumns<ArticleType.ArticleVo>[];
    onSubmit: () => void;
    onClose: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: ArticleType.ArticleVo) => {
    const hide = message.loading('正在添加');
    try {
        await addArticle({ ...fields } as ArticleType.ArticleAddRequest);
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};

/**
 * 创建数据模态框
 * @param props
 * @constructor
 */
const CreateModel: React.FC<PropsWithChildren<CreateModalProps>> = (props) => {
    const {columns, modalVisible, onSubmit, onClose} = props

    return (
        <Drawer
            title={'新建'}
            open={modalVisible}
            onClose={() => onClose()}
            footer={null}
        >
            <ProTable<ArticleType.ArticleVo, ArticleType.ArticleVo>
                rowKey={'articleId'}
                type={'form'}
                columns={columns}
                onSubmit={async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                        onSubmit?.();
                    }
                }}
            />
        </Drawer>
    )
}

export default CreateModel;
