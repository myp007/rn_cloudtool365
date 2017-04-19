/**
 * 描述: 视图：用户登录
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 17:14
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View,TextInput} = ReactNative;
// 引入blue-book工具包

import {PageComponent, StyleSheet,Icon,Components, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView,SimpleButton} = Components;
export default class LoginView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            password: ''
        };
    }

    componentWillMount() {
        //
        (async function () {
            let data = await Services.Function10000000(false);
            console.log(data);
        })();
    }

    render() {
        return (
          <PageView style={{backgroundColor: '#FFFFFF'}}>
          <View style={styles.container}>

              {/*账号输入框在这里用View包裹以便处理器样式*/}
              <View style={[styles.inputBox]}>

                  <TextInput
                      style={styles.input}
                      underlineColorAndroid='transparent'
                      placeholderTextColor='#CCCCCC'
                      onChangeText={(text)=>{
                          this.setState({phone: text});
                      }}
                      //站位符
                      placeholder='手机号'/>
              </View>
              {/*密码输入框*/}
              <View style={styles.inputBox}>

                  <TextInput
                      style={styles.input}
                      underlineColorAndroid='transparent'
                      placeholderTextColor='#CCCCCC'
                      placeholder='密码'
                      onChangeText={(text)=>{
                          this.setState({password: text});
                      }}
                      //密文
                      secureTextEntry={true}/>
              </View>
              <View style={styles.textCenter}>
                  <Text style={[styles.goText,{flex:1}]}
                        onPress={()=>this.go('/loginregister/RegisterView', '用户注册')}>用户注册</Text>
                  <Text style={[styles.goText]}
                        onPress={()=>this.go('/loginregister/ForgetPwdView', '找回密码')}>忘记密码</Text>
              </View>

              <View style={styles.buttonBox}>
                  <SimpleButton onPress={()=>this._login()} style={{backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >登录</SimpleButton>
              </View>
          </View>
          </PageView>
        );
    }
    _login() {
        (async() => {
            let data = await Services.Function10000100({phone: this.state.phone, password: this.state.password});
            if (!!data) {this.goBackRoot(true);

            }

        })();
    }
}

const styles = StyleSheet.create({
  container: {
     width:StyleSheet.getWindowWidth(),
     height: StyleSheet.getWindowHeight(),

     backgroundColor:'#FFFFFF',
     paddingLeft:pxToDp(30),
     paddingRight:pxToDp(30),

 }, inputBox: {
     height:pxToDp(85) ,
     //设置圆角程度
     borderRadius: pxToDp(10),
     //设置边框的颜色
     borderColor: '#CCCCCC',
     //设置边框的宽度
     borderWidth: StyleSheet.getMinLineWidth(),
     //外边距
     marginTop: pxToDp(40),
     //设置相对父控件居中
     alignSelf: 'center',
     flexDirection: 'row',
     paddingTop:pxToDp(10),

 }, input: {
     width: pxToDp(690),
     height: pxToDp(70),
     paddingLeft: pxToDp(15),
     backgroundColor: '#ffffff',
     color: '#000000',
     fontSize:pxToDp(30),
 }, textCenter: {
     flexDirection: 'row',
     paddingTop: pxToDp(15),
     paddingLeft: pxToDp(50),
     paddingRight: pxToDp(50),
 }, goText: {
     backgroundColor: 'transparent',
     color: '#999999',
     fontSize: pxToDp(30)
 }, buttonBox: {
     alignItems: 'center',
     marginTop: pxToDp(50),
 }
});
