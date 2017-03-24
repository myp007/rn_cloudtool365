/**
 * 描述: 视图：关于我们
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

        let data = this.getRouteParams();
        this.state = {
            data:data.data
        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.conter}>
                <Text style={[styles.title]}>{this.state.data.title}</Text>
              <Text style={styles.contertext}>{this.state.data.content}</Text>
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
       paddingTop:pxToDp(30),
     },title:{
       fontSize:pxToDp(34),
        color:'#333',
        marginBottom:pxToDp(10),
        textAlign:'center'
    },contertext:{
       color:'#999999',
       fontSize:pxToDp(30),
        lineHeight:pxToDp(35)
     }
});
