/**
 * 描述: 视图：新闻列表
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/19 17:20
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, Image, View, TouchableOpacity} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Components, Services, StringUtils} from 'react-native-blue-book';
const {Pagination} = Components;
const {pxToDp} = StyleSheet;

export default class NewsListView extends PageComponent {
    constructor(props) {
        super(props);
    }

    // 获取列表数据
    _fetchList(page) {
        return Services.Function10000203({pageNum: page, typeId: this.props['newsType']});
    }

    // 渲染行
    _renderRowView(row) {
        return (
            <TouchableOpacity
                onPress={()=>this.go('/index/NewsView', '新闻详情', {id: row.id})}
                style={styles.itemBox}>
                {StringUtils(row['litpic']).isNotEmpty() ?
                    <Image style={styles.itemImg} source={{uri: row['litpic']}}/> : null}
                <View style={styles.itemInfoBox}>
                    <View style={{flex:1, backgroundColor:'#FFF'}}>
                        <Text style={styles.text1}>{row.title}</Text>
                        {StringUtils(row['litpic']).isEmpty() ?
                            <Text style={styles.text2}>{row.description}</Text> : null}
                    </View>
                    <Text style={styles.text3}>{row['pubDate']}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.body}>
                <Pagination
                    rowView={(...args)=>this._renderRowView(...args)}
                    onFetch={(...args)=>this._fetchList(...args)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FFF'
    }, itemBox: {
        height: pxToDp(145),
        marginTop: pxToDp(15),
        flexDirection: 'row',
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        borderBottomColor: '#CCC',
        borderBottomWidth: StyleSheet.getMinLineWidth(),
        paddingBottom: pxToDp(9)
    }, itemImg: {
        width: pxToDp(200),
        marginRight: pxToDp(45),
        height: pxToDp(135)
    }, itemInfoBox: {
        flex: 1,
        height: pxToDp(135)
    }, text1: {
        fontSize: pxToDp(30),
        color: '#000'
    }, text2: {
        fontSize: pxToDp(24),
        color: '#737373',
        marginTop: pxToDp(0),
        height: pxToDp(60)
    }, text3: {
        fontSize: pxToDp(22),
        color: '#777777',
        textAlign: 'right'
    }
});