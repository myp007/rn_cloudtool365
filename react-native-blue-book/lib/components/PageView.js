/**
 * 描述: 页面组件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/29 15:01
 */
import React from 'react';
import ReactNative from 'react-native';
const {ScrollView, Image, View} = ReactNative;
// 引入blue-book工具包
import {StyleSheet} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class PageView extends React.Component {
    constructor(props) {
        super(props);
    }

    test() {
        console.log('######################');
    }

    render() {
        return (
            <View style={styles.body}>
                <ScrollView
                    style={[{flex: 1, backgroundColor:'#eeeeee',width: pxToDp(750)}, this.props.style || {}]}
                    showsVerticalScrollIndicator={false}>
                    {this._renderBackgroundImage()}
                    {this.props.children}
                </ScrollView>
            </View>
        );
    }

    _renderBackgroundImage() {
        if (!!this.props.backgroundImage) {
            return (
                <View style={styles.bgBox}>
                    {/*背景图片*/}
                    <Image style={[styles.bgImage, this.props['backgroundImageStyle']]}
                           source={this.props.backgroundImage}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    }, container: {
        flex: 1,
        backgroundColor: '#efeff4'
    }, bgImage: {
        position: 'absolute',
        width: StyleSheet.getWindowWidth(),
        zIndex: -999,
        resizeMode: 'cover',
        top: 0
    }, bgBox: {
        position: 'absolute',
        width: StyleSheet.getWindowWidth(),
        height: pxToDp(400),
        backgroundColor: '#FFFFFF'
    }
});