/**
 * 描述: 分页组件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/11 17:28
 */
import React from 'react';
import ReactNative from 'react-native';
const {Image, View, Text, TouchableHighlight} = ReactNative;
import {StyleSheet} from '../StyleSheet';
import {Icon} from '../Icon';
const {pxToDp} = StyleSheet;
import GiftedListView from '../plugins/GiftedListView';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // 每行视图
        rowView: React.PropTypes.func,
        // 获取数据
        onFetch: React.PropTypes.func,
    };

    componentWillMount() {

    }

    _renderEmptyView() {
        return (
            <View style={styles.nothingBox}>
                <Image style={styles.nothing} source={Icon.get('BLUE_BOOK_NOTHING')}/>
                <Text style={styles.nothingText}>暂无数据</Text>
            </View>
        );
    }

    _renderPaginationWaitingView(paginateCallback) {
        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={styles.loadMoreButton}>
                <Text style={styles.loadMore}>
                    点击加载更多
                </Text>
            </TouchableHighlight>
        );
    }

    _renderPaginationAllLoadedView() {
        return (
            <View style={styles.loadMoreButton}>
                <Text style={styles.loadFinishText}>没有数据了</Text>
            </View>
        );
    }

    render() {
        // sectionHeaderView={this._renderSectionHeaderView}
        //
        // customStyles={{
        //     paginationView: {
        //         backgroundColor: '#eee',
        //     },
        // }}
        // refreshableTintColor="blue"
        let props = this.props;
        return (
            <GiftedListView
                {...this.props}
                rowView={this.props.rowView}
                onFetch={(page = 1, callback, options)=>{
                    (async function () {
                        let data = await props.onFetch(page);
                        if(!!data) {
                            if (page == data.results['totalPage']) {
                                callback(data.results.items, {allLoaded: true});
                            } else {
                                callback(data.results.items);
                            }
                        } else{
                            callback([]);
                        }
                    })();
                }}
                // 最大行数
                // 是否默认加载第一条数据
                firstLoader={true}
                // 是否截断数据
                withSections={false}
                // 点击加载更多
                paginationWaitingView={this._renderPaginationWaitingView}
                // 数据全部加载完成
                paginationAllLoadedView={this._renderPaginationAllLoadedView}
                // 没有数据时视图
                emptyView={this._renderEmptyView}
                // 阻止报错(具体什么情况以后再研究)
                enableEmptySections={true}
                showsVerticalScrollIndicator={false}
                paginationControl={props.paginationControl || {}}
                style={this.props.style || {}}/>
        );
    }
}

const styles = StyleSheet.create({
    nothingBox: {
        marginTop: pxToDp(80),
        alignItems: 'center'
    }, nothing: {
        width: pxToDp(80),
        height: pxToDp(69)
    }, nothingText: {
        fontSize: pxToDp(34),
        color: '#999999',
        marginTop: pxToDp(15)
    }, loadMoreButton: {
        height: pxToDp(90),
        justifyContent: 'center',
        alignItems: 'center'
    }, loadMore: {
        color: '#ccc'
    }, loadFinishText: {
        color: '#CCC',
        fontSize: pxToDp(30)
    }
});