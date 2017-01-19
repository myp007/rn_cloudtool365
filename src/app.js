/**
 * 描述: 应用入口
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:38
 */
import React from 'react';
import ReactNative from 'react-native';
const {Platform} = ReactNative;
// 初始化配置文件
import  './config/config';
// 初始化路由配置
import './config/routes';
// 初始化图标配置
import './config/icons';
// 初始化服务列表配置
import './config/services';
// 初始化本地存储配置
import './config/storage';
// 引入blue-book工具包
import {StyleSheet, Components, Icon, Router} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {MainView} = Components;
// 主页视图
const IndexView = Router.getRoute('/IndexView');
// 个人中心视图
const PersonalCenterView = Router.getRoute('/PersonalCenterView');

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainView>
                <MainView.Item
                    id= 'index'
                    title="首页"
                    renderIcon={Icon.get('ICON_HOME')}
                    renderSelectedIcon={Icon.get('ICON_HOME_LIGHT')}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderView={IndexView}
                    tabStyle={[styles.tabStyle, {borderRightWidth: 1, borderRightColor: '#cccccc'}]}>
                </MainView.Item>
                <MainView.Item
                    id= 'personalCenter'
                    title="我的"
                    renderIcon={Icon.get('ICON_PERSONAL')}
                    renderSelectedIcon={Icon.get('ICON_PERSONAL_LIGHT')}
                    titleStyle={styles.tabText}
                    selectedTitleStyle={styles.selectedTabText}
                    renderView={PersonalCenterView}
                    tabStyle={styles.tabStyle}>
                </MainView.Item>
            </MainView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    }, bgImage: {
        position: 'absolute',
        width: pxToDp(750),
        height: Platform.OS === 'ios' ? 68 : 48,
        zIndex: -999
    },
    barStyle: {
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
    }, tabStyle: {
        backgroundColor: '#FFFFFF',
    }, tabText: {
        color: "#333333",
        fontSize: pxToDp(22)
    }, selectedTabText: {
        color: "#9b7fff",
        fontSize: pxToDp(22)
    }
});

export default App;