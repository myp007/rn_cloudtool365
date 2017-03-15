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
const {View,Text,TouchableOpacity,Image,ListView} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage, Components,Icon} from 'react-native-blue-book';
const {pxToDp,} = StyleSheet;
const {PageView,SimpleButton, RadioButton} = Components;

export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);

        this.state = {

            columns: datas,
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        };
    }

    componentWillMount() {
        console.log('@@@@');
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
                    <Text style={[styles.text,styles.text2]}>官网原价：<Text style={[{textDecorationLine:'line-through'}]}>65元</Text></Text>
                    <Text style={[styles.text,styles.text1]}>折扣优惠价：55元</Text>
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
                    <SimpleButton onPress={()=>this.go('/control/ResultView', '支付结果')} style={{marginTop:pxToDp(150),borderRadius:pxToDp(5),backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >立即支付</SimpleButton>
                </View>
            </PageView>
        );
    }
    _renderList(data) {
        return (
            <View style={[styles.orderView]}>
                <View style={[styles.timeView1]}>
                    <Text style={[styles.text,styles.text1]}>订单号：3456786543</Text>
                    <Text style={[styles.text,styles.text2]}>服务器：1核心1G</Text>
                    <Text style={[styles.text,styles.text2]}>订单号：234567324567（腾讯云）</Text>
                </View>
                <View style={[styles.timeView2]}>
                    <Text style={[styles.text3]}>65元</Text>
                </View>
                <View style={[styles.timeView3]}>
                    <TouchableOpacity onPress={()=>{
                        let columns = this.state.columns;
                        for(let i=0;i <columns.length;i++) {
                            if(columns[i]['id'] == data['id']) {
                                columns[i]['checked'] = !columns[i]['checked'];
                                break;
                            }
                        }
                        this.setState({
                            columns: columns
                        });
                    }}>

                        <Image style={[styles.hookIcon]}
                               source={Icon.get(data['checked']?'ICON_HOOK_LIGHT':'ICON_HOOK')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
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