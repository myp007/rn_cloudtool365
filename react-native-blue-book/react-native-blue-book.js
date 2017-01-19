/**
 * 描述: 蓝书react-native工具包
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/1 14:49
 */
// 全局配置
export const {Config} = require('./lib/Config');
// 页面组件
export const {PageComponent} = require('./lib/PageComponent');
// 路由器
export const {Router} = require('./lib/Router');
// 图标管理器
export const {Icon} = require('./lib/Icon');
// 样式工具
export const {StyleSheet} = require('./lib/StyleSheet');
// 组件集
export const {Components} = require('./lib/Components');
// 接口调用工具
export const {Api} = require('./lib/Api');
// 服务管理器
export const {Services} = require('./lib/Services');
// 本地存储控制
export const {Storage} = require('./lib/Storage');
// 字串工具
export const {StringUtils} = require('./lib/StringUtils');

export default {Config, PageComponent, Router, Icon, StyleSheet, Components, Api, Services, Storage, StringUtils};