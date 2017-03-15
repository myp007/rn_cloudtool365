/**
 * 描述: 切换菜单
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/28 16:49
 */
import React from 'react';
import ReactNative from 'react-native';
const {Image} = ReactNative;
import TabNavigator from 'react-native-tab-navigator';
import {StyleSheet} from './StyleSheet';
import {Config} from './Config';
import {PageComponent} from './PageComponent';
const {pxToDp} = StyleSheet;

let children = null;
// 当前选中显示的视图
let SELECTED_TAB = null;

export function getTabMenu(_children) {
    SELECTED_TAB = Config.get('DEFAULT_OPEN_VIEW');
    children = _children;
    return TabMenu;
}

class TabMenu extends PageComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 默认显示的视图
            selectedTab: Config.get('DEFAULT_OPEN_VIEW')
        };

        // 当前Tab的场景
        this.scenes = new Map();
    }

    componentWillMount() {
        if (!children.length || children.length < 2) {
            throw new Error('使用tab-bar组件，至少要有两个视图');
        }
    }

    setNavigatorLeftButton(route, navigator, index, navState) {
        for (let i = 0; i < children.length; i++) {
            // 场景
            let scene = children[i].props['renderView'];
            if (SELECTED_TAB == children[i].props.id && !!scene.prototype.setNavigatorLeftButton) {
                return scene.prototype.setNavigatorLeftButton.call(this.scenes.get(scene), route, navigator, index, navState)
            }
        }
    }

    setNavigatorRightButton(route, navigator, index, navState) {
        for (let i = 0; i < children.length; i++) {
            // 场景
            let scene = children[i].props['renderView'];
            if (SELECTED_TAB == children[i].props.id && !!scene.prototype.setNavigatorRightButton) {
                return scene.prototype.setNavigatorRightButton.call(this.scenes.get(scene), route, navigator, index, navState)
            }
        }
    }

    setNavigatorTitle(route, navigator, index, navState) {
        for (let i = 0; i < children.length; i++) {
            // 场景
            let scene = children[i].props['renderView'];
            if (SELECTED_TAB == children[i].props.id && !!scene.prototype.setNavigatorTitle) {
                return scene.prototype.setNavigatorTitle.call(this.scenes.get(scene), route, navigator, index, navState)
            }
        }
    }

    setNavigatorStyle(route, navigator, index, navState) {
        for (let i = 0; i < children.length; i++) {
            // 场景
            let scene = children[i].props['renderView'];
            if (SELECTED_TAB == children[i].props.id && !!scene.prototype.setNavigatorStyle) {
                return scene.prototype.setNavigatorStyle.call(this.scenes.get(scene), route, navigator, index, navState)
            }
        }
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={styles.barStyle}>
                {children.map((children, i) => {
                    let RenderView = children.props['renderView'];
                    return (
                        <TabNavigator.Item
                            selected={SELECTED_TAB === children.props.id}
                            title={children.props.title}
                            renderIcon={() => <Image style={styles.globalIcon} source={children.props.renderIcon}/>}
                            renderSelectedIcon={() => <Image style={styles.globalIcon} source={children.props.renderSelectedIcon}/>}
                            titleStyle={children.props.titleStyle}
                            selectedTitleStyle={children.props.selectedTitleStyle}
                            tabStyle={children.props.tabStyle}
                            onPress={()=>{
                                SELECTED_TAB = children.props.id;
                                this.setState({ r: Math.random()});
                                // 刷新navigator
                                this.props.navigator.setState({r: Math.random()});
                            }}
                            key={i}>
                            <RenderView {...this.props} getInstance={(instance)=>{
                                this.scenes.set(RenderView, instance);
                            }}/>
                        </TabNavigator.Item>
                    );
                })}
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    barStyle: {
        borderTopWidth: StyleSheet.getMinLineWidth(),
        borderTopColor: '#cccccc'
    }, tabStyle: {
        backgroundColor: '#FFFFFF'
    }, tabText: {
        color: "#333333",
        fontSize: pxToDp(22)
    }, selectedTabText: {
        color: "#9b7fff",
        fontSize: pxToDp(22)
    }
});