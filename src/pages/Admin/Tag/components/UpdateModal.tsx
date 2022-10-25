import React, {PropsWithChildren} from "react";
import {message, Modal} from "antd";
import {ProColumns,ProTable} from "@ant-design/pro-components";
import {updateTag} from "@/services/Admin/SysTagService";

interface UpdateModalProps {
    oldData: TagType.TagVo,
    modalVisible: boolean,
    columns: ProColumns<TagType.TagVo>[];
    onSubmit: () => void;
    onCancel: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: TagType.TagVo) => {
    const hide = message.loading('正在配置');
    try {
        await updateTag({
            tagId: fields.tagId ?? 0,
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
    const {oldData, modalVisible, columns, onSubmit, onCancel} = props;

    return (
        <Modal
            destroyOnClose
            title={'更新'}
            open={modalVisible}
            onCancel={onCancel}
            footer={null}
        >
            <ProTable<TagType.TagVo, TagType.TagVo>
                rowKey={'tagId'}
                type={'form'}
                columns={columns}
                form={{
                    initialValues: oldData,
                }}
                onSubmit={async (value) => {
                    const success = await handleUpdate({
                        ...value,
                        tagId: oldData.tagId,
                    });
                    if (success) {
                        onSubmit?.();
                    }
                }}
            />
        </Modal>
    )
}

export default UpdateModal;
