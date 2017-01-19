/**
 * 描述: 调用接口服务工具
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/8 13:05
 */
import {Config} from './Config';
import Modal from './components/Modal';

// 创建接口服务工具对象
export const Api = {
    // 当前请求数量
    requestNum: 0
};

/**
 * 向一个地址发送请求，返回一个promise对象
 * @param path 请求的地址
 * @param options 请求参数
 * @returns {Promise.<TResult>} 返回的promise对象
 */
Api.request = function (path, options) {
    /**
     * 将请求结果转换为json格式
     * @param response
     * @returns {*|Promise<any>}
     */
    function parseJSON(response) {
        let data = response.json();
        data.errorCode = parseInt(data.errorCode);
        return data;
    }

    /**
     * 校验请求结果的状态
     * @param response
     * @returns {*}
     */
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

    // 请求地址
    let url = path;

    // 请求参数
    let params = options.body || {};

    // 设置GET请求参数
    if (options.method.toLocaleUpperCase() == 'GET') {
        let paramsArray = [];
        for (let [key, value] of params) {
            paramsArray.push(key + '=' + value);
        }
        if (url.search(new RegExp('\\?')) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }

    // 请求头部
    let headers = new Headers({
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache'
    });

    // 请求设置
    let setting = {
        // 请求方法(GET, POST)
        method: options.method || {},
        // 请求头对象
        // headers: headers,
        // 请求模式(cors，no-cors，same-origin，navigate)
        mode: 'cors',
        // 请求的缓存模式（default，reload，no-cache）
        cache: 'default'
    };

    // 打印接口请求信息
    if (Config.get('BLUE_BOOK_API_PRINT_CONSOLE')) {
        let log = ['===============' + options.requestCode + '\n'];
        log.push('请求方式: ' + options.method);
        log.push('请求地址: ');
        log.push(path);
        log.push('请求入参: ');
        for (let [key, value] of params) {
            log.push(key + ' : ' + value);
        }
        console.log(log.join('\n'));
    }

    // 设置POST请求参数
    if (options.method.toLocaleUpperCase() == 'POST') {
        let data = new FormData();
        for (let [key, value] of params) {
            data.append(key, value);
        }
        setting.body = data;
    }

    return fetch(url, setting)
        .then(checkStatus)
        .then(parseJSON)
        .catch((e) => {
            console.log(e);
            return {
                errorCode: -1,
                errorMsg: '网络错误',
                results: {}
            }
        });
};

/**
 * 获取指定Url的服务
 * @param url 服务地址
 * @param apiCode 接口地址
 * @param params 请求入参
 * @param type 请求类型("GET"||"POST")
 * @param isOpenWait 请求是否打开等待弹窗(默认打开)
 * @returns {Promise.<TResult>|Promise.<U>}
 */
Api.getServiceByUrl = function (url, apiCode, params, type = Config.get('BLUE_BOOK_API_DEFAULT_METHOD'), isOpenWait = true) {
    type = !!type ? type : Config.get('BLUE_BOOK_API_DEFAULT_METHOD');
    isOpenWait = !(isOpenWait === false);
    // 请求设置
    let setting = {
        method: type,
        body: params
    };

    if (Config.get('BLUE_BOOK_API_PRINT_CONSOLE')) {
        // 自定义请求流水号，用于调试接口
        setting.requestCode = new Date().getTime();
    }

    // 请求开始，打开等待弹框
    if (isOpenWait === true) {
        Modal.openWait();
    }
    // 请求数量加1
    Api.requestNum++;
    return Api.request(url + apiCode, setting).then((data) => {
        // 请求完成，减去一个请求数
        if (Api.requestNum > 0) {
            --Api.requestNum;
        }
        // 当前所有请求完成
        if (Api.requestNum == 0) {
            // 请求结束，关闭等待弹框
            Modal.closeWait();
        }
        let {errorCode} = data;
        // 打印接口结果信息
        if (Config.get('BLUE_BOOK_API_PRINT_CONSOLE')) {
            console.log('===============' + setting.requestCode + '\n返回结果: ');
            console.log(data);
        }
        switch (errorCode) {
            case -1: {
                // message.error("请求失败，网络错误！", 2);
                return data;
            }
            default: {
                return data;
            }
        }
    })
};

/**
 * 获取一个接口数据
 * @param apiCode 接口地址
 * @param params 请求入参
 * @param type 请求类型("GET"||"POST")
 * @param isOpenWait 请求是否打开等待弹窗
 * @returns {Promise.<TResult>}
 */
Api.getService = function (apiCode, params, type = Config.get('BLUE_BOOK_API_DEFAULT_METHOD'), isOpenWait = true) {
    return this.getServiceByUrl(Config.get('BLUE_BOOK_API_PATH'), apiCode, params, type, isOpenWait)
};