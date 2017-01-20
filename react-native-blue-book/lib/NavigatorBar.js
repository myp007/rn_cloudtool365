/**
 * 描述: 导航栏工具
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/28 15:10
 */
import React from 'react';
import ReactNative from 'react-native';
const {View, Text, Navigator, TouchableOpacity, Image} = ReactNative;
// 导入blue-book工具包{图标组件}
import {Icon, StyleSheet} from 'react-native-blue-book';

const styles = StyleSheet.create({
    navigatorBar: {
        // paddingTop: Platform.OS === 'ios' ? 0 : 20
        backgroundColor: '#1486fa'
    }, layout: {
        flex: 1,
        paddingTop: StyleSheet.getNavigatorBarHeight()
    }, navContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, navContent: {
        flex: 1,
        justifyContent: 'center'
    }, navText: {
        fontSize: 18,
        color: '#FFFFFF'
    }
});

class NavigatorBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: null
        }
    }

    render() {
        // navigationStyles={Navigator.NavigationBar.StylesIOS}
        return (
            <Navigator
                style={styles.navigatorBar}
                initialRoute={{component: this.props.initialRoute}}
                sceneStyle={[styles.layout, this.state.layout]}
                configureScene={this.configureScene}
                renderScene={(route, navigator)=>{return this.renderScene(route, navigator)}}
                navigationBar={
                    <Navigator.NavigationBar
                    style={styles.navContainer}
                    routeMapper={{
                        LeftButton: this.props['leftButton'] || NavigationBarMapper.LeftButton,
                        RightButton: this.props['rightButton'] || NavigationBarMapper.RightButton,
                        Title: this.props['title'] || NavigationBarMapper.Title
                    }}/>
                }
            />
        );
    }

    /**
     * 配置场景动画
     * @param route 路由
     * @param routeStack 路由栈
     * @returns {*} 动画
     */
    configureScene(route, routeStack) {
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
        }
        return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
    }

    /**
     * 使用动态页面加载
     * @param route 路由
     * @param navigator 导航器
     * @returns {XML} 页面
     */
    renderScene(route, navigator) {
        return <route.component route={route} navigator={navigator} {...route.passProps} />;
    }
}

// 导航栏的Mapper
const NavigationBarMapper = {
    // 左键
    LeftButton(_route, navigator, index, navState) {
        // 左菜单设置列表
        let leftButtons = navState.NavigatorLeftButtons || {};
        // 路由列表
        let routes = navigator.getCurrentRoutes();
        // 当前路由
        let route = routes[routes.length - 1];
        if (route.component === _route.component) {
            for (let [key, value] of leftButtons) {
                if (key == route.component) {
                    return value(route, navigator, index, navState);
                }
            }
            // 默认加上返回键
            return (
                <TouchableOpacity style={styles.globalNavButton} onPress={()=>{navigator.pop()}}>
                    <Image style={styles.globalIcon} source={Icon.get('ICON_BACK')}/>
                </TouchableOpacity>
            );
        }
    },
    // 右键
    RightButton(_route, navigator, index, navState) {
        // 右菜单设置列表
        let rightButtons = navState.NavigatorRightButtons || {};
        // 路由列表
        let routes = navigator.getCurrentRoutes();
        // 当前路由
        let route = routes[routes.length - 1];
        if (route.component === _route.component) {
            for (let [key, value] of rightButtons) {
                if (key == route.component) {
                    return value(route, navigator, index, navState);
                }
            }
        }
    },
    // 标题
    Title(route, navigator, index, navState) {
        return (
            <View style={styles.navContent}>
                <Text style={styles.navText}>{route.title || '云助手365'}</Text>
            </View>
        );
    }
};

export default NavigatorBar;
