/**
 * 描述: 视图：关于我们-支付的关于我们
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 17:14
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View} = ReactNative;
// 引入blue-book工具包

import {PageComponent, StyleSheet, Icon, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
export default class AboutView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.conter}>
              <Text style={styles.contertext}>本服务支持代理商渠道下面的客户进行自行支付。</Text>
                <Text style={styles.contertext}>目前支持代理商：</Text>
                <Text style={styles.contertext}>深圳市网商天下科技开发有限公司进行内侧</Text>
                <Text style={styles.contertext}>后续会接入更多的代理商</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
     conter:{
       flex:1,
       backgroundColor:'#FFFFFF',
       paddingLeft:pxToDp(30),
       paddingRight:pxToDp(30),
       paddingTop:pxToDp(50),
     },contertext:{
       color:'#333',
       fontSize:pxToDp(30),
        marginBottom:pxToDp(10)
     }
});
