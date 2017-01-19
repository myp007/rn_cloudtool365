/**
 * 描述:
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/2 16:47
 */
class IconClass {
    constructor() {
        // 加载图标
        this.BLUE_BOOK_ICON_LOADING = [
            require('../assets/images/icon/loading/loading0.png'),
            require('../assets/images/icon/loading/loading1.png'),
            require('../assets/images/icon/loading/loading2.png'),
            require('../assets/images/icon/loading/loading3.png'),
            require('../assets/images/icon/loading/loading4.png'),
            require('../assets/images/icon/loading/loading5.png'),
            require('../assets/images/icon/loading/loading6.png'),
            require('../assets/images/icon/loading/loading7.png')
        ];

        // 没有东西
        this.BLUE_BOOK_NOTHING = require('../assets/images/icon/nothing.png');
    }

    // 获取一个指定图标
    get(key) {
        let val = this[key];
        if(!val) {
            new Error('图标不存在');
        }
        return val;
    }

    // 添加一个图标
    add(key, value) {
        return this[key] = value;
    }

    // 获取所有路由列表
    getIcons() {
        return this;
    }
}

export const Icon = new IconClass();