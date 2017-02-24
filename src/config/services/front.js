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

// 登陆
Services.Function10000100 = async function (params) {
    let map = new Map();
    // 用户名
    map.set('phone', params.phone);
    // 密码
    map.set('pwd', params.password);
    if (StringUtils(map.get('phone')).isEmpty()) {
        Modal.showAlert('用户名不能为空');
        return;
    }
    if (StringUtils(map.get('pwd')).isEmpty()) {
        Modal.showAlert('密码不能为空');
        return;
    }
    // 获取接口数据
    let data = await Api.getService('qcloud365-api/user/login', map,'GET');
    if (data.errorCode == 0) {
        Modal.showAlert('登录成功')
        Storage.setItem('USER_INFO', {
            token: data.results.token || '',
            tag: data.results.tag || '',
            userName: data.results.userName || '',
            nickName: data.results.nickName || '',
            email: data.results.email || '',
            phone: data.results.phone || ''

        });

        console.log(data);
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};
// 获取验证码
Services.Function10000101 = async function (params) {
    let map = new Map();
    // 手机号
    map.set('phone', params.phone);
    map.set('time', params.time);
    map.set('type', params.type);
    if (StringUtils(map.get('phone')).isEmpty()) {
        Modal.showAlert('手机号不能为空');
        return;
    }

    // 获取接口数据
    let data = await Api.getService('qcloud365-api/user/getPhoneCode', map,'GET');
    if (data.errorCode == 0) {
        Modal.showAlert('验证码也发送，请注意查收')
        console.log(data);
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};
// 校验验证码
Services.Function10000103 = async function (params) {
    let map = new Map();
    // 手机号
    map.set('phone', params.phone);
    map.set('code', params.code);
    map.set('type', params.type);
    if (StringUtils(map.get('code')).isEmpty()) {
        Modal.showAlert('验证码不能为空');
        return;
    }

    // 获取接口数据
    let data = await Api.getService('qcloud365-api/user/checkCode', map,'GET');
    if (data.errorCode == 0) {
        console.log(data);
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};
// 注册
Services.Function10000102 = async function (params) {
    let map = new Map();
    // 手机号
    map.set('phone', params.phone);
    map.set('code', params.code);
    map.set('pwd', params.pwd);
    map.set('commitPwd', params.cpwd);
    if (StringUtils(map.get('phone')).isEmpty()) {
        Modal.showAlert('手机号不能为空');
        return;
    }
    if (StringUtils(map.get('code')).isEmpty()) {
        Modal.showAlert('验证码不能为空');
        return;
    }
    if (StringUtils(map.get('pwd')).isEmpty()) {
        Modal.showAlert('密码不能为空');
        return;
    }
    if (StringUtils(map.get('commitPwd')).isEmpty()) {
        Modal.showAlert('确认密码不能为空');
        return;
    }

    // 获取接口数据
    let data = await Api.getService('qcloud365-api/user/register', map,'GET');
    if (data.errorCode == 0) {
        Modal.showAlert('注册成功')
        console.log(data);
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};
// 找回密码
Services.Function10000104 = async function (params) {
    let map = new Map();
    // 手机号
    map.set('phone', params.phone);
    map.set('pwd', params.pwd);
    map.set('commitPwd', params.cpwd);
    if (StringUtils(map.get('pwd')).isEmpty()) {
        Modal.showAlert('密码不能为空');
        return;
    }
    if (StringUtils(map.get('commitPwd')).isEmpty()) {
        Modal.showAlert('确认密码不能为空');
        return;
    }

    // 获取接口数据
    let data = await Api.getService('qcloud365-api/user/updateFindPwd', map,'GET');
    if (data.errorCode == 0) {
        Modal.showAlert('找回密码成功')
        console.log('======'+data);
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

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