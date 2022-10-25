import React,{PropsWithChildren} from "react";
import {message, Drawer} from 'antd';
import {updateUser} from '@/services/Admin/SysUserService';
import {ProColumns,ProTable} from '@ant-design/pro-components';

interface UpdateModalProps {
    oldData: UserType.UserVo;
    modalVisible: boolean;
    columns: ProColumns<UserType.UserVo>[];
    onSubmit: () => void;
    onClose: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: UserType.UserVo) => {
    const hide = message.loading('正在配置');
    try {
        await updateUser({
            id: fields.id ?? 0,
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
    const { oldData, columns, modalVisible, onSubmit, onClose } = props;

    return (
        <Drawer
            destroyOnClose
            title="更新"
            open={modalVisible}
            onClose={() => onClose()}
            footer={null}
        >
            <ProTable<UserType.UserVo, UserType.UserVo>
                rowKey="id"
                type="form"
                columns={columns}
                form={{
                    initialValues: oldData,
                }}
                onSubmit={async (value) => {
                    const success = await handleUpdate({
                        ...value,
                        id: oldData.id,
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
