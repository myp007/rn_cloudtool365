/**
 * 描述: 选择视图(加载从上个页面传入的列表，选中后返回并将参数传给上个页面)
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/4 10:26
 */
import React from 'react';
import ReactNative from 'react-native';
const {TouchableOpacity, ListView, Text} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class SelectView extends PageComponent {
    constructor(props) {
        super(props);

        // 路由参数
        let params = this.getRouteParams();
        // 从路由接收到的数据Map
        let map = params.list || new Map();
        // 格式化数据
        let list = [];

        if (!(map instanceof Map)) {
            throw new Error('单选控件的参数必须是一个Map对象!(你可能使用了"this.singleChoice()方法")');
        }

        for (let [key, value] of map) {
            list.push({key: key, value: value})
        }

        this.state = {
            // 银行卡列表
            list: list,
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            callBack: params.callBack
        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <ListView
                style={styles.globalBody}
                dataSource={this.state.ds.cloneWithRows(this.state.list)}
                renderRow={(...args)=>this._renderRow(...args)}
            />
        );
    }

    _renderRow(row, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity style={[styles.rowBox, styles.globalItem]} onPress={()=>{
                this.goBack();
                if(!!this.state.callBack) {
                    this.state.callBack(row.key, row.value);
                }
            }}>
                <Text style={styles.text}>{row.value}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    rowBox: {
        height: pxToDp(100),
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }, text: {
        color: '#333333',
        fontSize: pxToDp(30)
    }
});