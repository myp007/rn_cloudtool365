
/**
 * 描述: ReactNative组件重写
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/3/3 15:03
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text} = ReactNative;
const ReactNativeComponent = {};

class TextComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Text {...this.props} style={[{backgroundColor: 'transparent'}, this.props.style || {}]}/>
    }
}
// 重写Text组件
ReactNativeComponent.Text = TextComponent;

export {ReactNativeComponent};
export default ReactNativeComponent;