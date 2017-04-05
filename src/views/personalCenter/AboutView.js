/**
 * 描述: 视图：新闻详情
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/19 17:46
 */
import React from 'react';
import ReactNative from 'react-native';
const {Image, WebView,View} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const url = "https://www.cloudtool365.com/about/2017/0401/1661.html?1491041639";
export default class NewsView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {


        }
    }





    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.body}>
                <WebView
                    style={{width:pxToDp(750),backgroundColor:'#fff'}}
                    source={{uri:url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: pxToDp(30)
    }
});