import React, {PropsWithChildren} from "react";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {message, Modal} from "antd";
import {addTag} from "@/services/Admin/SysTagService";


interface CreateModalProps {
    modalVisible: boolean;
    columns: ProColumns<TagType.TagVo>[];
    onSubmit: () => void;
    onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TagType.TagVo) => {
    const hide = message.loading('正在添加');
    try {
        await addTag({ ...fields } as TagType.TagAddRequest);
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
    const {columns, modalVisible, onSubmit, onCancel} = props

    return (
        <Modal
            title={'新建'}
            open={modalVisible}
            onCancel={onCancel}
            footer={null}
        >
            <ProTable<TagType.TagVo, TagType.TagVo>
                rowKey={'tagId'}
                type={'form'}
                columns={columns}
                onSubmit={async (value) =>{
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
