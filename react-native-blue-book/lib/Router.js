/**
 * 描述: 路由器
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/2 14:48
 */
class RouterClass {
    constructor() {

    }

    getRoute(key) {
        let route = this[key];
        if (!route) {
            throw new Error('找不到路由:"' + key + '"');
        }
        return route;
    }

    // 添加一条路由配置
    addRoute(key, value) {
        value = !!value.default ? value.default : value;
        return this[key] = value;
    }

    // 获取所有路由列表
    getRoutes() {
        return this;
    }
}

export const Router = new RouterClass();