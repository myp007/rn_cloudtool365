/**
 * 描述: 服务管理工具
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/8 15:16
 */
export default class ServicesClass {
    constructor() {

    }

    /**
     * 设置一条配置
     * @param key
     * @param value
     */
    set(key, value) {
        this[key] = value;
    }

    /**
     * 获取一条配置
     * @param key
     * @returns {*}
     */
    get(key) {
        return this[key];
    }

    config(config) {
        for (let k of Object.keys(config)) {
            this[k] = config[k];
        }
    }
}

export const Services = new ServicesClass();