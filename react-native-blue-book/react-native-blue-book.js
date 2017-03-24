/**
 * 描述: 蓝书react-native工具包
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/1 14:49
 */
const BlueBook = {};
// 全局配置
export const {Config} = BlueBook.Config = require('./lib/Config');
// 页面组件
export const {PageComponent} = BlueBook.PageComponent = require('./lib/PageComponent');
// 路由器
export const {Router} = BlueBook.Router = require('./lib/Router');
// 图标管理器
export const {Icon} = BlueBook.Icon = require('./lib/Icon');
// 样式工具
export const {StyleSheet} = BlueBook.StyleSheet = require('./lib/StyleSheet');
// 组件集
export const {Components} = BlueBook.Components = require('./lib/Components');
// 接口调用工具
export const {Api} = BlueBook.Api = require('./lib/Api');
// 服务管理器
export const {Services} = BlueBook.Services = require('./lib/Services');
// 本地存储控制
export const {Storage} = BlueBook.Storage = require('./lib/Storage');
// 相册工具
export const {ImagePicker} = BlueBook.ImagePicker = require('./lib/ImagePicker');
// 字串工具
export const {StringUtils} = BlueBook.StringUtils = require('./lib/StringUtils');
// 自定义Map
export const {SimpleMap} = BlueBook.SimpleMap = require('./lib/SimpleMap');
// 地理位置工具
export const {Geolocation} = BlueBook.Geolocation = require('./lib/Geolocation');
// 支付工具
export const {Pay} = BlueBook.Pay = require('./lib/Pay');
// 语言工具
export const {Language} = BlueBook.Language = require('./lib/Language');
// ReactNative 重写
export const {ReactNativeComponent} = BlueBook.ReactNativeComponent = require('./lib/ReactNativeComponent');

export default BlueBook;