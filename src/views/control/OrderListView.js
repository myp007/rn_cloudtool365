/**
 * 描述: 视图：订单列表
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
const {View,Text,TouchableOpacity,Image,ListView} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage, Components,Icon} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {SimpleButton}=Components;

export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);
        let data = new Array();
        this.state = {
            data:data,
        ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        };

    }

    componentWillMount() {
        this._getOrderList();
    }

    render() {
        return (
            <View style={styles.body}>
                <ListView
                    style={styles.globalBody}
                    dataSource={this.state.ds.cloneWithRows(this.state.data)}
                    renderRow={(...args)=>this._renderRow(...args)}/>

            </View>
        );
    }
    //顶部分类按钮
    setNavigatorLeftButton(route, navigator, home, navState) {
        return (
            <TouchableOpacity
                onPress={()=>{this.goBackRoot()}}
                style={styles.globalNavButton}>
                <Image style={styles.globalIcon} source={Icon.get('ICON_FORK')}/>
            </TouchableOpacity>
        );
    }
    _renderRow(data) {
        return (
            <View style={[styles.boxView]}>
                <View style={[styles.timeView]}>
                    <Text style={[styles.text,styles.text1]}>订单号：{[key].id}</Text>
                    <Text style={[styles.text,styles.text3]}>{realTotal}元</Text>
                </View>
                <View style={[styles.timeView]}>
                    <Text style={[styles.text,styles.text2]}>服务器：1核心1G</Text>
                </View>
                <View style={[styles.timeView]}>
                    <Text style={[styles.text,styles.text2]}>订单号：234567324567（腾讯云）</Text>
                    <Text style={[styles.text,styles.text4]}>支付成功</Text>
                </View>
            </View>
        );
    }
    _getOrderList(){
        (async() => {
            let data = await Services.Function10000402();
            console.log(data.results.items)
            this.setState.data=data.results.items

        })();
    }
}

const styles = StyleSheet.create({
    body: {
        flex:1,
        backgroundColor: '#f5f5f5',
    },boxView:{
        backgroundColor:'#fff',
        marginTop:pxToDp(20),
        padding:pxToDp(20)
    },timeView:{
        flexDirection:'row'
    },text:{
        paddingVertical:pxToDp(10)

    },text1:{
        color:'#333',
        fontSize:pxToDp(26),
        flex:1
    },text2:{
        color:'#999',
        fontSize:pxToDp(24),
        flex:1
    },text3:{
        color:'#3397fb',
        fontSize:pxToDp(30)
    },text4:{
        color:'#333',
        fontSize:pxToDp(24)
    }

});