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
            list: this.props.dataSource || [],
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            select: this.props.defaultValue
        }
    }

    render() {
        return (
            <ListView
                style={[styles.starBox, this.props.style]}
                contentContainerStyle={{ justifyContent: 'center', alignItems:'center', flex: 1}}
                horizontal={true}
                dataSource={this.state.ds.cloneWithRows(this.state.list)}
                renderRow={(...args)=>this._renderRow(...args)}/>
        );
    }

    // 渲染一行
    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        select: rowID
                    });
                }}
                style={styles.itemBox}>
                <Image style={styles.globalIcon}
                       source={this.state.select == rowID?Icon.get('ICON_ITEM_SELECTED'):Icon.get('ICON_ITEM')}/>
                <Text style={styles.text}>{rowData.value}</Text>
            </TouchableOpacity>
        );
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