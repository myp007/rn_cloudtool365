/**
 * 描述: 视图：支付结果
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
const {View,Text,TouchableOpacity,Image} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage, Components,Icon} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {SimpleButton} = Components;

export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);
        let pstate = this.getRouteParams()['pstate'];

        this.state = {
            pstate:pstate
        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.body}>
                <View style={[styles.imgView]}>
                    <Image style={styles.img} source={this.props ===0 ? require('../../assets/images/success.png'):require('../../assets/images/success1.png')}
                    />
                </View>
                <SimpleButton onPress={()=>this.go('/control/OrderListView', '订单列表')} style={{marginTop:pxToDp(250),borderRadius:pxToDp(5),backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >确定</SimpleButton>

            </View>
        );
    }
    //顶部标题
    setNavigatorTitle(route, navigator, home, navState) {
        return (
            <View style={styles.titleView}><Text style={styles.titleText}>{this.state.pstate===0 ? '支付成功' : '支付失败'}</Text></View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex:1,
        backgroundColor: '#FFF',
        justifyContent:'center',
        alignItems:'center'
    },imgView:{
    },img:{
        width:pxToDp(180),
        height:pxToDp(180)
    },titleView:{
        padding:0,
        paddingTop:pxToDp(30),
    },titleText:{
        color:'#fff'
    }

});