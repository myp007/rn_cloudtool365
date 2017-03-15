/**
 * 描述: 视图：消息列表
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 14:25
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View, Image} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Components, Icon, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView, RowMore} = Components;
export default class MessageView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <PageView style={{backgroundColor: '#FFFFFF'}}>
                <RowMore
                    onPress={()=>this.go('/personalCenter/MessageDetailsView', '详情')}
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>系统消息：12月工信部执行新一轮的检查</Text>
                    </View>
                </RowMore>
                <RowMore
                    onPress={()=>this.go('/personalCenter/MessageDetailsView', '详情')}
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>系统消息：12月工信部执行新一轮的检查</Text>
                    </View>
                </RowMore>
                <RowMore
                    onPress={()=>this.go('/personalCenter/MessageDetailsView', '详情')}
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>系统消息：12月工信部执行新一轮的检查</Text>
                    </View>
                </RowMore>
                <RowMore
                    onPress={()=>this.go('/personalCenter/MessageDetailsView', '详情')}
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>系统消息：12月工信部执行新一轮的检查</Text>
                    </View>
                </RowMore>
            </PageView>
        );
    }
    _getUserInfo() {
        (async() => {
            let data = await Services.Function10000302(false);
            if (!!data) {

            }
        })();
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },styleView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },itemText: {
        flex:1,
        fontSize: pxToDp(24),
        color: '#999999',
        alignItems: 'center',
    }
});
