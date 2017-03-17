/**
 * 描述: 视图：订单查询
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
const {View,Text,TextInput,TouchableOpacity,Image,ListView} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage, Components,Icon} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {SimpleButton}=Components;

export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);

        this.state = {
            inputText:'',
            columns: [
                {
                    "id": "1",
                    "account": "23456734567",

                }, {
                    "id": "2",
                    "account": "23456734567",
                }, {
                    "id": "3",
                    "account": "23456734567",
                }, {
                    "id": "4",
                    "account": "23456734567",
                }
            ],
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.body}>
                <View style={[styles.boxView]}>
                    <View style={[styles.inputBox]}>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#CCCCCC'
                            onChangeText={(text)=>{
                          this.setState({inputText: text});
                      }}
                            //站位符
                            placeholder='输入的账号：'/>
                    </View>
                </View>
                <View style={[styles.titleView]}>
                    <Text style={[styles.titleText]}>最近输入的账号</Text>
                </View>
                <View style={[styles.listView]}>
                    <ListView
                        style={styles.globalBody}
                        dataSource={this.state.ds.cloneWithRows(this.state.columns)}
                        renderRow={(...args)=>this._renderRow(...args)}/>
                </View>
                <View style={[styles.butView]}>
                    <SimpleButton onPress={()=>this.getOrder()} style={{borderRadius:pxToDp(5),backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >确认查询订单</SimpleButton>
                    <TouchableOpacity style={[styles.textBox]}  onPress={()=>this.go('/control/AboutView', '关于我们')}>
                        <Text style={[styles.text1]}>自助开通使用说明</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _renderRow(data) {
        return (
            <View style={[styles.itmeView]}>
                <Text style={styles.titleText}>{data.account}</Text>
            </View>
        );
    }
    getOrder() {
        (async() => {
            let data = await Services.Function10000301({qq: this.state.inputText});
            console.log(this.state.inputText);
            if(!!data){
                console.log(data.results.orders)
                this.go('/control/OrderDetailsView', '订单详细',{datas:data.results.orders},{
                });

            }

        })();
    }

}

const styles = StyleSheet.create({
    body: {
        flex:1,
        backgroundColor: '#f5f5f5',

    },boxView:{
        padding:pxToDp(30),
        backgroundColor:'#fff',
        marginBottom:pxToDp(20)
    },inputBox:{
        borderColor:'#ccc',
        borderWidth:StyleSheet.getMinLineWidth(),
        borderRadius:pxToDp(8),
        height:pxToDp(100)
    }, input: {
        width: pxToDp(690),
        height: pxToDp(80),
        paddingHorizontal: pxToDp(15),
        marginTop: pxToDp(10),
        backgroundColor: '#00000000',
        color: '#999',
        fontSize:pxToDp(26),
    },titleView:{
        padding:pxToDp(30),
        backgroundColor:'#fff',
        borderBottomWidth:StyleSheet.getMinLineWidth(),
        borderBottomColor:'#f5f5f5'
    },titleText:{
        color: '#999',
        fontSize:pxToDp(26),
    },listView:{
        height:pxToDp(500),
        backgroundColor:'#fff',
        paddingHorizontal:pxToDp(30),
    },itmeView:{
        height:pxToDp(50),
        paddingVertical:pxToDp(10),
        backgroundColor:'#fff'
    },globalBody:{
        height:pxToDp(500),
        backgroundColor:'#fff',
    },butView:{
        backgroundColor:'#fff',
        flex:1,
        alignItems:'center',

    },textBox:{
        marginTop:pxToDp(20),
    },text1:{
        color:'#3397fb',
        fontSize:pxToDp(22),
    }

});