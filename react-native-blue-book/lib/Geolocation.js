/**
 * 描述: 地理位置
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/2/20 15:12
 */
// 地理位置对象
export const Geolocation = {};

/**
 * 获取当前地理位置
 * @returns {Promise}
 */
Geolocation.getCurrentPosition = function () {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
        });
    });
};


