import React from 'react';
import {DefaultFooter} from "@ant-design/pro-components";
import {GithubOutlined, UserOutlined, CrownOutlined} from "@ant-design/icons";
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
            copyright={`${currentYear} 开发生存时间 + <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备14008887号-3</a>`}
            links={[
                {
                    key: '1',
                    title: (
                        <>
                            <UserOutlined /> 站长：程序员
                        </>
                    ),
                    href: 'https://space.bilibili.com/12890453/',
                    blankTarget: true,
                },
                {
                    key: '2',
                    title: (
                        <>
                            <GithubOutlined /> 开源地址
                        </>
                    ),
                    href: 'https://github.com/aixan/',
                    blankTarget: true,
                },
                {
                    key: '3',
                    title: (
                        <>
                            <CrownOutlined /> 开发生存时间
                        </>
                    ),
                    href: 'https://devttl.cn/',
                    blankTarget: true,
                },
            ]}
        />
    )
}

export default GlobalFooter;
