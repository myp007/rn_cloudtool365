/**
 * 描述: 视图：用户注册
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 17:14
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View,TextInput,TouchableOpacity} = ReactNative;
// 引入blue-book工具包

import {PageComponent, StyleSheet,Components, Services} from 'react-native-blue-book';

const {pxToDp} = StyleSheet;
const {PageView,SimpleButton} = Components;
export default class RegisterView extends PageComponent {

    constructor(props) {
        super(props);

        let msg = this.getRouteParams()['msg'] || '';

        this.state = {
            phone: '',
            code: '',
            pwd: '',
            cpwd: '',
            // 是否发送
            sending: false,
            // 发送按钮文本
            sendingText: '发送验证码'
        }

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
              {/*验证码输入框*/}
              <View style={[styles.inputBox,{paddingRight:0}]}>
                  <TextInput
                      style={[styles.input,styles.codeinput]}
                      underlineColorAndroid='transparent'
                      placeholderTextColor='#CCCCCC'
                      placeholder='验证码'
                      onChangeText={(text)=>{
                          this.setState({code: text});
                      }}/>
                    <TouchableOpacity style={styles.codeBox} onPress={()=>this.getCode() }>
                          <Text style={[styles.codeText]}>{this.state.sendingText}</Text>
                      </TouchableOpacity>
              </View>
              {/*密码输入框*/}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder='密码'
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#CCCCCC'
                        onChangeText={(text)=>{
                            this.setState({pwd:text})
                        }}
                        //密文
                        secureTextEntry={true}/>
                </View>
                {/*密码输入框*/}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder='再次输入密码'
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#CCCCCC'
                        onChangeText={(text)=>{
                            this.setState({cpwd:text})
                        }}
                        //密文
                        secureTextEntry={true}/>

                </View>
              <View style={styles.buttonBox}>
                  <SimpleButton onPress={()=>this.Register()} style={{backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >注册</SimpleButton>
                  <TouchableOpacity onPress={()=>this.go('/personalCenter/AgreementView', '用户协议')} style={styles.agreementview}>
                    <Text style={styles.agreementtext}>点击上面的“注册”按钮，即表示您同意<Text style={styles.agreement}>《云助手365软件许可以及服务协议》</Text></Text>
                  </TouchableOpacity>
              </View>
          </View>
          </PageView>
        );
    }
    /**
     * 发送验证码
     * @private
     */
    getCode() {
        // 正在发送，则不发送验证码
        if (this.state.sending === true) {
            return;
        }
        this._sendingState();
        (async() => {
            let data = await Services.Function10000101({phone:this.state.phone,time:1,type:2});

            // if (!!data) {
            //     this.showSimpleMsg('邮件发送成功');
            // }
        })();
    }

    /**
     * 发送中状态
     * @private
     */
    _sendingState() {
        // 发送中文本
        let sendingText = '重新发送';
        // 发送
        let sendText = '发送验证码';
        this.setState({
            sending: true
        });
        let index = 60;
        let interval = setInterval(() => {
            if (index < 0) {
                clearInterval(interval);
                this.setState({
                    sendingText: sendText,
                    sending: false
                });
            } else {
                this.setState({
                    sendingText: sendingText + '(' + index + ')'
                });
                index--;
            }
        }, 1000);
    }

    //注册
    Register(){
        (async() => {
            let data = await Services.Function10000102({phone:this.state.phone,code:this.state.code,pwd:this.state.pwd,cpwd:this.state.cpwd});
            if (!!data) {
                this.goBackRoot(true);
                console.info(data);
            }
        })();
    }
}

const styles = StyleSheet.create({
  container: {
     width:StyleSheet.getWindowWidth(),
     height: StyleSheet.getWindowHeight(),
     position: 'absolute',
     top: 0,
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
     flexDirection: 'row'
 }, input: {
     width: pxToDp(690),
     height: pxToDp(70),

     //内边距
     paddingLeft: pxToDp(45),
     paddingRight: pxToDp(30),
     marginTop: pxToDp(8),
     backgroundColor: '#fff',
     color: '#000000',
    marginHorizontal:pxToDp(5),
     fontSize:pxToDp(30),
 },codeinput:{
   flex:4,
 },codeBox: {
      flex:2,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftColor: '#FFFFFF',
      borderLeftWidth: StyleSheet.getMinLineWidth(),
      backgroundColor:'#3397fb',
      borderTopRightRadius:pxToDp(8),
      borderBottomRightRadius:pxToDp(8)
  },codeText:{
    fontSize:pxToDp(26),
    color:'#FFFFFF'
  }, buttonBox: {
     alignItems: 'center',
     marginTop: pxToDp(150),
 },agreementview:{
   paddingLeft:pxToDp(25),
   paddingRight:pxToDp(25),
   marginTop:pxToDp(5),
 },agreementtext:{
   fontSize:pxToDp(28),
   color:'#CCCCCC',
 },agreement:{
   color:'#3397fb',
 }
});
