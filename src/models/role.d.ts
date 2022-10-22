
declare namespace RoleType {


    interface Role {
        id: number;
        roleName: string;
        createTime?: Date;
        updateTime?: Date;
    }
    /**
     * 角色分组
     */
    type RoleMap = Record<string, Role[]>
}
