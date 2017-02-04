/**
 * 描述: 视图：系统设置
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 13:25
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View, Image,AppRegistry,Switch} = ReactNative;
// 引入blue-book工具包

import {PageComponent, StyleSheet, Components, Icon, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView, RowMore} = Components;
export default class WithdrawListView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {

            value: true

        };
    }

    componentWillMount() {
        (async function () {
            let data = await Services.Function10000100();
            console.log('===');
        })();
    }

    render() {
        return (
            <PageView style={{backgroundColor: '#FFFFFF'}}>
                <View
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>推送消息</Text>
                      <Switch
                        style={styles.switchs}
                        //动态改变value
                        value={this.state.value}
                        //当切换开关室回调此方法
                        onValueChange={(value)=>{this.setState({value: value})}}
                    />
                    </View>
                </View>
                <View
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>版本号</Text>
                      <Text style={[styles.itemText,styles.flexend]}>V1.0</Text>
                    </View>
                </View>
            </PageView>
        );
    }
}

const styles = StyleSheet.create({
     itemBox: {
        height: pxToDp(88),
        backgroundColor: '#FFFFFF',
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        borderBottomWidth: StyleSheet.getMinLineWidth(),
        borderBottomColor: '#CCCCCC',
        justifyContent: 'center'

    },styleView:{
      flexDirection: 'row',
      alignItems: 'center',
    },itemText: {
        fontSize: pxToDp(24),
        color: '#000000',
          alignSelf:'flex-end',
    },flexend:{
      alignItems:'flex-end',
    },switchs:{
      width:50,
      height:40
    }
});
