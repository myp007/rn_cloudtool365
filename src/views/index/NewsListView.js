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
import Swiper from 'react-native-swiper';
const {Text, Image, View, TouchableOpacity} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Components, Services, StringUtils} from 'react-native-blue-book';
const {Pagination} = Components;
const {pxToDp} = StyleSheet;

export default class NewsListView extends PageComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    // 获取列表数据
    _fetchList(page) {
        console.log(page);
        return Services.Function10000203({pageNum: page, typeId: this.props['newsType']});
    }

    // 图文
    _renderImageTextView(row) {
        return (
            <TouchableOpacity
                onPress={()=>this.go('/index/NewsView', '新闻详情', {id: row.id})}
                style={styles.itemBox}>
                <Image style={styles.itemImg} source={{uri: row['litpic']}}/>
                <View style={styles.itemInfoBox}>
                    <View style={{flex:1, backgroundColor:'#FFF'}}>
                        <Text style={styles.text1}>{row.title}</Text>
                    </View>
                    <Text style={styles.text3}>{row['pubDate']}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // 纯文字
    _renderTextView(row) {
        return (
            <TouchableOpacity
                onPress={()=>this.go('/index/NewsView', '新闻详情', {id: row.id})}
                style={styles.itemBox1}>
                <Text style={styles.text1}>{row.title}</Text>
                <Text style={styles.text2}>{row.description}</Text>
                <Text style={styles.text3}>{row['pubDate']}</Text>
            </TouchableOpacity>
        );
    }

    // 渲染行
    _renderRowView(row) {
        return StringUtils(row['litpic']).isNotEmpty() ? this._renderImageTextView(row) : this._renderTextView(row);
    }

    render() {
        return (
            <View style={styles.body}>
                {this.props.index == 0 &&
                <View style={{backgroundColor:'#000'}}>
                    <Swiper style={[styles.wrapper]}
                            showsButtons={false}
                            height={pxToDp(360)}
                            loop={true}
                            index={0}
                            autoplay={true}
                            horizontal={true}
                            paginationStyle={{bottom:10}}
                            dot={<View style={styles.dot_default}></View>}
                            activeDot={<View style={styles.dot_active}></View>}>
                        <TouchableOpacity style={styles.slide}>
                            <Image
                                style={styles.bannnerImg}
                                source={{uri:'https://www.cloudtool365.com/images/appad/ct01.jpg'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.slide}>
                            <Image
                                style={styles.bannnerImg}
                                source={{uri:'https://www.cloudtool365.com/images/appad/ct02.jpg'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.slide}>
                            <Image
                                style={styles.bannnerImg}
                                source={{uri:'https://www.cloudtool365.com/images/appad/ct03.jpg'}}
                            />
                        </TouchableOpacity>
                    </Swiper>
                </View>
                }
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
        backgroundColor: '#FFF',
        paddingBottom:pxToDp(120)
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
        fontSize: pxToDp(32),
        color: '#000'
    }, text2: {
        fontSize: pxToDp(30),
        color: '#737373',
        marginTop: pxToDp(5)
    }, text3: {
        fontSize: pxToDp(26),
        color: '#777777',
        textAlign: 'right'
    }, itemBox1: {
        marginTop: pxToDp(15),
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        borderBottomColor: '#CCC',
        borderBottomWidth: StyleSheet.getMinLineWidth(),
        paddingBottom: pxToDp(9)
    },
    //轮播图样式
    wrapper: {}, slide: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: pxToDp(360),
    }, bannnerImg: {
        width: pxToDp(750),
        height: pxToDp(360)
    }, dot_default: {
        backgroundColor: '#FFFFFF',
        width: pxToDp(10),
        height: pxToDp(10),
        borderRadius: pxToDp(5),
        marginLeft: pxToDp(6),
        marginRight: pxToDp(6),
        marginTop: pxToDp(6),
        marginBottom: pxToDp(6),
    }, dot_active: {
        backgroundColor: '#cccccc',
        width: pxToDp(10),
        height: pxToDp(10),
        borderRadius: pxToDp(5),
        marginLeft: pxToDp(6),
        marginRight: pxToDp(6),
        marginTop: pxToDp(6),
        marginBottom: pxToDp(6),
    },
});
