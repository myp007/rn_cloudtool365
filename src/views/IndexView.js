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
const {View,Text,TouchableOpacity,Image} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage, Components} from 'react-native-blue-book';
import  ScrollableTabView from 'react-native-scrollable-tab-view';
const {DefaultTabBar} = ScrollableTabView;
const {ScrollableTab} = Components;
import NewsListView from './index/NewsListView';
const {pxToDp} = StyleSheet;

export default class IndexView extends PageComponent {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'profile',
            newsTypes: []
        };
    }

    componentWillMount() {
        this.getNewsTypes();
        // Todo @@@@ 默认跳转，测试用
        // this.go('/control/InquiryView', '自助开通', {type: Math.round(Math.random() * 10) % 2});
    }

    /**
     * 获取新闻分类
     */
    getNewsTypes() {
        (async() => {
            let newsTypes = await Storage.getItem('NEWS_TYPE');
            this.setState({
                newsTypes: newsTypes || []
            });
            let data = await Services.Function10000201({pageNum: 1, pageSize: 10});
            if (!!data) {
                this.setState({
                    newsTypes: data.results.items
                });
                Storage.setItem('NEWS_TYPE', data.results.items);
            }

        })();
    }

    render() {
        return (
            <View style={styles.body}>

                <ScrollableTab
                    style={styles.tab}
                    initialPage={1}
                    tabBarStyle={{backgroundColor:'#3397fb', height: 40}}
                    tabBarItemStyle={{paddingBottom:0}}
                    tabBarTextStyle={{fontSize:pxToDp(32)}}
                    tabBarInactiveTextColor="#b7dafd"
                    tabBarUnderlineStyle={{height:0}}
                    ScrollableTabBar={{true}}
                    tabBarActiveTextColor="#FFF">

                    {this.state.newsTypes.map((newsType, index) => {
                        return <NewsListView
                            tabLabel={newsType.typeName}
                            key={newsType.id}
                            index={index}
                            newsType={newsType.id}
                            {...this.props} />;
                    })}
                </ScrollableTab>
            </View>
        );
    }
    //顶部标题
    setNavigatorTitle(route, navigator, home, navState) {
        return (
            <View style={styles.titleView}><Text style={styles.titleText}>565云助手</Text></View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFF',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, tab: {

    },titleView:{
        padding:0,
        paddingTop:pxToDp(30),
    },titleText:{
        color:'#fff'
    },

});