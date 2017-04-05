/**
 * 描述: 视图：订单列表
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
import * as WeChat  from 'react-native-wechat';

const {View,Text,TouchableOpacity,Image,ListView} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage, Components,Icon} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {SimpleButton,Modal}=Components;

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
                    removeClippedSubviews={false}
                    dataSource={this.state.ds.cloneWithRows(this.state.data)}
                    renderRow={(...args)=>this._renderRow(...args)}/>

            </View>
        );
    }
    //顶部返回按钮
    setNavigatorLeftButton(route, navigator, home, navState) {
        return (
            <TouchableOpacity
                onPress={()=>{this.goBackRoot()}}
                style={styles.globalNavButton}>
                <Image style={styles.globalIcon} source={Icon.get('ICON_BACK')}/>
            </TouchableOpacity>
        );
    }
    _renderRow(data) {
        return (
            <View style={[styles.boxView]}>
                <View style={[styles.timeView]}>
                    <Text style={[styles.text,styles.text1]}>订单号：{data.id}</Text>
                    <Text style={[styles.text,styles.text3]}>{([data.realTotal]*0.01).toFixed(2)}元</Text>
                </View>
                <View style={[styles.timeView]}>
                    <Text style={[styles.text,styles.text2]}>订单类型：{data.productName}</Text>
                </View>
                <View style={[styles.timeView]}>
                    <Text style={[styles.text,styles.text2]}>订单时间：{data.createTime}</Text>

                    {data.status == 0 &&
                    <View style={[{flexDirection:'row'}]}>
                        <TouchableOpacity style={[styles.but]} onPress={()=>this.getPaySign(data.id)}>
                            <Text style={[styles.text,styles.text4]}>去支付</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.but,{marginLeft:pxToDp(5)}]} onPress={()=>this.cancelPay(data.id)}>
                            <Text style={[styles.text,styles.text4]}>取消订单</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    {data.status == 1 &&
                    <TouchableOpacity style={[styles.but]}>
                        <Text style={[styles.text,styles.text4]}>支付成功</Text>
                    </TouchableOpacity>
                    }
                    {data.status == 2 &&
                    <View style={[{flexDirection:'row'}]}>
                        <TouchableOpacity style={[styles.but]} onPress={()=>this.getPaySign(data.id)}>
                            <Text style={[styles.text,styles.text4]}>去支付</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.but,{marginLeft:pxToDp(5)}]} onPress={()=>this.cancelPay(data.id)}>
                            <Text style={[styles.text,styles.text4]}>取消订单</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    {data.status == 3 &&
                    <TouchableOpacity style={[styles.but,{backgroundColor:'#ccc'}]}>
                        <Text style={[styles.text,styles.text4]}>订单关闭</Text>
                    </TouchableOpacity>
                    }
                    {data.status == 4 &&
                    <TouchableOpacity style={[styles.but,{backgroundColor:'#ccc'}]}>
                        <Text style={[styles.text,styles.text4]}>已失效</Text>
                    </TouchableOpacity>
                    }
                    {data.status == 5 &&
                    <TouchableOpacity style={[styles.but,{backgroundColor:'#ccc'}]}>
                        <Text style={[styles.text,styles.text4]}>已取消</Text>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
    _getOrderList(){
        (async() => {
            let data = await Services.Function10000402();
            this.setState({
                data:data.results.items
            });
        })();
    }

    getPaySign(orderId) {
        (async() => {
            let isWXAppInstalled = await WeChat.isWXAppInstalled();
            if (!isWXAppInstalled){
                Modal.showAlert('请您先安装微信！');
                return;
            }
            let data = await Services.Function10000404({orderId:orderId, payType: 2});
            let pstate=0;
            if (!!data) {
                try {
                    const result = await WeChat.pay({
                        appid: data.results.orderInfo.appid,
                        partnerId: data.results.orderInfo.mch_id,       // 商家向财付通申请的商家id
                        prepayId: data.results.orderInfo.prepay_id,     // 预支付订单
                        package: 'Sign=WXPay',                          // 商家根据财付通文档填写的数据和签名
                        nonceStr: data.results.orderInfo.nonce_str,     // 随机串，防重发
                        timeStamp: data.results.orderInfo.timestamp,    // 时间戳，防重
                        sign: data.results.orderInfo.sign               // 商家根据微信开放平台文档对数据做的签名
                    });
                    console.log(result)
                    pstate=0;
                }catch (error){
                    console.log(error)
                    if (error=== -2){
                        Modal.showAlert('用户取消支付！');
                        pstate=-2;
                    }else{
                        Modal.showAlert('支付失败！');
                        pstate=-3;
                    }
                }

                this.go('/control/ResultView', '支付结果', {pstate: pstate}, {});
            }

        })();
    }

    cancelPay(orderId){
        (async() => {
            console.log(orderId)
            let data = await Services.Function10000405({orderId:orderId});
            if (data.errorCode==0){
                this._getOrderList();

            }

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
        padding:pxToDp(20),
        marginBottom:pxToDp(10)
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
        color:'#fff',
        fontSize:pxToDp(24),
        paddingVertical:0
    },globalBody:{
        flex:1,

    },but:{
        backgroundColor:'#3397fb',
        width:pxToDp(120),
        height:pxToDp(45),
        borderRadius:pxToDp(5),
        alignItems:'center',
        justifyContent:'center'

    }

});