/**
 * 描述: 按钮组件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/30 21:49
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, TouchableOpacity} = ReactNative;
// 引入blue-book工具包
import {StyleSheet} from '../StyleSheet';
const {pxToDp} = StyleSheet;

export default class SimpleButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.button, this.props.style || {}]}>
                <Text style={[styles.text, this.props.textStyle || {}]}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: pxToDp(540),
        height: pxToDp(100),
        backgroundColor: '#9b7fff',
        borderWidth: StyleSheet.getMinLineWidth(),
        borderColor: '#9b7fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: pxToDp(14),
    }, text: {
        color: '#FFFFFF',
        fontSize: pxToDp(36)
    }
});