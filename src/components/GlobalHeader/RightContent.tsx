import React from 'react';
import {Settings as ProSettings} from "@ant-design/pro-components";
import styles from './index.less'
import AvatarDropdown from "@/components/GlobalHeader/AvatarDropdown";

type GlobalHeaderRightProps = Partial<ProSettings>

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = () => {
    return (
        <div className={styles.right}>
            <AvatarDropdown />
        </div>
    );
}

export default GlobalHeaderRight;
