/**
 * 描述: blue-book工具全局配置
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/3 10:06
 */
export default class BlueBookConfigClass {
    constructor() {
        // 背景图片
        this.BLUE_BOOK_IMAGE_CONTENT_BG = '';
        // 接口地址
        this.BLUE_BOOK_API_PATH = '';
        // 是否打印接口信息到控制台
        this.BLUE_BOOK_API_PRINT_CONSOLE = false;
        // 接口默认请求方式
        this.BLUE_BOOK_API_DEFAULT_METHOD = 'POST';
        // UI总宽度
        this.BLUE_BOOK_STYLESHEET_UI_ALL_WIDTH = 750;
        // 默认语言(zh: 简体中文,en: 英语)
        this.BLUE_BOOK_LANGUAGE = 'zh';
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

export const Config = new BlueBookConfigClass();