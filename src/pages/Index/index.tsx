import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const IndexPage: React.FC = () => {
    // const { name } = useModel('global');
    return (
        <PageContainer ghost
            header={{
                title:''
            }}
        >
            <div className={styles.container}>

            </div>
        </PageContainer>
    );
};

export default IndexPage;
