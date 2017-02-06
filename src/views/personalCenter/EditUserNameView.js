/**
 * 描述: 视图：编辑用户名
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 13:25
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View, TextInput} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Components, Icon, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView, SimpleButton} = Components;
export default class EditDataView extends PageComponent {
    constructor(props) {
        super(props);

        let msg = this.getRouteParams()['msg'] || '';

        this.state = {
            msg: msg
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
                <View style={styles.itemBox}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#CCCCCC'
                        onChangeText={(text)=>{
                            this.setState({name: text});
                        }}
                        //站位符
                        placeholder='用户名'/>
                </View>
                <View style={styles.buttonBox}>
                    <SimpleButton style={{backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >确定</SimpleButton>
                </View>
            </PageView>
        );
    }
}

const styles = StyleSheet.create({
     itemBox: {
        flex:1,
        height: pxToDp(88),
        backgroundColor: '#FFFFFF',
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        borderBottomWidth: StyleSheet.getMinLineWidth(),
        borderBottomColor: '#CCCCCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },input: {
        flex:1,
        height: pxToDp(70),
        paddingLeft: pxToDp(15),
        marginTop: pxToDp(10),
        backgroundColor: '#00000000',
        color: '#000000',
        fontSize:pxToDp(28),
    }, buttonBox: {
        alignItems: 'center',
        marginTop: pxToDp(250),
    }
});
