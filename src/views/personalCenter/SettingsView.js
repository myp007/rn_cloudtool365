/**
 * 描述: 视图：系统设置
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 13:25
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View, Image,AppRegistry,Switch} = ReactNative;
// 引入blue-book工具包

import {PageComponent, StyleSheet, Components, Icon, Services,Storage} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView, RowMore,SimpleButton} = Components;
export default class SettingsView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {

            value: true

        };
    }

    componentWillMount() {
        (async function () {

        })();
    }

    render() {
        return (
            <PageView style={{backgroundColor: '#FFFFFF'}}>
                <View
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>推送消息</Text>
                      <View style={styles.switchView}>
                          <Switch

                            //动态改变value
                            value={this.state.value}
                            //当切换开关室回调此方法
                            onValueChange={(value)=>{this.setState({value: value})}}
                        />
                      </View>

                    </View>
                </View>
                <View
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>版本号</Text>
                      <Text style={[styles.itemText,styles.flexend]}>V1.0</Text>
                    </View>
                </View>
                <View style={[styles.butView]}>
                  <SimpleButton onPress={()=>this.signOutLogin()} style={{marginTop:pxToDp(150),backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >注销登录</SimpleButton>
                </View>

            </PageView>
        );
    }
    /**
     * 退出登录
     * @private
     */
    signOutLogin() {
        (async() => {
            await Storage.clear('USER_INFO');
            this.goBackRoot(true)
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
        justifyContent: 'center'

    },styleView:{
      flexDirection: 'row',
      alignItems: 'center',
    },itemText: {
      flex:7,
      fontSize: pxToDp(30),
      color: '#000000',
    },flexend:{
      flex:1,
      textAlign:'right',
    },butView:{
      alignItems:'center',
    }
});
