/**
 * 描述:
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/4 19:26
 */
import React from 'react';
import ReactNative from 'react-native';
const {View, TextInput} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Components} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {SimpleButton} = Components;

export default class EditTextView extends PageComponent {
    constructor(props) {
        super(props);

        // 路由参数
        let params = this.getRouteParams();

        this.state = {
            callBack: params.callBack,
            text: params.text,
            text1: ''
        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.content}>
                <TextInput
                    defaultValue={this.state.text}
                    underlineColorAndroid='transparent'
                    multiline={true}
                    onChangeText ={(text)=>{
                        this.setState({
                            text :text
                        });
                    }}
                    style={styles.textArea}/>
                <SimpleButton
                    onPress={()=>{
                        this.goBack();
                        if(!!this.state.callBack) {
                            this.state.callBack(this.state.text);
                        }
                    }}
                    style={styles.button}>确定</SimpleButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        padding: pxToDp(30),
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1
    }, textArea: {
        width: pxToDp(690),
        height: pxToDp(400),
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: pxToDp(14),
        textAlignVertical: 'top'
    }, button: {
        marginTop: pxToDp(40)
    }
});