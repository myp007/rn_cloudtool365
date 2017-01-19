/**
 * 描述: 后台管理系统服务列表
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/9 11:19
 */
import {Services, Api, Config, Storage, Components, PageComponent, StringUtils} from 'react-native-blue-book';
const {Modal} = Components;

/**
 * 获取本地用户信息
 * @returns {Promise.<void>}
 */
async function getLocalUserInfo() {
    // 获取用户信息
    let userInfo = await Storage.getItem('USER_INFO');
    if (!userInfo) {
        Modal.showAlert('登陆过期，请重新登陆！');
        PageComponent.prototype.go('/login/LoginView', '用户登陆');
    }
    return userInfo;
}

// 获取管理功能列表
Services.Function10000110 = async function (params) {
    let map = new Map();
    // 身份标识
    map.set('token', params.token);
    // 获取接口数据
    let data = await Api.getService('10000110', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取会员列表
Services.Function10000200 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 页码
    map.set('pageNum', params['pageNum'] || 1);
    // 条数
    map.set('pageSize', params.pageSize || 10);
    // 获取接口数据
    let data = await Api.getService('10000200', map, null, false);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取会员详情
Services.Function10000203 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 用户id
    map.set('userId', params['userId'] || '');
    // 获取接口数据
    let data = await Api.getService('10000203', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 新增会员信息
Services.Function100002011 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 姓名
    map.set('userName', params['userName'] || '');
    // 性别
    map.set('sex', params['sex'] || '');
    // 身高
    map.set('height', params['height'] || '');
    // 体重
    map.set('weight', params['weight'] || '');
    // 三围
    map.set('bwh', params['bwh'] || '');
    // 自我介绍
    map.set('info', params['info'] || '');
    // 年龄
    map.set('age', params['age'] || '');
    // 用户状态
    map.set('status', params['status'] || '');
    // 服务状态
    map.set('isPlay', params['isPlay'] || '');
    // 获取接口数据
    let data = await Api.getService('10000201', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 修改会员信息
Services.Function100002012 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 用户id
    map.set('userId', params['id'] || '');
    // 姓名
    map.set('userName', params['userName'] || '');
    // 性别
    map.set('sex', params['sex'] || '');
    // 身高
    map.set('height', params['height'] || '');
    // 体重
    map.set('weight', params['weight'] || '');
    // 三围
    map.set('bwh', params['bwh'] || '');
    // 自我介绍
    map.set('info', params['info'] || '');
    // 年龄
    map.set('age', params['age'] || '');
    // 用户状态
    map.set('status', params['status'] || '');
    // 服务状态
    map.set('isPlay', params['isPlay'] || '');
    if (StringUtils(map.get('userId')).isEmpty()) {
        Modal.showAlert('用户ID不能为空');
        return;
    }
    // 获取接口数据
    let data = await Api.getService('10000201', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 重置会员密码
Services.Function10000202 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 会员id
    map.set('userId', params['userId'] || '');
    // 获取接口数据
    let data = await Api.getService('10000202', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取管理员列表
Services.Function10000130 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 页码
    map.set('pageNum', params['pageNum'] || 1);
    // 条数
    map.set('pageSize', params['pageSize'] || 10);
    // 获取接口数据
    let data = await Api.getService('10000130', map, null, false);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取管理员详情
Services.Function10000132 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 身份标识
    map.set('userId', params.userId);
    // 获取接口数据
    let data = await Api.getService('10000132', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 添加管理员信息
Services.Function100001311 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 用户名
    map.set('userName', params['userName'] || '');
    // 密码
    map.set('psw', params['passWord'] || '');
    // 管理员等级角色id
    map.set('roleId', params['roleId'] || '');
    // 状态
    map.set('status', params['status']);
    if (StringUtils(map.get('userName')).isEmpty()) {
        Modal.showAlert('用户名不能为空');
        return;
    }
    if (StringUtils(map.get('psw')).isEmpty()) {
        Modal.showAlert('密码不能为空');
        return;
    }
    if (StringUtils(map.get('roleId')).isEmpty()) {
        Modal.showAlert('角色ID不能为空');
        return;
    }
    if (StringUtils(map.get('status')).isEmpty()) {
        Modal.showAlert('状态不能为空');
        return;
    }
    if (params['repeatPassword'] != map.get('psw')) {
        Modal.showAlert('两次输入的密码不一致');
        return;
    }
    let data = await Api.getService('10000131', map);

    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 修改管理员信息
Services.Function100001312 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 用户名
    map.set('userName', params['userName'] || '');
    // 系统用户ID
    map.set('userId', params['id'] || '');
    // 角色ID
    map.set('roleId', params['roleId'] || '');
    // 邮件
    map.set('email', params['email'] || '');
    // 电话
    map.set('phone', params['phone'] || '');
    if (StringUtils(map.get('userName')).isEmpty()) {
        Modal.showAlert('用户名不能为空');
        return;
    }
    if (StringUtils(map.get('userId')).isEmpty()) {
        Modal.showAlert('系统用户ID不能为空');
        return;
    }
    if (StringUtils(map.get('roleId')).isEmpty()) {
        Modal.showAlert('角色ID不能为空');
        return;
    }
    if (StringUtils(map.get('email')).isEmpty()) {
        Modal.showAlert('邮件不能为空');
        return;
    }
    if (StringUtils(map.get('phone')).isEmpty()) {
        Modal.showAlert('电话不能为空');
        return;
    }
    // 获取接口数据
    let data = await Api.getService('10000131', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取审核请求列表
Services.Function10000210 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 页码
    map.set('pageNum', params['pageNum'] || 1);
    // 条数
    map.set('pageSize', params['pageSize'] || 10);
    // 获取接口数据
    let data = await Api.getService('10000210', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 审核通过
Services.Function10000211 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 申请id
    map.set('id', params['id'] || '');
    // 申请人id
    map.set('uId', params['uId'] || '');
    if (StringUtils(map.get('id')).isEmpty()) {
        Modal.showAlert('申请ID不能为空');
        return;
    }
    if (StringUtils(map.get('uId')).isEmpty()) {
        Modal.showAlert('申请人ID不能为空');
        return;
    }
    // 获取接口数据
    let data = await Api.getService('10000211', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 审核不通过
Services.Function10000212 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 申请id
    map.set('id', params['id'] || '');
    // 拒绝理由
    map.set('dicKey', params['dicKey']);
    if (StringUtils(map.get('dicKey')).isEmpty()) {
        Modal.showAlert('拒绝理由不能为空');
        return;
    }
    // 获取接口数据
    let data = await Api.getService('10000212', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};

// 获取消息列表
Services.Function10000300 = async function (params) {
    // 获取本地用户信息
    let userInfo = await getLocalUserInfo();
    if (!userInfo) {
        return;
    }
    let map = new Map();
    // 身份标识
    map.set('token', userInfo.token);
    // 页码
    map.set('pageNum', params['pageNum'] || 1);
    // 条数
    map.set('pageSize', params['pageSize'] || 10);
    // 获取接口数据
    let data = await Api.getService('10000300', map);
    if (data.errorCode == 0) {
        return data;
    } else {
        Modal.showAlert(data.errorMsg);
    }
};