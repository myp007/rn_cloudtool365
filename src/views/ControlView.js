/**
 * 描述: 视图：主页
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


export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.body}>
                <TouchableOpacity style={[styles.boxT]} onPress={()=>this.go('/control/InquiryView', '自助开通服务')}>
                    <View style={[styles.boxView]}>
                        <Image style={[styles.iconImg]}
                               source={Icon.get('ICON_SELF_HELP')}/>
                    </View>
                    <Text style={[styles.text1]}>腾讯云自助开通</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boxT]} onPress={()=>this.go('/control/OrderListView', '我的订单')}>
                    <View style={[styles.boxView]}>
                        <Image style={[styles.iconImg]}
                               source={Icon.get('ICON_ORDER_BLUE')}/>
                    </View>
                    <Text style={[styles.text1]}>我的订单</Text>
                </TouchableOpacity>
            </View>
        );
    }
    //顶部标题
    setNavigatorTitle(route, navigator, home, navState) {
        return (
            <View style={styles.titleView}><Text style={styles.titleText}>云控制台</Text></View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFF',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingHorizontal:pxToDp(15),
        paddingTop:pxToDp(15),
        flexDirection:'row',
        flexWrap:'wrap',
    },titleView:{
        padding:0,
        paddingTop:pxToDp(30),
    },titleText:{
        color:'#fff'
    },boxT:{
        alignItems:'center',
    },boxView:{
        borderColor:'#ccc',
        borderWidth:StyleSheet.getMinLineWidth(),
        width:pxToDp(150),
        height:pxToDp(150),
        justifyContent:'center',
        alignItems:'center',
        margin:pxToDp(15),
    },iconImg:{
        width:pxToDp(72),
        height:pxToDp(80),
    },text1:{
        color:'#666',
        fontSize:pxToDp(22),
        paddingVertical:pxToDp(10),
    }

});