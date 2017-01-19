/**
 * 描述: 行组件（更多）
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/31 17:06
 */
import React from 'react';
import ReactNative from 'react-native';
const {TouchableOpacity, Image, View} = ReactNative;
// 导入blue-book工具包{图标组件}
import {Icon, StyleSheet} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class MoreItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonStyle: {},
            textStyle: {}
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={[styles.rowBox, this.props.style]}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
                    <View style={[styles.textBox, this.props.textStyle]}>{this.props.children}</View>
                    <Image style={[styles.globalIcon]} source={Icon.get('ICON_MORE')}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowBox: {
        height: pxToDp(70)
    },
    textBox: {
        flex: 1,
        justifyContent: 'center'
    }, button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});