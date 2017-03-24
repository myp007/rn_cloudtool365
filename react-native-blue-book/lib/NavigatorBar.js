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
const {View, Text, Navigator, TouchableOpacity, Image, Platform} = ReactNative;
// 导入blue-book工具包{图标组件}
import {Icon, StyleSheet} from 'react-native-blue-book';
// 导入blue-book工具包{图标组件}
import {StringUtils} from './StringUtils';

const styles = StyleSheet.create({
    navigatorBar: {
        paddingTop: StyleSheet.getStatusBarHeight()
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
    },globalIcon:{
        width:25,
        height:25
    }
});

class NavigatorBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            navigatorBarHeight: null
        };
    }

    static propTypes = {
        // 导航条背景颜色
        navigatorBarBackgroundColor: React.PropTypes.string,
        // 导航条高度
        navigatorBarHeight: React.PropTypes.number
    };

    static defaultProps = {
        navigatorBarBackgroundColor: null,
        navigatorBarHeight: null
    };

    render() {
        // navigationStyles={Navigator.NavigationBar.StylesIOS}
        // 导航条高度
        let navigatorBarHeight = this.state.navigatorBarHeight == null ? this.props.navigatorBarHeight : this.state.navigatorBarHeight;
        // 设置导航栏高度
        StyleSheet.setNavigatorBarHeight(navigatorBarHeight);
        // 导航条样式
        let NavigationBarStyles = Platform.OS === 'android' ? Navigator.NavigationBar.StylesAndroid : Navigator.NavigationBar.StylesIOS;
        // NavigationBarStyles.Stages.Center.Title.right = NavigationBarStyles.Stages.Center.Title.marginLeft;
        // NavigationBarStyles.Stages.Center.Title.top = 0;
        if (navigatorBarHeight !== null) {
            // NavigationBarStyles.Stages.Center.Title.height = navigatorBarHeight;
            // NavigationBarStyles.Stages.Center.LeftButton.height = navigatorBarHeight;
            // NavigationBarStyles.Stages.Center.RightButton.height = navigatorBarHeight;
        }
        // console.log(JSON.parse(JSON.stringify(NavigationBarStyles.Stages.Center.Title)));
        return (
            <Navigator
                style={[styles.navigatorBar]}
                initialRoute={{component: this.props.initialRoute}}
                sceneStyle={[styles.layout, this.state.layout, navigatorBarHeight !== null?{paddingTop: navigatorBarHeight}:{}]}
                configureScene={this.configureScene}
                navigationStyles={NavigationBarStyles}
                renderScene={(route, navigator)=>{return this.renderScene(route, navigator)}}
                navigationBar={this._renderNavigationBar(navigatorBarHeight)}
            />
        );
    }

    /**
     * 渲染导航条
     * @param navigatorBarHeight 导航条高度
     * @returns {XML}
     * @private
     */
    _renderNavigationBar(navigatorBarHeight) {
        // 导航条背景颜色
        let navigatorBarBackgroundColor = StringUtils(this.props.navigatorBarBackgroundColor).isNotEmpty() ? {backgroundColor: this.props.navigatorBarBackgroundColor} : {};
        return (
            <Navigator.NavigationBar
                style={[styles.navContainer, navigatorBarBackgroundColor, navigatorBarHeight !== null?{height: navigatorBarHeight}:{}]}
                routeMapper={{
                        LeftButton: this.props['leftButton'] || NavigationBarMapper.LeftButton,
                        RightButton: this.props['rightButton'] || NavigationBarMapper.RightButton,
                        Title: this.props['title'] || NavigationBarMapper.Title
                    }}/>
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
        // 路由列表
        let routes = navigator.getCurrentRoutes();
        // 当前路由
        let route = routes[routes.length - 1];
        // 左菜单设置列表
        let leftButtons = navState.NavigatorLeftButtons || {};
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
    Title(_route, navigator, index, navState) {
        function getTitle() {
            return (
                <View style={styles.navContent}>
                    <Text style={styles.navText}>{ _route.title || ''}</Text>
                </View>
            );
        }

        // 标题
        let title = getTitle();
        // 标题列表
        let titles = navState.NavigatorTitles || {};
        // 路由列表
        let routes = navigator.getCurrentRoutes();
        // 当前路由
        let route = routes[routes.length - 1];
        if (route.component === _route.component) {
            for (let [key, value] of titles) {
                if (key == route.component) {
                    title = value(route, navigator, index, navState);
                }
            }
        }
        return title;
    }
};

export default NavigatorBar;