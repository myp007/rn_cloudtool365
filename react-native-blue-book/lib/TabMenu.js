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

export function getTabMenu(_children) {
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
    }

    componentWillMount() {
        if (!children.length || children.length < 2) {
            throw new Error('使用tab-bar组件，至少要有两个视图');
        }
    }

    setNavigatorLeftButton(route, navigator, index, navState) {
        for (let i = 0; i < children.length; i++) {
            if (this.state.selectedTab == children[i].props.id && !!children[i].props['renderView'].prototype.setNavigatorLeftButton) {
                return children[i].props['renderView'].prototype.setNavigatorLeftButton.call(this, route, navigator, index, navState)
            }
        }
    }

    setNavigatorRightButton(route, navigator, index, navState) {
        for (let i = 0; i < children.length; i++) {
            if (this.state.selectedTab == children[i].props.id && !!children[i].props['renderView'].prototype.setNavigatorRightButton) {
                return children[i].props['renderView'].prototype.setNavigatorRightButton.call(this, route, navigator, index, navState)
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
                            selected={this.state.selectedTab === children.props.id}
                            title={children.props.title}
                            renderIcon={() => <Image style={styles.globalIcon} source={children.props.renderIcon}/>}
                            renderSelectedIcon={() => <Image style={styles.globalIcon} source={children.props.renderSelectedIcon}/>}
                            titleStyle={children.props.titleStyle}
                            selectedTitleStyle={children.props.selectedTitleStyle}
                            tabStyle={children.props.tabStyle}
                            onPress={()=>{
                                this.setState({ selectedTab:children.props.id});
                                // 刷新navigator
                                this.props.navigator.setState({r: Math.random()});
                            }}
                            key={i}>
                            <RenderView {...this.props}/>
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
        borderTopColor: '#cccccc',
        height: pxToDp(0)
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