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
const {Text, View, Image,ListView} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Components, Icon, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView, RowMore} = Components;
export default class MessageView extends PageComponent {
    constructor(props) {
        super(props);
        let data = new Array();
        this.state = {
            data:data,
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        };
    }

    componentWillMount() {
        this._getMessageList()
    }

    render() {
        return (
            <View style={{backgroundColor: '#FFFFFF', flex:1}}>
                <ListView
                    style={styles.globalBody}
                    dataSource={this.state.ds.cloneWithRows(this.state.data)}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    renderRow={(...args)=>this._renderRow(...args)}/>

            </View>
        );
    }
    _renderRow(data) {
        return (
            <RowMore
                onPress={()=>this.go('/personalCenter/MessageDetailsView', '详情',{data:data})}
                style={styles.itemBox}>
                <View style={styles.styleView}>
                    {console.log(data.title)}
                    <Text style={styles.itemText}>{data.title}</Text>
                </View>
            </RowMore>
        );
    }
    _getMessageList() {
        (async() => {
            let data = await Services.Function10000106(false);

            if (!!data) {
                console.log(data)
                this.setState({
                    data:data.results
                })
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
        fontSize: pxToDp(30),
        color: '#999999',
        alignItems: 'center',
    },globalBody:{
        flex:1,
    }
});
