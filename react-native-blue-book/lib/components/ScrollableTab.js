/**
 * 描述: 可滑动切换Tab
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/2/10 14:27
 */
import React from 'react';
import ReactNative from 'react-native';
let {View} = ReactNative;
import ScrollableTabView from '../plugins/react-native-scrollable-tab-view';

export default class ScrollableTab extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // 切换条方向(row: 横向,column:纵向，默认：row)
        tabBarDirection: React.PropTypes.string,
        // 是否等分(true: 等分,false:不等分，默认：true)
        tabBarBisect: React.PropTypes.bool,
        // 菜单样式
        tabBarStyle: View.propTypes.style,
        // 菜单项样式
        tabBarItemStyle: View.propTypes.style
    };

    render() {
        let props = {...this.props};
        return (
            <ScrollableTabView {...props}>
                {this.props.children}
            </ScrollableTabView>
        );
    }
}