/**
 * 描述: 主视图(入口视图)
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/10 10:00
 */
import React from 'react';
import ReactNative from 'react-native';
const {View, Image, StatusBar} = ReactNative;
// Tab菜单组件
import {getTabMenu} from '../TabMenu';
// 导航栏组件
import NavigatorBar from '../NavigatorBar';
import {StyleSheet} from '../StyleSheet';
import Modal from './Modal';

let children = null;

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        children = this.props.children;
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bgBox}>
                    {/*/!*导航栏背景图片*!/*/}
                    <Image style={styles.bgImage} source={this.props['navigatorBarBackgroundImage'] || null}/>
                </View>
                {/*加载框组件*/}
                <Modal.Loading />
                {/*对话框组件*/}
                <Modal.Dialog />
                {/*警告框组件*/}
                <Modal.Alert />
                {/*简单消息框组件*/}
                <Modal.SimpleMsg />
                <StatusBar
                    hidden={false}
                    animated={true}
                    backgroundColor="#564b6d"
                    translucent={false}/>
                <NavigatorBar initialRoute={this._getTabMenu()}/>
            </View>
        );
    }

    _getTabMenu() {
        return getTabMenu(children);
    }
}

/**
 * 实现一个接收tab-bar参数的类
 */
class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // 视图ID
        id: React.PropTypes.string,
        // 视图标题
        title: React.PropTypes.string,
        // 视图图标
        renderIcon: React.PropTypes.number,
        // 视图被选中时图标
        renderSelectedIcon: React.PropTypes.number,
        // 视图标题样式
        titleStyle: React.PropTypes.any,
        // 视图标题被选中样式
        selectedTitleStyle: React.PropTypes.any,
        // 要渲染的视图
        renderView: React.PropTypes.func,
        // 视图切换按钮样式
        tabStyle: React.PropTypes.any
    };

    render() {
        return <View/>;
    }
}

MainView.Item = Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    }, bgBox: {
        height: StyleSheet.getNavigatorBarHeight(),
        position: 'absolute',
        width: StyleSheet.getWindowWidth(),
        backgroundColor: '#FFFFFF'
    }, bgImage: {
        position: 'absolute',
        width: StyleSheet.getWindowWidth(),
        zIndex: -999,
        resizeMode: 'cover',
        bottom: 0
    }
});