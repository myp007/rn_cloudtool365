/**
 * 描述: 字符串处理工具
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/16 17:50
 */

class StringUtilsClass {
    constructor(str) {
        this.string = str;
    }

    /**
     * 判断一个字符串是否为空
     * @returns {boolean}
     */
    isEmpty() {
        return (this.string === null || this.string === undefined || (this.string + '').replace(new RegExp('\\s', 'g'), '').length == 0)
    }

    /**
     * 判断一个字串是否不为空
     * @returns {boolean}
     */
    isNotEmpty = function () {
        return !this.isEmpty();
    };
}

export const StringUtils = function (str) {
    return new StringUtilsClass(str);
};