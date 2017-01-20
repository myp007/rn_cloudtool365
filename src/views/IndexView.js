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
const {View} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Services, Storage} from 'react-native-blue-book';
import  ScrollableTabView from 'react-native-scrollable-tab-view';
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
    }

    /**
     * 获取新闻分类
     */
    getNewsTypes() {
        (async() => {
            let newsTypes = await Storage.getItem('NEWS_TYPE');
            this.setState({
                newsTypes: newsTypes
            });
            let data = await Services.Function10000201({pageNum: 1, pageSize: 5});
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
                <ScrollableTabView
                    style={styles.tab}
                    tabBarTextStyle={{fontSize:pxToDp(20)}}
                    tabBarInactiveTextColor="#b7dafd"
                    tabBarActiveTextColor="#FFF">
                    {this.state.newsTypes.map((newsType) => {
                        return <NewsListView
                            tabLabel={newsType.typeName}
                            key={newsType.id}
                            newsType={newsType.id}
                            {...this.props} />;
                    })}
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#3397fb',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, tab: {
        flex: 1
    }
});