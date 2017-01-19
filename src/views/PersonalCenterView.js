/**
 * 描述: 视图：个人中心
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
let {View, Text} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class PersonalCenterView extends PageComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.body}>
                <Text style={styles.msg}>暂不开放，敬请期待</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
    }, msg: {
        marginTop: pxToDp(100),
        color: '#999',
        fontSize: pxToDp(30)
    }
});