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
              name: 'Dashboard',
              icon: 'home',
              path: '/dashboard',
              component: './Dashboard',
            },
            {
              name: 'Pengguna',
              icon: 'user',
              path: '/pengguna',
              component: './pengguna',
            },
            {
              name: 'Merchant',
              icon: 'shop',
              path: '/merchant',
              routes: [
                {
                  name: 'Daftar Merchant',
                  icon: 'shop',
                  path: '/merchant/daftar',
                  component: './merchant/Daftar',
                },
                {
                  name: 'Banner Merchant',
                  icon: 'picture',
                  path: '/merchant/banner',
                  component: './merchant/Banner',
                },
                {
                  name: 'Produk',
                  icon: 'profile',
                  path: '/merchant/produk',
                  component: './merchant/Produk',
                },
                {
                  hideInMenu: true,
                  path: '/merchant/produk/add',
                  component: './merchant/ProdukAdd',
                },
                {
                  hideInMenu: true,
                  path: '/merchant/produk/:id',
                  component: './merchant/ProdukEdit',
                },
                {
                  name: 'Kategori Produk',
                  icon: 'tag',
                  path: '/merchant/kategori',
                  component: './merchant/Kategori',
                },
                {
                  name: 'Sub Kategori Produk',
                  icon: 'tags',
                  path: '/merchant/subkategori',
                  component: './merchant/SubKategori',
                },
                {
                  name: 'Unit Produk',
                  icon: 'schedule',
                  path: '/merchant/unit',
                  component: './merchant/UnitProduk',
                },
              ],
            },
            {
              name: 'Pesanan',
              icon: 'profile',
              path: '/pesanan',
              component: './pesanan',
            },
            {
              hideInMenu: true,
              path: '/pesanan/detail/:id',
              component: './pesanan/Detail',
            },
            {
              name: 'Resep',
              icon: 'profile',
              path: '/recipe',
              routes: [
                {
                  name: 'Resep Masakan',
                  icon: 'profile',
                  path: '/recipe/masakan',
                  component: './recipe/Masakan',
                },
                {
                  name: 'Resep Masakan Add',
                  hideInMenu: true,
                  path: '/recipe/masakan/add',
                  component: './recipe/Masakan/Add',
                },
                {
                  name: 'Kategori Resep',
                  icon: 'tag',
                  path: '/recipe/kategori',
                  component: './recipe/Kategori',
                },
                {
                  name: 'Resep & Kategori Pilihan',
                  icon: 'tags',
                  path: '/recipe/pilihan',
                  component: './recipe/Pilihan',
                },
              ],
            },
            {
              name: 'Promo',
              icon: 'profile',
              path: '/promo',
              component: './promo',
            },
            {
              name: 'Penjualan',
              icon: 'stock',
              path: '/penjualan',
              component: './penjualan',
            },
            {
              name: 'Penjualan Detail',
              icon: 'stock',
              path: '/penjualan/detail',
              component: './penjualan/Detail',
            },
            {
              name: 'Manajemen Konten',
              icon: 'dashboard',
              path: '/management',
              routes: [
                {
                  name: 'Banner Beranda',
                  icon: 'home',
                  path: '/management/banner',
                  component: './management/Banner',
                },
                {
                  name: 'Tentang mycoplan',
                  icon: 'message',
                  path: '/management/about',
                  component: './management/About',
                },
                {
                  name: 'WhatsApp Chat',
                  icon: 'wechat',
                  path: '/management/chat',
                  component: './management/Whatsapp',
                },
              ],
            },
            {
              name: 'Akses Admin',
              icon: 'user',
              path: '/admin',
              component: './admin/Access',
              // routes: [
              //   {
              //     name: 'Access',
              //     icon: 'smile',
              //     path: '/admin/access',
              //     component: './admin/Access',
              //   },
              //   {
              //     name: 'Edit',
              //     icon: 'smile',
              //     path: '/admin/edit',
              //     component: './admin/Edit',
              //   },
              // ],
            },
            {
              name: 'Pengaturan',
              icon: 'setting',
              path: '/settings/profile',
              component: './settings/Profile',
            },
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
            {
              path: '/',
              redirect: '/dashboard',
              // authority: ['admin', 'user'],
            },
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
