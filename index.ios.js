/**
 * 描述: IOS App
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:03
 */
import React from 'react';
import ReactNative from 'react-native';
import App from './src/app';

export default class app extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App />
        );
    }
}

ReactNative.AppRegistry.registerComponent('app', () => app);