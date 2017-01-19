/**
 * 描述: 视图：主页
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
const {Text, TouchableOpacity, Image, ListView, View} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, Icon, Components, StyleSheet} from 'react-native-blue-book';
const {PageView} = Components;
const {pxToDp} = StyleSheet;

export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.body}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FFF'
    }
});