/**
 * 描述: 范围选择条组件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/5 19:15
 */
import React from 'react';
import ReactNative from 'react-native';
const {Image, Text, View, PanResponder} = ReactNative;
// 引入blue-book工具包
import {StyleSheet, Icon} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class ScopeBar extends React.Component {
    constructor(props) {
        super(props);
        let defaultSmallNum = this.props.defaultSmallNum;
        let defaultBigNum = this.props.defaultBigNum;
        this.state = {
            // 小的数值
            smallNum: defaultSmallNum,
            // 大的数值
            bigNum: defaultBigNum,
            // 小的实际值
            smallRealityNum: 0,
            // 大的实际值
            bigRealityNum:0
        };
    }

    static propTypes = {
        defaultSmallNum: React.PropTypes.number,
        defaultBigNum: React.PropTypes.number,
        minNum: React.PropTypes.number,
        maxNum: React.PropTypes.number,
        onMove: React.PropTypes.func
    };

    componentWillMount() {
        // 渲染完成后执行方法数组(用于通知子组件渲染完成)
        this.onParentDid = [];
        // 组容器组件是否渲染完成
        this.isRendered = false;
        // 组件最小值
        this.minNum = this.props.minNum;
        // 组件最大值
        this.maxNum = this.props.maxNum;
    }

    render() {
        return (
            <View style={styles.scopeBox}>
                <View style={styles.textBox}>
                    <Text style={styles.text}>{this.state.smallNum}</Text>
                </View>
                <View style={styles.lineBox} onLayout={(args)=>{
                    if(this.isRendered === false) {
                        let {nativeEvent} = args;
                        let layout = {...nativeEvent.layout};
                        layout.minNum = this.minNum;
                        layout.maxNum = this.maxNum;
                        for(let i=0; i<this.onParentDid.length; i++) {
                            this.onParentDid[i](layout);
                        }
                        this.isRendered = true;
                    }
                }}>
                    <View style={styles.line}/>
                    <Point
                        defaultPlace={this.state.smallNum}
                        onMove={(num, left)=>{
                            this.setState({smallNum:num});
                            this.setState({smallRealityNum: left});
                            this.props.onMove(num, this.state.bigNum);
                        }}
                        maxPlace={this.state.bigRealityNum}
                        onParentDid={this.onParentDid}/>
                    <Point
                        defaultPlace={this.state.bigNum}
                        onMove={(num, left)=>{
                            this.setState({bigNum:num});
                            this.setState({bigRealityNum: left});
                            this.props.onMove(this.state.smallNum, num);
                        }}
                        minPlace={this.state.smallRealityNum}
                        onParentDid={this.onParentDid}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>{this.state.bigNum}</Text>
                </View>
            </View>
        );
    }
}

// 滑动点
class Point extends React.Component {
    constructor(props) {
        super(props);

        // 表示数值
        let num = this.props['defaultPlace'];
        this.state = {
            left: 0,
            num: num
        };
    }

    componentWillMount() {
        // 触摸到屏幕时，点组件距父元素左边的距离
        this.touchStartLeft = 0;
        // 父组件渲染完成后回调获取父组件信息
        this.props.onParentDid.push((layout) => {
            // {父组件宽}
            let {width, maxNum, minNum} = layout;
            // 组件最大数值
            this.maxNum = maxNum;
            // 组件最小数值
            this.minNum = minNum;
            // 组件数据差
            this.differ = maxNum - minNum;
            // 组件最大可移动长度
            this.maxLength = width - pxToDp(40);
            let left = (this.props['defaultPlace']-this.minNum) / this.differ * this.maxLength;
            // 组件渲染完成时设置默认表示数值
            this.setState({
                left: left
            });
            if (!!this.props.onMove) {
                this.props.onMove(Math.round(left / this.maxLength * this.differ + this.minNum), left);
            }
        });
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                this.touchStartLeft = this.state.left;
                this.minScope = 0;
                this.maxScope = this.maxLength;
                if(!!this.props['minPlace']) {
                    this.minScope = this.props['minPlace'];
                }
                if(!!this.props['maxPlace']) {
                    this.maxScope = this.props['maxPlace'];
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                let left = this.touchStartLeft + gestureState.dx;
                // 限制组件移动最小范围
                left = left < this.minScope ? this.minScope : left;
                // 限制组件移动最大范围
                left = left > this.maxScope ? this.maxScope : left;
                this.setState({
                    left: left
                });
                if (!!this.props.onMove) {
                    this.props.onMove(Math.round(left / this.maxLength * this.differ + this.minNum), left);
                }
            }
        });
    }

    render() {
        return (
            <View
                style={[styles.button, {marginLeft: this.state.left}]} {...this._panResponder.panHandlers}>
                <Image style={[styles.globalIcon,styles.button]} source={Icon.get('ICON_ITEM')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scopeBox: {
        height: pxToDp(40),
        alignItems: 'center',
        flexDirection: 'row'
    }, lineBox: {
        flex: 1,
        height: pxToDp(40),
        justifyContent: 'center'
    }, line: {
        backgroundColor: '#CCCCCC',
        height: 1
    }, textBox: {
        width: pxToDp(100),
        alignItems: 'center'
    }, text: {
        color: '#999999',
        fontSize: pxToDp(30)
    }, button: {
        position: 'absolute',
        width: pxToDp(40),
        height: pxToDp(40),
        top: 0
    }
});