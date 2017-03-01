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
/**
 * 获取本地用户信息
 * @returns {Promise.<void>}
 */
let getLocalUserInfo = Services.getLocalUserInfo = async function () {
    // 获取用户信息
    let userInfo = await Storage.getItem('USER_INFO');
    if (!userInfo) {
        // Modal.showAlert('登陆过期，请重新登陆！');
        // PageComponent.prototype.go('/loginregister/LoginView', '用户登录');
        // this.go('/loginregister/LoginView', '用户登录',{
        // });
    }
    return userInfo;
};

/**
 * 设置本地用户信息
 * @param params 用户信息
 * @returns {Promise.<*|Promise>}
 */
Services.setLocalUserInfo = async function (params) {
    // 获取用户信息
    let userInfo = await this.getLocalUserInfo();
    if (!!userInfo) {
        userInfo = {...userInfo, ...params};
        Storage.setItem('USER_INFO', userInfo);
    }
};
// 通过token获取用户信息
Services.Function10000000 = async function (isShowErrorMsg) {
    // 从本地获取用户信息
    let userInfo = await Storage.getItem('USER_INFO');
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    console.info('token===========')
    console.info(userInfo.token)
    // 获取接口数据
    let data = await Api.getService('qcloud365-api/user/getByToken', map,'GET');
    if (data.errorCode == 0) {
        return data;
    } else {
        if (isShowErrorMsg !== false) Modal.showAlert(data.errorMsg);
    }
};
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
    let data = await Api.getService('qcloud365-api/user/login', map,'POST');
    if (data.errorCode == 0) {
        Modal.showAlert('登录成功')
        Storage.setItem('USER_INFO', {
            token: data.results.token || '',
            tag: data.results.tag || '',
            userName: data.results.userName || '',
            nickName: data.results.nickName || '',
            phone: data.results.phone || '',
            headImg:data.results.headImg || '',
        });
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
        Modal.showAlert('验证码已发送')
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
    let data = await Api.getService('qcloud365-api/user/register', map,'POST');
    if (data.errorCode == 0) {
        Modal.showAlert('注册成功')
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
    let data = await Api.getService('qcloud365-api/user/updateFindPwd', map,'POST');
    if (data.errorCode == 0) {
        Modal.showAlert('找回密码成功')
        console.log(data);
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};