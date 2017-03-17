/**
 * 描述: 视图：订单详细
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
import WeChat from 'react-native-wechat';

const {View,Text,TouchableOpacity,Image,ListView} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage, Components,Icon} from 'react-native-blue-book';
const {pxToDp,} = StyleSheet;
const {PageView,SimpleButton, RadioButton} = Components;

export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);
        let datas = this.getRouteParams()['datas'];
        for(let i=0;i<datas.length;i++){
            datas[i].checked=false
        }
        this.state = {
            orderNumber:'',//订单字符串
            price:0,//原总价
            discountprice:0,//优惠总价
            columns: datas,
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <PageView style={styles.body}>
                <View style={{backgroundColor:'#fff',paddingTop:pxToDp(30),marginBottom:pxToDp(20),borderBottomColor:'#ccc',borderBottomWidth:StyleSheet.getMinLineWidth()}}>

                    <ListView
                        style={styles.globalBody}
                        dataSource={this.state.ds.cloneWithRows(this.state.columns)}
                        renderRow={(...args)=>this._renderList(...args)}/>
                </View>
                <View style={[styles.priceView]}>
                    <Text style={[styles.text,styles.text2]}>官网原价：<Text style={[{textDecorationLine:'line-through'}]}>{this.state.price}元</Text></Text>
                    <Text style={[styles.text,styles.text1]}>折扣优惠价：{this.state.discountprice}元</Text>
                </View>
                <View style={[styles.payMethod]}>
                    <View style={[styles.payBox]}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <Image style={[styles.payIcon1]} source={Icon.get('ICON_WX_PAY')}/>
                            <Text style={[styles.text1,styles.text4]}>微信支付</Text>
                        </View>
                        <Image style={[styles.hookIcon]} source={Icon.get('ICON_HOOK_LIGHT')}/>
                    </View>



                    <View style={[styles.payBox]}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <Image style={[styles.payIcon2]} source={Icon.get('ICON_ZFB_PAY')}/>
                            <Text style={[styles.text1,styles.text4]}>支付宝支付</Text>
                        </View>
                        <Image style={[styles.hookIcon]} source={Icon.get('ICON_HOOK')}/>
                    </View>
                    <SimpleButton onPress={()=>this.getPaySign()} style={{marginTop:pxToDp(150),borderRadius:pxToDp(5),backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >立即支付</SimpleButton>
                </View>
            </PageView>
        );
    }
    _renderList(data) {
        return (
            <View style={[styles.orderView]}>
                <View style={[styles.timeView1]}>
                    <Text style={[styles.text,styles.text1]}>订单号：{data.dealName}（腾讯云）</Text>
                    {data.goodsDetail.cpu == null ?(
                            null
                        ):(
                            <Text style={[styles.text,styles.text2]}>机型：{data.goodsDetail.cpu}核{data.goodsDetail.mem}G（新购机型）</Text>
                        )
                    }
                    {data.goodsDetail.name == null ?(
                            null
                        ):(
                            <Text style={[styles.text,styles.text2]}>{data.goodsDetail.productInfo[1].name}：{data.goodsDetail.productInfo[1].value}（续费订单）</Text>
                        )
                    }
                    {data.goodsPrice.goodsNum == null ?(
                            null
                        ):(
                            <Text style={[styles.text,styles.text2]}>数量：x{data.goodsPrice.goodsNum}</Text>
                        )
                    }

                    <Text style={[styles.text,styles.text2]}>下单人：{data.creater}</Text>
                    <Text style={[styles.text,styles.text2]}>下单时间：{data.createTime}</Text>
                </View>
                <View style={[styles.timeView2]}>
                    <Text style={[styles.text3]}>{[data.platformPrice]*0.01}元</Text>
                </View>
                <View style={[styles.timeView3]}>
                    <TouchableOpacity onPress={()=>{
                        let columns = this.state.columns;
                        let price = 0;
                        let discountprice = 0;
                        let orderNumber= null;
                        for(let i=0;i <columns.length;i++) {
                            if(columns[i]['id'] == data['id']) {
                                if(columns[i].checked){
                                    columns[i].checked=false;
                                }else {
                                    columns[i].checked = true;
                                }
                            }
                            if(columns[i].checked){
                                price +=(columns[i].goodsPrice.price)*0.01;
                                discountprice +=(columns[i].platformPrice)*0.01;
                                orderNumber =columns[i].dealName
                            }

                        }

                        this.setState({
                            orderNumber:orderNumber,
                            columns: columns,
                            price:price,//原总价
                            discountprice:discountprice,//优惠总价
                        });
                    }}>

                        <Image style={[styles.hookIcon]}
                               source={Icon.get(data.checked ?'ICON_HOOK_LIGHT':'ICON_HOOK')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    getPaySign(){
        (async() => {
            let data = await Services.Function10000401({dealName: this.state.orderNumber,payType:2});
            if(!!data){
                console.log("===========");
                console.log(data);
                this.go('/control/ResultView', '支付结果',{title:1},{
                });

            }

        })();
    }


}

const styles = StyleSheet.create({
    body: {
        flex:1,
        backgroundColor: '#f5f5f5',

    },orderView:{
        flexDirection:'row',
        paddingHorizontal:pxToDp(30),
        alignItems:'center',
        borderTopColor:'#ccc',
        borderTopWidth:StyleSheet.getMinLineWidth(),
        backgroundColor:'#fff'
    },timeView1:{
        flex:3,
    },timeView2:{
        flex:2,
    },timeView2:{
        flex:1,
    },hookIcon:{
        width:pxToDp(40),
        height:pxToDp(40),
    },text:{
        paddingVertical:pxToDp(10)

    },text1:{
        color:'#333',
        fontSize:pxToDp(26),

    },text2:{
        color:'#999',
        fontSize:pxToDp(24),

    },text3:{
        fontSize:pxToDp(30),
        color:'#3397fb'
    },priceView:{
        padding:pxToDp(30),
        backgroundColor:'#fff',
        borderBottomColor:'#ccc',
        borderBottomWidth:StyleSheet.getMinLineWidth(),
        marginBottom:pxToDp(20)
    },payMethod:{
        backgroundColor:'#fff',
        alignItems:'center',
        height:pxToDp(900),

    },payBox:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:pxToDp(20),
        paddingHorizontal:pxToDp(30),
        borderBottomColor:'#f5f5f5',
        borderBottomWidth:StyleSheet.getMinLineWidth(),
    },payIcon1:{
        width:pxToDp(68),
        height:pxToDp(60),
    },payIcon2:{
        width:pxToDp(60),
        height:pxToDp(60),
    },text4:{
        paddingLeft:pxToDp(40),
    }

});