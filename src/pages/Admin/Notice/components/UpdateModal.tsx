import React, {PropsWithChildren} from "react";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {message, Modal} from "antd";
import {updateNotice} from "@/services/NoticeService";

interface UpdateModalProps {
    oldData: NoticeType.NoticeVo;
    modalVisible: boolean;
    columns: ProColumns<NoticeType.NoticeVo>[];
    onSubmit: () => void;
    onCancel: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: NoticeType.NoticeVo) => {
    const hide = message.loading('正在配置');
    try {
        await updateNotice({
            noticeId: fields.noticeId ?? 0,
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
    const {oldData,modalVisible,columns,onSubmit,onCancel} = props

    return (
        <Modal
            title={'更新'}
            destroyOnClose
            open={modalVisible}
            onCancel={onCancel}
            footer={null}
        >
            <ProTable<NoticeType.NoticeVo,NoticeType.NoticeVo>
                rowKey={'noticeId'}
                type={'form'}
                columns={columns}
                form={{
                    initialValues: oldData,
                }}
                onSubmit={async (value) => {
                    const success = await handleUpdate({
                        ...value,
                        noticeId: oldData.noticeId,
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
