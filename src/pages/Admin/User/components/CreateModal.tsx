import React,{PropsWithChildren} from "react";
import {message, Drawer} from 'antd';
import {addUser} from '@/services/Admin/SysUserService';
import {ProColumns,ProTable} from '@ant-design/pro-components';

interface CreateModalProps {
    modalVisible: boolean;
    columns: ProColumns<UserType.UserVo>[];
    onSubmit: () => void;
    onClose: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: UserType.UserVo) => {
    const hide = message.loading('正在添加');
    try {
        await addUser({ ...fields } as UserType.UserAddRequest);
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
    const { columns, modalVisible, onSubmit, onClose } = props;

    return (
        <Drawer
            destroyOnClose
            title="新建"
            open={modalVisible}
            onClose={() => onClose()}
            footer={null}
        >
            <ProTable<UserType.UserVo, UserType.UserVo>
                rowKey="id"
                type="form"
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

export default CreateModal;
