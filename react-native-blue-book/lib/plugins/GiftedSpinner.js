/**
 * 描述: react-native-gifted-spinner
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/17 15:17
 */
import React from 'react';
import ReactNative from 'react-native';
const {View, ActivityIndicator} = ReactNative;

class GiftedSpinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ActivityIndicator animating={true} size="small" {...this.props} />
            </View>
        );
    }
}

export default GiftedSpinner;