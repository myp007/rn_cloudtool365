/**
 * 描述: 单选按钮
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/5 17:36
 */
import React from 'react';
import ReactNative from 'react-native';
const {TouchableOpacity, ListView, Image, Text} = ReactNative;
// 引入blue-book工具包
import {StyleSheet, Icon} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            defaultValue: this.props.defaultValue
        }
    }

    render() {
        return (
            <ListView
                style={[styles.starBox, this.props.style]}
                contentContainerStyle={{ justifyContent: 'center', alignItems:'center', flex: 1}}
                horizontal={true}
                dataSource={this.state.ds.cloneWithRows(this._getDataSource())}
                enableEmptySections={true}
                renderRow={(data)=>this.props.renderView(data)}/>
        );
    }

    // 渲染一行
    _renderRow(rowData) {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        defaultValue: rowData.key
                    });
                    if(!!this.props.onSelect) {
                        this.props.onSelect(rowData.key, rowData.value);
                    }
                }}
                style={styles.itemBox}>
                <Image style={styles.globalIcon} source={this.state.defaultValue == rowData.key ? Icon.get('ICON_ITEM_SELECTED') : Icon.get('ICON_ITEM')}/>
                <Text style={styles.text}>{rowData.value}</Text>
            </TouchableOpacity>
        );
    }

    // 多行
    _renderView(rowData,is) {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        defaultValue: rowData.key
                    });
                    if(!!this.props.onSelect) {
                        this.props.onSelect(rowData.key, rowData.value);
                    }
                }}
                style={styles.itemBox}>
                <Image style={styles.globalIcon} source={this.state.defaultValue == rowData.key ? Icon.get('ICON_ITEM_SELECTED') : Icon.get('ICON_ITEM')}/>
                <Text style={styles.text}>{rowData.value}</Text>
            </TouchableOpacity>
        );
    }

    /**
     * 获取数据源
     * @private
     */
    _getDataSource() {
        // 数据map
        let d = this.props.dataSource;
        // 数据源
        let dataSource = [];
        for (let [key, value] of d) {
            dataSource.push({
                key: key,
                value: value
            });
        }
        return dataSource;
    }
}

const styles = StyleSheet.create({
    itemBox: {
        flexDirection: 'row',
        flex: 1
    }, text: {
        marginLeft: pxToDp(15)
    }
});