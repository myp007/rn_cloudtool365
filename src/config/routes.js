/**
 * 描述: 路由配置
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/2 14:45
 */
// 导入blue-book工具包{路由器}
import {Router} from 'react-native-blue-book';

// =====================================个人中心
// 个人中心
Router.addRoute('/PersonalCenterView', require('./../views/PersonalCenterView'));

// =====================================主页
// 主页
Router.addRoute('/IndexView', require('./../views/IndexView'));
// 主页-新闻列表
Router.addRoute('/index/NewsListView', require('./../views/index/NewsListView'));
// 主页-新闻详情
Router.addRoute('/index/NewsView', require('./../views/index/NewsView'));