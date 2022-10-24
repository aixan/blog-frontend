/**
 * 路由
 * 配置参考：https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
 */

export default [
    {
        name: '首页',
        path: '/',
        component: './Index',
    },
    {
        path: '/user',
        hideInMenu: true,
        headerRender: false,
        layout: {
            hideMenu: false,
            hideNav: false,
            hideFooter: false,
        },
        routes: [
            {
                name: '用户登录',
                path: '/user/login',
                component: 'user/login',
            },
            {
                name: '用户注册',
                path: '/user/register',
                component: 'user/register',
            }
        ]
    },
    {
        path: '/admin',
        access: 'canAdmin',
        name: '后台管理',
        flatMenu: true,
        routes: [
            {
                name: '权限演示',
                path: '/admin/access',
                component: './Access',
            },
            {
                name: '文章管理',
                path: '/admin/article',
                component: './Admin/Article',
            },
            {
                name: '分类管理',
                path: '/admin/category',
                component: './Admin/Category',
            },
            {
                name: '标签管理',
                path: '/admin/tag',
                component: './Admin/Tag',
            },
            {
                name: '用户管理',
                path: '/admin/user',
                component: './Admin/User',
            },
            {
                name: '公告管理',
                path: '/admin/notice',
                component: './Admin/Notice',
            },
            {
                name: '日志中心',
                path: '/admin/log',
                routes: [
                    {
                        name: '操作日志',
                        path: '/admin/log/operation',
                        component: './Admin/Log/Operation',
                    },
                    {
                        name: '登录日志',
                        path: '/admin/log/login',
                        component: './Admin/Log/Login',
                    },
                ]
            },
        ],
    },
];


/*e.g.
export const routes: IBestAFSRoute[] = [
  {
    path: '/welcome',
    component: 'IndexPage',
    name: '欢迎', // 兼容此写法
    icon: 'testicon',
    // 更多功能查看
    // https://beta-pro.ant.design/docs/advanced-menu
    // ---
    // 新页面打开
    target: '_blank',
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    // 权限配置，需要与 plugin-access 插件配合使用
    access: 'canRead',
    // 隐藏子菜单
    hideChildrenInMenu: true,
    // 隐藏自己和子菜单
    hideInMenu: true,
    // 在面包屑中隐藏
    hideInBreadcrumb: true,
    // 子项往上提，仍旧展示,
    flatMenu: true,
  },
];
*/
