/**
 * 描述: 可滑动行
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/13 11:13
 */
import React from 'react';
import ReactNative from 'react-native';
const {ScrollView, View} = ReactNative;
// 引入blue-book工具包
import {StyleSheet} from '../StyleSheet';
const {pxToDp} = StyleSheet;

export default class ScrollRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 滑动框宽
            scrollWidth: 0,
            // 内容宽
            contentWidth: 0
        };
    }

    componentWillMount() {

    }

    static propTypes = {
        // 滑动框样式
        style: React.PropTypes.any,
        // 滑动内容样式
        contentStyle: React.PropTypes.any
    };

    render() {
        let scrollView;
        return (
            <ScrollView
                horizontal={true}
                ref={(_scrollView)=>{
                    scrollView = _scrollView;
                }}
                onLayout={(view)=>{
                    let {nativeEvent} = view;
                    this.setState({
                        scrollWidth: nativeEvent.layout.width
                    });
                }}
                showsHorizontalScrollIndicator={false}
                onScrollEndDrag={(scroll)=>{
                        let {nativeEvent} = scroll;
                        let x = nativeEvent.contentOffset.x;
                        if(x>pxToDp(100)) {
                            scrollView.scrollTo({x:this.state.contentWidth-this.state.scrollWidth});
                        } else {
                            scrollView.scrollTo({x:0});
                        }
                    }}
                style={[this.props.style, {flex:1}]}>
                <View
                    onLayout={(view)=>{
                    let {nativeEvent} = view;
                    this.setState({
                            contentWidth: nativeEvent.layout.width
                        });
                    }}
                    style={this.props.contentStyle}>
                    {this.props.children}
                </View>
            </ScrollView>
        );
    }
}