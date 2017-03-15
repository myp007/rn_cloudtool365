/**
 * 描述:
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/2 16:47
 */
import {Config} from './Config';
class LanguageClass {
    constructor() {
        // 语言类型
        this.LANGUAGE_TYPE = null;
    }

    /**
     * 通过key获取语言翻译
     * @param key
     */
    get(key) {
        // 语言
        let language = this.getLanguageType();
        if (!this[language]) {
            new Error('无法识别语言: ' + language);
        }
        return this[language]['map'].get(key);
    }

    /**
     * 获取指定语言类型字典
     * @param type
     */
    getLanguageTypeMap(type) {
        // 语言
        let language = this.getLanguageType();
        if (!!type) {
            language = type;
        }
        if (!this[language]) {
            new Error('无法识别语言: ' + language);
        }
        return this[language]['typeMap'];
    }

    /**
     * 注册一门语言
     * @param key 语言标识
     * @param name 语言言名称
     * @param map 语言字典
     * @param typeMap 语言类型字典（对所有语言的描述）
     */
    register(key, name, map, typeMap) {
        this[key] = {
            name: name,
            map: map,
            typeMap: typeMap
        };
    }

    /**
     * 获取当前语言类型
     */
    getLanguageType() {
        // 默认配置中的语言
        let language = Config.get('BLUE_BOOK_LANGUAGE');
        if (this.LANGUAGE_TYPE !== null) {
            language = this.LANGUAGE_TYPE;
        }
        return language;
    }

    /**
     * 设置语言类型(如zh:中文,en:英文)
     * @param type
     */
    setLanguageType(type) {
        this.LANGUAGE_TYPE = type;
    }
}

export const Language = new LanguageClass();