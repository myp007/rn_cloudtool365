/**
 * 描述: 组件集合
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/3 9:53
 */
// 声明组件对象
const Components = {};

// 页面视图组件
Components.PageView = require('./components/PageView')['default'];
// 简单按钮
Components.SimpleButton = require('./components/SimpleButton')['default'];
// 行组件(带更多图标)
Components.RowMore = require('./components/RowMore')['default'];
// 评价组件
Components.Evaluate = require('./components/Evaluate')['default'];
// 单选按钮组件
Components.RadioButton = require('./components/RadioButton')['default'];
// 范围选择条组件
Components.ScopeBar = require('./components/ScopeBar')['default'];
// 模态框
Components.Modal = require('./components/Modal')['default'];
// 主视图组件(入口主件)
Components.MainView = require('./components/MainView')['default'];
// 分页组件
Components.Pagination = require('./components/Pagination')['default'];
// 可滑动行
Components.ScrollRow = require('./components/ScrollRow')['default'];

export  {Components};