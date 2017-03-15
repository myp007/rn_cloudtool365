/**
 * 描述: 模态框
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/9 16:23
 */
import React from 'react';
import ReactNative from 'react-native';
const {View, Image, TouchableOpacity} = ReactNative;
import {ReactNativeComponent} from '../ReactNativeComponent';
const {Text} = ReactNativeComponent;
import {StyleSheet} from '../StyleSheet';
import {Icon} from '../Icon';
import SimpleButton from './SimpleButton';
const {pxToDp} = StyleSheet;

// 弹出层控制对象
const Modal = {setStateFunction: null};

/**
 * 对话框
 */
class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 是否打开对话框
            isOpenDialog: false
        };
    }

    componentWillMount() {
        Modal.dialogFunction = (title, msg, sureCallBack, cancelCallBack) => {
            this.setState({
                isOpenDialog: true,
                title: title,
                msg: msg,
                sureCallBack: sureCallBack,
                cancelCallBack: cancelCallBack
            });
        }
    }

    render() {
        return (
            <View style={[styles.content, {height:this.state.isOpenDialog?StyleSheet.getWindowHeight():0}]}>
                <View style={styles.bg}/>
                {this.state.isOpenDialog ? this._renderContent() : null}
            </View>
        );
    }

    _renderContent() {
        return (
            <View style={styles.msgBox}>
                <Text style={styles.title}>{this.state.title}</Text>
                <View style={{width: pxToDp(550), minHeight:pxToDp(120)}}>
                    {typeof(this.state.msg) == 'string' ?
                        <Text style={styles.msg}>{this.state.msg}</Text> : this.state.msg}
                </View>
                <View style={styles.buttonBox}>
                    <SimpleButton
                        onPress={()=>{
                            if(this.state.cancelCallBack) {
                                this.state.cancelCallBack();
                            }
                            this.setState({
                                isOpenDialog: false,
                                title: '',
                                msg: '',
                                sureCallBack: null,
                                cancelCallBack: null
                            });
                        }}
                        style={[styles.button, {backgroundColor: '#FFFFFF'}]}
                        textStyle={{color: '#9b7fff'}}>取消</SimpleButton>
                    <SimpleButton
                        onPress={()=>{
                            if(this.state.sureCallBack) {
                                this.state.sureCallBack();
                            }
                            this.setState({
                                isOpenDialog: false,
                                title: '',
                                msg: '',
                                sureCallBack: null,
                                cancelCallBack: null
                            });
                        }}
                        style={[styles.button, {marginLeft: pxToDp(30)}]}>确定</SimpleButton>
                </View>
            </View>
        );
    }
}

/**
 * 加载中
 */
class Loading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否打开等待框
            isOpenWait: false
        };
    }

    componentWillMount() {
        Modal.waitFunction = (status) => {
            this.setState({
                isOpenWait: status
            });
        }
    }

    render() {
        return (
            <View style={[styles.content, {height:this.state.isOpenWait?StyleSheet.getWindowHeight():0}]}>
                <View style={styles.bg}/>
                {this.state.isOpenWait ? <LoadingAnimate /> : null}
            </View>
        );
    }
}

/**
 * 警告框
 */
class Alert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否打开等待框
            isShowAlert: false,
            msg: '',
            sureCallBack: null
        };
    }

    componentWillMount() {
        Modal.alertFunction = (msg, sureCallBack = null) => {
            this.setState({
                isShowAlert: true,
                msg: msg,
                sureCallBack: sureCallBack
            });
        }
    }

    render() {
        return (
            <View style={[styles.content, {height:this.state.isShowAlert ? StyleSheet.getWindowHeight() : 0}]}>
                <View style={styles.bg}/>
                {this.state.isShowAlert ? this._renderContent() : null}
            </View>
        );
    }

    _renderContent() {
        return (
            <View style={styles.alertBox}>
                <View style={styles.alertContentBox}>
                    <Text style={styles.msg}>{this.state.msg}</Text>
                </View>
                <TouchableOpacity
                    style={styles.alertButtonBox}
                    onPress={()=> {
                        this.setState({isShowAlert: false});
                        if(!!this.state.sureCallBack) {
                            this.state.sureCallBack();
                        }
                    }}>
                    <Text style={{color: '#1e90ff'}}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

/**
 * 简单消息
 */
class SimpleMsg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 是否打开等待框
            isShowSimpleMsg: false,
            msg: ''
        };
    }

    componentWillMount() {
        Modal.simpleMsgFunction = (msg, time) => {
            this.setState({
                isShowSimpleMsg: true,
                msg: msg
            });

            setTimeout(() => {
                this.setState({
                    isShowSimpleMsg: false,
                    msg: ''
                });
            }, time);
        }
    }

    render() {
        return (
            <View style={[styles.simpleMsgBox, {height:this.state.isShowSimpleMsg ? pxToDp(120) : 0}]}>
                {this.state.isShowSimpleMsg ? this._renderContent() : null}
            </View>
        );
    }

    _renderContent() {
        return (
            <View style={styles.simpleMsgContent}>
                <View style={styles.simpleMsgBoxBg}/>
                <Text style={styles.simpleMsg}>{this.state.msg}</Text>
            </View>
        );
    }

    componentDidMount() {

    }
}

