import React, {PropsWithChildren} from "react";
import {message, Modal} from "antd";
import {ProColumns,ProTable} from "@ant-design/pro-components";
import {addCategory} from "@/services/Admin/SysCategoryService";

interface CreateModalProps {
    modalVisible: boolean;
    columns: ProColumns<CategoryType.CategoryVo>[];
    onSubmit: () => void;
    onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: CategoryType.CategoryVo) => {
    const hide = message.loading('正在添加');
    try {
        await addCategory({ ...fields } as CategoryType.CategoryAddRequest);
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
const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = (props) => {
    const {modalVisible, columns, onSubmit, onCancel} = props;

    return (
        <Modal
            destroyOnClose
            title={'新建'}
            open={modalVisible}
            onCancel={onCancel}
            footer={null}
        >
            <ProTable<CategoryType.CategoryVo,CategoryType.CategoryVo>
                rowKey={'categoryId'}
                type={'form'}
                columns={columns}
                onSubmit={async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                        onSubmit?.();
                    }
                }}
            />

        </Modal>
    )
}

export default CreateModal;
