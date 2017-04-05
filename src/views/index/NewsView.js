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
const {Image, WebView} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Services} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class NewsView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {
            html: '',
            // 从路由获取ID
            id: this.getRouteParams()['id'] || ''
        }
    }

    /**
     * 获取html代码
     * @param info 新闻信息
     * @returns {string}
     * @private
     */
    _getHtmlCode(info = {}) {
        // 文章内容
        let context = info['info'] || '此文章无内容';

        let html = [];
        html.push(`<style>img{max-width: 100%;}</style>`);
        html.push(`<div style="text-align: center;font-size: ${pxToDp(40)};">${info.title}</div>`);
        html.push(`<div style="display: flex;margin-top: ${pxToDp(30)};margin-left: ${pxToDp(30)};">`);
        html.push(`<div style="flex: 1;margin-left: ${pxToDp(15)};">`);
        html.push(`<p style="color: #111111;font-size: ${pxToDp(26)};margin-top: ${pxToDp(15)};height: ${pxToDp(15)};">作者：${info['writer']}</p>`);
        html.push(`<p style="color: #111111;font-size: ${pxToDp(26)};height: ${pxToDp(15)};">${info['pubDate']}</p>`);
        html.push(`</div>`);
        html.push(`</div>`);
        html.push(`<div style="margin-top: ${pxToDp(20)};">${context}</div>`);
        return html.join('');
    }

    /**
     * 获取文章
     * @private
     */
    _getContent() {
        (async() => {
            let data = await Services.Function10000204(this.state.id);
            console.log(this.state.id)
            if (!!data) {
                this.setState({
                    html: this._getHtmlCode(data.results)
                });
            }
        })();
    }

    componentWillMount() {
        this._getContent();
    }

    render() {
        return (
            <WebView
                source={{html:this.state.html}}
                style={styles.body}/>
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