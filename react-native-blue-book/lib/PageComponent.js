/**
 * 描述: 页面组件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/1 14:52
 */
import React from 'react';
import ReactNative from 'react-native';
const {BackAndroid} = ReactNative;
import {Router} from './Router';
import Modal from './components/Modal';

// 导航对象
let navigatorObject = null;

export class PageComponent extends React.Component {
    constructor(props) {
        super(props);

        if (!props.navigator) {
            throw new Error('"' + this.constructor.name + '"视图,没有在props属性下找到navigator对象');
        }

        navigatorObject = this.props.navigator;

        if (!!this.setNavigatorRightButton) {
            props.navigator.state['NavigatorRightButtons'] = props.navigator.state['NavigatorRightButtons'] || new Map();
            props.navigator.state['NavigatorRightButtons'].set(this.constructor, (route, navigator, index, navState) => {
                return this.setNavigatorRightButton(route, navigator, index, navState);
            });
        }

        if (!!this.setNavigatorLeftButton) {
            props.navigator.state['NavigatorLeftButtons'] = props.navigator.state['NavigatorLeftButtons'] || new Map();
            props.navigator.state['NavigatorLeftButtons'].set(this.constructor, (route, navigator, index, navState) => {
                return this.setNavigatorLeftButton(route, navigator, index, navState);
            });
        }
        BackAndroid.addEventListener('hardwareBackPress', () => {
            // 路由栈
            let routes = this.props.navigator.getCurrentRoutes();
            if (routes.length > 1) {
                this.goBack();
                return true;
            }
        });
    }

    /**
     * 跳转到一个视图
     * @param url 视图路由地址
     * @param title 视图导航栏标题
     * @param params 传入参数
     */
    go(url = '', title = '', params = {}) {
        return navigatorObject.push({component: Router.getRoute(url), title, ...{route_params: params}});
    }

    /**
     * 返回到之前的视图，如果不传参，则返回到上一个视图；如果传入路由路径，则返回到指定的路由
     * @param routePath
     * @returns {*}
     */
    goBack(routePath) {
        if (!routePath) {
            return this.props.navigator.pop();
        }
        let routes = this.props.navigator.getCurrentRoutes();
        for (let i = 0; i < routes.length; i++) {
            if (routes[i]['component'] == Router.getRoute(routePath)) {
                this.props.navigator.popToRoute(routes[i]);
            }
        }
    }

    /**
     * 返回到第一个视图
     */
    goBackRoot() {
        this.props.navigator.popToTop();
    }

    /**
     * 获取路由参数
     */
    getRouteParams() {
        return this.props.route.route_params || {};
    }

    /**
     * 跳转到选择页面
     * @param title 标题
     * @param list 渲染选择页面的数据
     * @param callBack 回调方法
     * @returns {*}
     */
    singleChoice(title = '一项', list, callBack) {
        title = '请选择' + title;
        return this.props.navigator.push({
            component: require('./components/SelectView')['default'],
            title, ...{route_params: {list: list, callBack: callBack}}
        });
    }

    /**
     * 跳转到文本编辑页面
     * @param title 标题
     * @param text 初始文本
     * @param callBack 回调方法
     * @returns {*}
     */
    goEditText(title = '文本', text, callBack) {
        title = '编辑' + title;
        return this.props.navigator.push({
            component: require('./components/EditTextView')['default'],
            title, ...{route_params: {text: text, callBack: callBack}}
        });
    }

    /**
     * 显示一条警告消息
     * @param msg
     */
    showAlert(msg) {
        Modal.showAlert(msg);
    }

    /**
     * 打开一个对话框
     * @param title 标题
     * @param msg 消息
     * @param sureCallBack 确定回调
     * @param cancelCallBack 取消回调
     */
    openDialog(title = '', msg = '', sureCallBack = null, cancelCallBack = null) {
        Modal.openDialog(title, msg, sureCallBack, cancelCallBack);
    }

    /**
     *  打开一个简单消息提示
     * @param msg 提示消息
     * @param time 存在时间
     */
    showSimpleMsg(msg = '', time) {
        Modal.showSimpleMsg(msg, time || null);
    }
}