/**
 * 描述: 视图：重置密码
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

import {PageComponent, StyleSheet,Components,Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView,SimpleButton} = Components;
export default class RegisterView extends PageComponent {
    constructor(props) {
        super(props);

        let phone = this.getRouteParams()['phone'] || '';
        console.log('============phone:'+phone);
        this.state = {
            pwd: '',
            cpwd:'',
            phone:phone
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
          <View style={styles.container}>

              {/*密码输入框*/}
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder='新密码'
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
                  <SimpleButton onPress={()=>this.Register()} style={{backgroundColor:'#3397fb',borderColor:'#3397fb',height:pxToDp(80),width:pxToDp(690)}} >确认重置</SimpleButton>
              </View>
          </View>
          </PageView>
        );
    }
    //注册
    Register(){
        (async() => {
            console.log('============phone===:'+this.state.phone);
            let data = await Services.Function10000104({phone:this.state.phone,pwd:this.state.pwd,cpwd:this.state.cpwd});
            if(data.errorCode==0){
                this.go('/loginregister/LoginView', '用户登录',{
                });
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
     backgroundColor: '#00000000',
     color: '#000000',
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
     marginTop: pxToDp(500),
 }
});
