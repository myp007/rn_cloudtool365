/**
 * 描述: 全局配置文件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 14:04
 */
import {Config} from 'react-native-blue-book';

Config.config({
    // react-native-blue-book配置：接口地址
    TENCENT_API_PATH:'https://apim.cloudtool365.com/bbsoft-qcloud365/',//新闻

    // BLUE_BOOK_API_PATH:'http://192.168.1.28:8080/bluebooksoft-api365/',//测试
    // BLUE_BOOK_API_PATH:'http://192.168.2.8:9999/bluebooksoft-api365/',//张煌本地
    BLUE_BOOK_API_PATH:'https://apim.cloudtool365.com/bluebooksoft-api365/',//服务器


    // react-native-blue-book配置：是否打印接口信息到控制台
    BLUE_BOOK_API_PRINT_CONSOLE: true,
    // react-native-blue-book配置：接口默认请求方式
    BLUE_BOOK_API_DEFAULT_METHOD: 'POST',
    // UI总宽度
    BLUE_BOOK_STYLESHEET_UI_ALL_WIDTH: 750,

    // 默认打开主页面
    DEFAULT_OPEN_VIEW: 'index'
});

console.disableYellowBox = true;
