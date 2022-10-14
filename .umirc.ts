import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  locale: {
    default: 'es-ES',
    baseNavigator: true,
    title: false,
  },
  antd: false, // antd styles loads via less imports in src/layouts/index.js
  define: {
    'process.env.PUBLIC_PATH': '',
    'process.env.API_BASE_URL': 'https://censys-sa.com.ar/IBAPI_BMR_MH',
    //'process.env.API_BASE_URL': 'http://200.69.146.131:8888/IBAPI_BMR_MOBILEBANKING',
    //'process.env.API_BASE_URL':'http://172.16.57.124/IBAPI_BMR_MOBILEBANKING',
    'process.env.API_CLIENT_ID': '{7E83FD51-11AE-49E0-8A5E-1C57783818CA}',
    'process.env.API_CLIENT_SECRET':'secretb7dc7e43483dfb220db105aa11d880572b30c91df9595afe2f95d35a3e3966f3',

    //endpoint TUCO
    'process.env.API_BASE_URL_TUCO':'http://200.69.146.131:8888/IBAPI_TUCO',
    //'process.env.API_BASE_URL_TUCO':'http://172.16.57.124/IBAPI_TUCO',
    'process.env.API_CLIENT_ID_TUCO': '{5A9D6891-4383-4636-83E9-A84C15DB8B55}',
    'process.env.API_CLIENT_SECRET_TUCO':'secret04d1abd1743f2d7b4b13eb573fe662539c2936c978a5870b8bd29569fbf33eef',

    'process.env.API_BASE_URL_PAGADETODO':'http://apisandbox.pagadetodo.com/v1/',
    'process.env.API_CLIENT_ID_PAGADETODO':'censys',
    'process.env.API_CLIENT_SECRET_PAGADETODO':'c25867ddaed4801f6840d81a9b078af47dfeeaa1c18e12cb300022faa7ef5f28',
    'process.env.PASSWORD_PAGADETODO':'yT7sONK9nOkx2ZlNcSvGF',
  }
})
