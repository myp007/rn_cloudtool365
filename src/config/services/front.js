/**
 * 描述: 接口服务配置列表
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 16:41
 */
import {Services, Api, Components, Storage, StringUtils} from 'react-native-blue-book';
const {Modal} = Components;

// 获取新闻分类
Services.Function10000201 = async function (params) {
    let map = new Map();
    // 页码
    map.set('pageNum', params['pageNum'] ||1);
    // 分页数
    map.set('pageSize', params['pageSize'] ||5);
    if (StringUtils(map.get('pageNum')).isEmpty()) {
        Modal.showAlert('页码不能为空');
        return;
    }
    if (StringUtils(map.get('pageSize')).isEmpty()) {
        Modal.showAlert('分页数不能为空');
        return;
    }
    let data = await Api.getService('10000201', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取新闻列表
Services.Function10000203 = async function (params) {
    let map = new Map();
    // 页码
    map.set('pageNum', params['pageNum']||1);
    // 分页数
    map.set('pageSize', params['pageSize']||10);
    // 分类ID
    map.set('typeId', params['typeId']);
    if (StringUtils(map.get('pageNum')).isEmpty()) {
        Modal.showAlert('页码不能为空');
        return;
    }
    if (StringUtils(map.get('pageSize')).isEmpty()) {
        Modal.showAlert('分页数不能为空');
        return;
    }
    if (StringUtils(map.get('typeId')).isEmpty()) {
        Modal.showAlert('分类ID不能为空');
        return;
    }
    let data = await Api.getService('10000203', map, null, false);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取文章详情
Services.Function10000204 = async function (id) {
    let map = new Map();
    // 文章ID
    map.set('id', id);
    if (StringUtils(map.get('id')).isEmpty()) {
        Modal.showAlert('文章ID');
        return;
    }
    let data = await Api.getService('10000204', map, null, false);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};