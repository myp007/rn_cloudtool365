/**
 * 描述: 自定义Map
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/2/14 15:00
 */
export function SimpleMap(o) {
    if (o instanceof Array) {
        return new Map(o);
    } else if (o instanceof Object) {
        let map = new Map();
        for (let k of Object.keys(o)) {
            map.set(k, o[k]);
        }
        return map;
    } else {
        return new Map();
    }
}