// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { winPath } = utils; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV, GA_KEY } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  analytics: GA_KEY
    ? {
        ga: GA_KEY,
      }
    : false,
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            // {
            //   name: 'Baru',
            //   icon: 'smile',
            //   path: '/baru',
            //   component: './baru',
            // },
            {
              path: '/',
              redirect: '/dashboard/analysis/total-pengguna',
              authority: ['admin', 'user'],
            },
            {
              path: '/dashboard',
              name: 'Dashboard Analytics',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Total Pengguna',
                  icon: 'smile',
                  path: '/dashboard/analysis/total-pengguna',
                  component: './dashboard_analysis/TotalPengguna',
                },
                {
                  name: 'Grafik Pengguna',
                  icon: 'smile',
                  path: '/dashboard/analysis/grafik-pengguna',
                  component: './dashboard_analysis/GrafikPengguna',
                },
                {
                  name: 'Grafik Statistic',
                  icon: 'smile',
                  path: '/dashboard/analysis/grafik-statistik',
                  component: './dashboard_analysis/GrafikStatistik',
                },
              ],
            },
            {
              path: '/settings/user',
              name: 'Pengaturan Pengguna',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Profil Pengguna',
                  icon: 'smile',
                  path: '/settings/user/profile',
                  component: './settings_user/Profile',
                },
                {
                  name: 'Action',
                  icon: 'smile',
                  path: '/settings/user/action',
                  component: './settings_user/Action',
                },
              ],
            },
            {
              path: '/settings/merchant',
              name: 'Pengaturan Merchant',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Add Merchant',
                  icon: 'smile',
                  path: '/settings/merchant/add/merchant',
                  component: './settings_merchant/Add/Merchant',
                },
                {
                  name: 'Merchant Banner',
                  icon: 'smile',
                  path: '/settings/merchant/banner',
                  component: './settings_merchant/Banner',
                },
                {
                  name: 'Action',
                  icon: 'smile',
                  path: '/settings/merchant/action',
                  component: './settings_merchant/Action',
                },
                {
                  name: 'Product Category / Level',
                  icon: 'smile',
                  path: '/settings/merchant/product',
                  component: './settings_merchant/Product',
                },
                {
                  name: 'Add Products / Product Details',
                  icon: 'smile',
                  path: '/settings/merchant/add/product',
                  component: './settings_merchant/Add/Product',
                },
              ],
            },
            {
              name: 'Pengaturan Pesanan',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Order',
                  icon: 'smile',
                  path: '/settings/order',
                  component: './settings_order/Order',
                },
                {
                  name: 'Action',
                  icon: 'smile',
                  path: '/settings/order/action',
                  component: './settings_order/Action',
                },
              ],
            },
            {
              path: '/recipe',
              name: 'Recipe Menu',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Add Recipes',
                  icon: 'smile',
                  path: '/recipe/add',
                  component: './recipe/Add',
                },
                {
                  name: 'Manage Ingredients / Bahan',
                  icon: 'smile',
                  path: '/recipe/manage',
                  component: './recipe/Manage',
                },
                {
                  name: 'Kategori',
                  icon: 'smile',
                  path: '/recipe/kategori',
                  component: './recipe/Kategori',
                },
                {
                  name: 'Action',
                  icon: 'smile',
                  path: '/recipe/action',
                  component: './recipe/Action',
                },
              ],
            },
            {
              path: '/promo',
              name: 'Promo Menu',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Create Promo',
                  icon: 'smile',
                  path: '/promo/create',
                  component: './promo/Create',
                },
              ],
            },
            {
              path: '/performance',
              name: 'Performance',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Sales',
                  icon: 'smile',
                  path: '/performance/sales',
                  component: './performance/Sales',
                },
                {
                  name: 'Payments',
                  icon: 'smile',
                  path: '/performance/payment',
                  component: './performance/Payment',
                },
                {
                  name: 'Action',
                  icon: 'smile',
                  path: '/performance/action',
                  component: './performance/Action',
                },
              ],
            },
            {
              path: '/content',
              name: 'Content Management',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Banner Beranda Editor',
                  icon: 'smile',
                  path: '/content/banner',
                  component: './content/Banner',
                },
                {
                  name: 'Notif Management',
                  icon: 'smile',
                  path: '/content/notification',
                  component: './content/Notification',
                },
                {
                  name: 'Tentang mycoplan',
                  icon: 'smile',
                  path: '/content/about',
                  component: './content/About',
                },
                {
                  name: 'WhatsApp Chat',
                  icon: 'smile',
                  path: '/content/chat',
                  component: './content/Chat',
                },
                {
                  name: 'FAQ, T&C & Privacy',
                  icon: 'smile',
                  path: '/content/privacy',
                  component: './content/Privacy',
                },
              ],
            },
            {
              path: '/admin',
              name: 'Admin Access',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Role',
                  icon: 'smile',
                  path: '/admin/role',
                  component: './admin/Role',
                },
                {
                  name: 'Action',
                  icon: 'smile',
                  path: '/admin/action',
                  component: './admin/Action',
                },
                {
                  name: 'Settings',
                  icon: 'smile',
                  path: '/admin/settings',
                  component: './admin/Settings',
                },
              ],
            },
            {
              path: '/other',
              name: 'Others',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Cooking Planner',
                  icon: 'smile',
                  path: '/other/planner',
                  component: './other/Planner',
                },
              ],
            },
            // {
            //   path: '/form',
            //   icon: 'form',
            //   name: 'form',
            //   routes: [
            //     {
            //       name: 'basic-form',
            //       icon: 'smile',
            //       path: '/form/basic-form',
            //       component: './form/basic-form',
            //     },
            //     {
            //       name: 'step-form',
            //       icon: 'smile',
            //       path: '/form/step-form',
            //       component: './form/step-form',
            //     },
            //     {
            //       name: 'advanced-form',
            //       icon: 'smile',
            //       path: '/form/advanced-form',
            //       component: './form/advanced-form',
            //     },
            //   ],
            // },
            // {
            //   path: '/list',
            //   icon: 'table',
            //   name: 'list',
            //   routes: [
            //     {
            //       path: '/list/search',
            //       name: 'search-list',
            //       component: './list/search',
            //       routes: [
            //         {
            //           path: '/list/search',
            //           redirect: '/list/search/articles',
            //         },
            //         {
            //           name: 'articles',
            //           icon: 'smile',
            //           path: '/list/search/articles',
            //           component: './list/search/articles',
            //         },
            //         {
            //           name: 'projects',
            //           icon: 'smile',
            //           path: '/list/search/projects',
            //           component: './list/search/projects',
            //         },
            //         {
            //           name: 'applications',
            //           icon: 'smile',
            //           path: '/list/search/applications',
            //           component: './list/search/applications',
            //         },
            //       ],
            //     },
            //     {
            //       name: 'table-list',
            //       icon: 'smile',
            //       path: '/list/table-list',
            //       component: './list/table-list',
            //     },
            //     {
            //       name: 'basic-list',
            //       icon: 'smile',
            //       path: '/list/basic-list',
            //       component: './list/basic-list',
            //     },
            //     {
            //       name: 'card-list',
            //       icon: 'smile',
            //       path: '/list/card-list',
            //       component: './list/card-list',
            //     },
            //   ],
            // },
            // {
            //   path: '/profile',
            //   name: 'profile',
            //   icon: 'profile',
            //   routes: [
            //     {
            //       name: 'basic',
            //       icon: 'smile',
            //       path: '/profile/basic',
            //       component: './profile/basic',
            //     },
            //     {
            //       name: 'advanced',
            //       icon: 'smile',
            //       path: '/profile/advanced',
            //       component: './profile/advanced',
            //     },
            //   ],
            // },
            // {
            //   name: 'result',
            //   icon: 'CheckCircleOutlined',
            //   path: '/result',
            //   routes: [
            //     {
            //       name: 'success',
            //       icon: 'smile',
            //       path: '/result/success',
            //       component: './result/success',
            //     },
            //     {
            //       name: 'fail',
            //       icon: 'smile',
            //       path: '/result/fail',
            //       component: './result/fail',
            //     },
            //   ],
            // },
            // {
            //   name: 'exception',
            //   icon: 'warning',
            //   path: '/exception',
            //   routes: [
            //     {
            //       name: '403',
            //       icon: 'smile',
            //       path: '/exception/403',
            //       component: './exception/403',
            //     },
            //     {
            //       name: '404',
            //       icon: 'smile',
            //       path: '/exception/404',
            //       component: './exception/404',
            //     },
            //     {
            //       name: '500',
            //       icon: 'smile',
            //       path: '/exception/500',
            //       component: './exception/500',
            //     },
            //   ],
            // },
            // {
            //   name: 'account',
            //   icon: 'user',
            //   path: '/account',
            //   routes: [
            //     {
            //       name: 'center',
            //       icon: 'smile',
            //       path: '/account/center',
            //       component: './account/center',
            //     },
            //     {
            //       name: 'settings',
            //       icon: 'smile',
            //       path: '/account/settings',
            //       component: './account/settings',
            //     },
            //   ],
            // },
            // {
            //   name: 'editor',
            //   icon: 'highlight',
            //   path: '/editor',
            //   routes: [
            //     {
            //       name: 'flow',
            //       icon: 'smile',
            //       path: '/editor/flow',
            //       component: './editor/flow',
            //     },
            //     {
            //       name: 'mind',
            //       icon: 'smile',
            //       path: '/editor/mind',
            //       component: './editor/mind',
            //     },
            //     {
            //       name: 'koni',
            //       icon: 'smile',
            //       path: '/editor/koni',
            //       component: './editor/koni',
            //     },
            //   ],
            // },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
