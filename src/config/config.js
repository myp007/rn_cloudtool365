/**
 * 描述: 全局配置文件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 14:04
 */
import {Config} from 'react-native-blue-book';
// 本地
// let path =  'http://192.168.1.146:8088/bbsoft-api/';
// 红遥
// let path = 'http://192.168.1.105:8080/bbsoft-api/';
// 服务器地址
let path =  'http://bbsoft.cloudtool360.com/bbsoft-api/';

Config.config({
    // react-native-blue-book配置：接口地址
    BLUE_BOOK_API_PATH: path,
    // react-native-blue-book配置：是否打印接口信息到控制台
    BLUE_BOOK_API_PRINT_CONSOLE: true,
    // react-native-blue-book配置：接口默认请求方式
    BLUE_BOOK_API_DEFAULT_METHOD: 'POST',
    // UI总宽度
    BLUE_BOOK_STYLESHEET_UI_ALL_WIDTH: 750,

    // 默认打开主页面
    DEFAULT_OPEN_VIEW: 'index',
    // 后台接口地址
    ADMIN_API_PATH: path
});
console.disableYellowBox = true;