/**
 * 描述: 本地存储控制
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/8 16:04
 */
import {AsyncStorage} from 'react-native';
export default class StorageClass {
    constructor() {
        this.items = new Set();
    }

    /**
     * 增加一个存储空间
     * @param key
     */
    add(key) {
        this.items.add(key);
    }

    /**
     * 将key字段的值设置成value
     * @param key
     * @param value
     */
    setItem(key, value) {
        if (!this.items.has(key)) {
            throw new Error('key "' + key + '"没有注册。为防止冲突，没有在配置文件Storage.js里注册的key，不允许存储!');
        }
        AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
                if (error) {
                    console.log('存储storage失败, key: "' + key + '"');
                    console.log(error);
                }
            }
        );
    }

    /**
     * 读取key字段
     * @param key
     * @param callBack
     * @returns {*}
     */
    getItem(key, callBack) {
        return AsyncStorage.getItem(key, (error, result) => {
            if (!!callBack) callBack(JSON.parse(result));
        }).then(function (data) {
            return JSON.parse(data);
        });
    }

    /**
     * 清除指定key的数据
     * @param key
     */
    clear(key) {
        AsyncStorage.setItem(key, '', (error) => {
                if (error) {
                    console.log('清除storage失败, key: "' + key + '"');
                    console.log(error);
                }
            }
        );
    }
}

export const Storage = new StorageClass();