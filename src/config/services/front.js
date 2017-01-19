/**
 * 描述: 接口服务配置列表
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 16:41
 */
import {Services, Api, Components, Storage} from 'react-native-blue-book';
const {Modal} = Components;

// 登陆
Services.Function10000100 = function (params) {
    let map = new Map();
    map.set('name', params.name);
    map.set('password', params.password);
    return Api.getService('10000100', map);
};

// 通过token获取用户信息
Services.Function10000101 = async function () {
    // 从本地获取用户信息
    let userInfo = await Storage.getItem('USER_INFO');
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 获取接口数据
    let data = await Api.getService('10000101', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取数据字典
Services.Function10000400 = async function (code) {
    let map = new Map();
    // 身份标识
    map.set('dicCode', code);
    // 获取接口数据
    let data = await Api.getService('10000400', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};