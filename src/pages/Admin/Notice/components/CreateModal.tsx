import React, {PropsWithChildren} from "react";
import {message, Modal} from "antd";
import {addNotice} from "@/services/Admin/SysNoticeService";
import {ProColumns, ProTable} from "@ant-design/pro-components";


interface CreateModalProps {
    modalVisible: boolean;
    columns: ProColumns<NoticeType.NoticeVo>[];
    onSubmit: () => void;
    onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: NoticeType.NoticeVo) => {
    const hide = message.loading('正在添加');
    try {
        await addNotice({ ...fields } as NoticeType.NoticeAddRequest);
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
    const {columns, modalVisible, onSubmit, onCancel} = props

    return (
        <Modal
            title={'新建'}
            open={modalVisible}
            onCancel={() => onCancel()}
            footer={null}
        >
            <ProTable<NoticeType.NoticeVo, NoticeType.NoticeVo>
                rowKey={'noticeId'}
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

export default CreateModel;