/**
 * 加载动画
 */
class LoadingAnimate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // 图片索引
            index: 0
        };
    }

    componentWillMount() {
        this.t = setInterval(() => {
            this.setState({
                index: this.state.index == 7 ? 0 : ++this.state.index
            });
        }, 50)
    }

    render() {
        return <Image style={styles.waitImage} source={Icon.get('BLUE_BOOK_ICON_LOADING')[this.state.index]}/>
    }

    componentWillUnmount() {
        clearInterval(this.t);
    }
}

/**
 * 打开一个等待弹窗
 */
Modal.openWait = function () {
    if (!!this.waitFunction) {
        this.waitFunction(true)
    }
};

/**
 * 关闭一个等待弹窗
 */
Modal.closeWait = function () {
    if (!!this.waitFunction) {
        this.waitFunction(false)
    }
};

/**
 * 显示一个警告框
 */
Modal.showAlert = function (msg, sureCallBack) {
    if (!!Modal.alertFunction) {
        Modal.alertFunction(msg, sureCallBack);
    }
};

/**
 * 打开一个对话框
 * @param title 标题
 * @param msg 消息
 * @param sureCallBack 确定回调
 * @param cancelCallBack 取消回调
 */
Modal.openDialog = function (title, msg, sureCallBack, cancelCallBack) {
    if (!!Modal.dialogFunction) {
        Modal.dialogFunction(title, msg, sureCallBack, cancelCallBack);
    }
};

/**
 * 打开一个简单消息提示
 * @param msg 消息内容
 * @param time 存在时间
 */
Modal.showSimpleMsg = function (msg, time = 1000) {
    if (!!Modal.simpleMsgFunction) {
        Modal.simpleMsgFunction(msg, time || 1000);
    }
};

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: 999,
        width: StyleSheet.getWindowWidth(),
        height: StyleSheet.getWindowHeight(),
        justifyContent: 'center',
        alignItems: 'center'
    }, waitImage: {
        width: pxToDp(60),
        height: pxToDp(60),
        position: 'absolute',
        left: StyleSheet.getWindowWidth() / 2 - pxToDp(30),
        top: StyleSheet.getWindowHeight() / 2 - pxToDp(30),
        zIndex: 999999
    }, bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: StyleSheet.getWindowWidth(),
        height: StyleSheet.getWindowHeight(),
        backgroundColor: '#000',
        opacity: 0.4
    }, msgBox: {
        borderRadius: pxToDp(14),
        width: pxToDp(550),
        minHeight: pxToDp(320),
        backgroundColor: '#FFFFFF',
        paddingBottom: pxToDp(140),
        padding: pxToDp(30),
        alignItems: 'center'
    }, title: {
        fontSize: pxToDp(36),
        color: '#333333'
    }, msg: {
        fontSize: pxToDp(30),
        color: '#333333',
        marginTop: pxToDp(20),
        flex: 1,
        textAlign: 'center'
    }, buttonBox: {
        height: pxToDp(140),
        position: 'absolute',
        bottom: 0,
        width: pxToDp(550),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: pxToDp(30)
    }, button: {
        width: pxToDp(230),
        height: pxToDp(80)
    }, alertBox: {
        backgroundColor: '#FFFFFF',
        paddingLeft: pxToDp(20),
        paddingRight: pxToDp(20),
        borderRadius: pxToDp(14),
        width: pxToDp(550)
    }, alertContentBox: {
        width: pxToDp(510),
        alignItems: 'center',
        borderBottomWidth: StyleSheet.getMinLineWidth(),
        borderBottomColor: '#CCCCCC',
        minHeight: pxToDp(88)
    }, alertButtonBox: {
        width: pxToDp(550),
        height: pxToDp(95),
        justifyContent: 'center',
        alignItems: 'center'
    }, alertContentText: {
        fontSize: pxToDp(26),
        color: '#333333'
    }, simpleMsgBox: {
        width: pxToDp(250),
        height: pxToDp(120),
        position: 'absolute',
        top: (StyleSheet.getWindowHeight() - pxToDp(120)) / 2,
        left: (StyleSheet.getWindowWidth() - pxToDp(250)) / 2,
        overflow: 'hidden',
        zIndex: 999,
    }, simpleMsgBoxBg: {
        width: pxToDp(250),
        height: pxToDp(120),
        position: 'absolute',
        backgroundColor: '#000000',
        opacity: 0.5,
        borderRadius: pxToDp(14),
        top: 0,
        left: 0
    }, simpleMsg: {
        color: '#FFFFFF',
        fontSize: pxToDp(30)
    }, simpleMsgContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

Modal.Loading = Loading;
Modal.Dialog = Dialog;
Modal.Alert = Alert;
Modal.SimpleMsg = SimpleMsg;

export default Modal;