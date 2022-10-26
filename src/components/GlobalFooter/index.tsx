import React from 'react';
import {DefaultFooter} from "@ant-design/pro-components";
import {GithubOutlined} from "@ant-design/icons";
import './index.less';

/**
 * 全局 Footer
 * @constructor
 */
const GlobalFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <DefaultFooter
            className="default-footer"
            copyright={`${currentYear} 开发生存时间`}
            links={[
                {
                    key: '1',
                    title: (
                        <>
                            开发生存时间
                        </>
                    ),
                    href: 'https://devttl.cn/',
                    blankTarget: true,
                },
                {
                    key: '2',
                    title: (
                        <>
                            <GithubOutlined />
                        </>
                    ),
                    href: 'https://github.com/aixan/',
                    blankTarget: true,
                },
                {
                    key: '3',
                    title: (
                        <>
                            豫ICP备14008887号-3
                        </>
                    ),
                    href: 'https://beian.miit.gov.cn/',
                    blankTarget: true,
                },
            ]}
        />
    )
}

export default GlobalFooter;
