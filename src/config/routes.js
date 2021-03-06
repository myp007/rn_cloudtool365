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

// =====================================控制台
// 控制台
Router.addRoute('/ControlView', require('./../views/ControlView'));
// 自助开通服务
Router.addRoute('/control/InquiryView', require('./../views/control/InquiryView'));
// 订单详细
Router.addRoute('/control/OrderDetailsView', require('./../views/control/OrderDetailsView'));
// 订单列表
Router.addRoute('/control/OrderListView', require('./../views/control/OrderListView'))
// 支付结果
Router.addRoute('/control/ResultView', require('./../views/control/ResultView'));
// 支付-关于我们
Router.addRoute('/control/AboutView', require('./../views/control/AboutView'));

// =====================================个人中心
// 编辑资料
Router.addRoute('/personalCenter/EditDataView', require('./../views/personalCenter/EditDataView'));
// 消息提示
Router.addRoute('/personalCenter/MessageView', require('./../views/personalCenter/MessageView'));
// 系统设置
Router.addRoute('/personalCenter/SettingsView', require('./../views/personalCenter/SettingsView'));
// 关于我们
Router.addRoute('/personalCenter/AboutView', require('./../views/personalCenter/AboutView'));
// 编辑资料
Router.addRoute('/personalCenter/EditUserNameView', require('./../views/personalCenter/EditUserNameView'));
// 消息详情
Router.addRoute('/personalCenter/MessageDetailsView', require('./../views/personalCenter/MessageDetailsView'));


// =====================================登录注册
// 登录
Router.addRoute('/loginregister/LoginView', require('./../views/loginregister/LoginView'));
// 注册
Router.addRoute('/loginregister/RegisterView', require('./../views/loginregister/RegisterView'));
// 找回密码
Router.addRoute('/loginregister/ForgetPwdView', require('./../views/loginregister/ForgetPwdView'));
// 重置密码
Router.addRoute('/loginregister/ResetPwdView', require('./../views/loginregister/ResetPwdView'));
// 用户协议
Router.addRoute('/personalCenter/AgreementView', require('./../views/personalCenter/AgreementView'));