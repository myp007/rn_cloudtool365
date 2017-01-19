/**
 * 描述: 选择地址
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/5 9:45
 */
import React from 'react';
import ReactNative from 'react-native';
const {TouchableOpacity, ListView, Text, Image, View} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Icon, Services, Storage} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class AddressView extends PageComponent {
    constructor(props) {
        super(props);

        // 路由参数
        let params = this.getRouteParams();

        this.state = {
            list: params.list || [],
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            callBack: params.callBack,
            selected: params.selected
        };
    }

    componentWillMount() {
        // TODO 测试代码
        (async() => {
            let addressInfo = await Storage.getItem('ADDRESS_INFO');
            if (!!addressInfo && addressInfo.list && addressInfo.list.length > 0) {
                this.setState({
                    list: addressInfo.list
                });
                return;
            }
            let response = await Services.get('110000021')();
            let data = response.result.data;
            let list = [];
            for (let d of data) {
                list.push({
                    key: d['team_id'],
                    name: d['team_cn']
                });
            }
            this.setState({
                list: list
            });
            Storage.setItem('ADDRESS_INFO', {list: list});
        })();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.rowBox}>
                    <Text style={[styles.text, {color:'#333333'}]}>当前：曼谷</Text>
                </View>
                <ListView
                    style={[styles.globalBody, {flex:1}]}
                    dataSource={this.state.ds.cloneWithRows(this.state.list)}
                    renderRow={(...args)=>this._renderRow(...args)}
                />
            </View>
        );
    }

    _renderRow(row, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity style={styles.rowBox} onPress={()=>{
                this.goBack();
                if(!!this.state.callBack) {
                    this.state.callBack(row.key, row.name);
                }
            }}>
                <View style={styles.imgBox}>
                    <Image style={styles.globalIcon}
                           source={this.state.selected == row.key?Icon.get('ICON_ITEM_SELECTED'):null}/>
                </View>
                <Text style={styles.text}>{row.name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    rowBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        height: pxToDp(100),
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }, text: {
        color: '#999999',
        fontSize: pxToDp(30)
    }, imgBox: {
        width: pxToDp(60)
    }
});