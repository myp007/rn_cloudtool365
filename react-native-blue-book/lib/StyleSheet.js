/**
 * 描述: 样式工具
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/2 17:34
 */
import ReactNative from 'react-native';
// {设备信息获取类}
const {Dimensions, PixelRatio, Platform, Navigator} = ReactNative;
// react-native样式工具
const Style = ReactNative.StyleSheet;
// {当前设备窗口宽}
const {width, height} = Dimensions.get('window');
// blue-book配置
import {Config} from 'react-native-blue-book';

let UI_ALL_WIDTH = Config.get('BLUE_BOOK_STYLESHEET_UI_ALL_WIDTH');

// 样式工具
export const StyleSheet = {};

// 导航条高度
let NAVIGATORBAR_HEIGHT = null;

/**
 * 设置UI设计总宽度
 * @param width 宽度值
 */
StyleSheet.setUiAllWidth = function (width) {
    UI_ALL_WIDTH = width;
};

/**
 * 将像素值转换为dp值
 * @param px 像素值
 * @returns {number} dp值
 */
StyleSheet.pxToDp = function (px) {
    return width / UI_ALL_WIDTH * px;
};

/**
 * 获取最小线宽
 * @returns {number}
 */
StyleSheet.getMinLineWidth = function () {
    return 1 / PixelRatio.get();
};

/**
 * 获取窗口宽(dp)
 * @returns {number}
 */
StyleSheet.getWindowWidth = function () {
    return width;
};

/**
 * 获取窗口高(dp)
 * @returns {number}
 */
StyleSheet.getWindowHeight = function () {
    return height;
};

/**
 * 获取导航条高度
 */
StyleSheet.getNavigatorBarHeight = function () {
    if (NAVIGATORBAR_HEIGHT !== null) {
        return NAVIGATORBAR_HEIGHT;
    }
    let NavigationBarStyles = Platform.OS === 'android' ? Navigator.NavigationBar.StylesAndroid : Navigator.NavigationBar.StylesIOS;
    return NavigationBarStyles.General.NavBarHeight;
};

/**
 * 设置导航条高度
 * @param height 导航条高度
 */
StyleSheet.setNavigatorBarHeight = function (height) {
    NAVIGATORBAR_HEIGHT = height;
};

/**
 * 获取状态栏高度
 */
StyleSheet.getStatusBarHeight = function () {
    return Platform.OS === 'ios' ? 20 : 0;
};

// 全局样式
const GLOBAL_STYLES = {
    globalIcon: {
        width: StyleSheet.pxToDp(40),
        height: StyleSheet.pxToDp(40)
    }, globalFont: {},
    globalFontBlack: {
        color: '#000',
    }, globalBody: {
        backgroundColor: '#eeeeee',
        flex: 1
    }, globalNavButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: StyleSheet.pxToDp(20),
        paddingRight: StyleSheet.pxToDp(20)
    }, globalCommitButton: {
        width: StyleSheet.pxToDp(540),
        height: StyleSheet.pxToDp(100),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#9b7fff',
        marginTop: StyleSheet.pxToDp(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: StyleSheet.pxToDp(14),
    }, globalItem: {
        borderBottomWidth: StyleSheet.getMinLineWidth(),
        borderBottomColor: '#CCCCCC'
    }
};


/**
 * 创建一个加入了全局样式的对象
 * @param styles 样式对象
 * @returns {ReactClass.<any>|GraphFn|*|StyleSheet.<S>} 附加了全局样式的样式对象
 */
StyleSheet.create = function (styles = {}) {
    return Style.create({...GLOBAL_STYLES, ...styles});
};