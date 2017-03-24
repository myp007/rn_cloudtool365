/**
 * 描述: 状态切换组件(继承ReactNative Switch)
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/2/14 10:14
 */
import React from 'react';
import ReactNative from 'react-native';
let ReactNativeSwitch = ReactNative.Switch;
export default class Switch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = {
            onTintColor: '#4cd864',
            thumbTintColor: '#FFF',
            tintColor: '#000'
        };
        props = {...props, ...this.props};
        return (
            <ReactNativeSwitch {...props}/>
        );
    }
}