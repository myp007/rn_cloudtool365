/**
 * 描述: 视图：个人中心
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2016/12/26 17:23
 */
import React from 'react';
import ReactNative  from 'react-native';
let {View, TouchableOpacity, Text, Image, ListView} = ReactNative;
// 导入blue-book工具包{页面组件}
import {PageComponent, StyleSheet, Components, Icon, Services, Storage} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView, RowMore}= Components;
export default class PersonalCenterView extends PageComponent {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                phone: '点击登录',
                headImg: '',
                nickName: ''
            },
            columns: [
                {

                    "id": "1",
                    "name": "编辑资料",
                    "url": "/personalCenter/EditDataView"
                }, {
                    "id": "2",
                    "name": "消息提示",
                    "url": "/personalCenter/MessageView"
                }, {
                    "id": "3",
                    "name": "系统设置",
                    "url": "/personalCenter/SettingsView"
                }, {
                    "id": "4",
                    "name": "关于我们",
                    "url": "/personalCenter/AboutView"
                }
            ],
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        }
    }

    componentWillMount() {
        this._getUserInfo();
    }

    render() {
        return (
            <PageView style={{backgroundColor: '#FFFFFF'}}>
                <View style={styles.infoBg}>
                    <TouchableOpacity style={styles.infoBox} onPress={()=>this.isLogin()}>
                        <View style={styles.infoHead}>
                            {!this.state.userInfo.headImg
                                ? <Image style={styles.headImg} source={require('../assets/images/hand.png')}/>
                                : <Image style={styles.headImg} source={{uri: this.state.userInfo.headImg}}/>}
                        </View>
                        <Text style={styles.infoText}>
                            {!this.state.userInfo.nickName? this.state.userInfo.phone: this.state.userInfo.nickName}
                        </Text>
                    </TouchableOpacity>

                </View>
                <ListView
                    style={styles.globalBody}
                    dataSource={this.state.ds.cloneWithRows(this.state.columns)}
                    renderRow={(...args)=>this._renderRow(...args)}/>
            </PageView>
        );
    }

    //顶部标题
    setNavigatorTitle(route, navigator, home, navState) {
        return (
            <View style={styles.titleView}><Text style={styles.titleText}>个人中心</Text></View>
        );
    }

    _renderRow(data) {
        return (
            <RowMore
                onPress={()=>this.go(data.url, data.name, this.state.userInfo)}
                style={styles.itemBox}>
                <Text style={styles.itemText}>{data.name}</Text>
            </RowMore>
        );
    }

    /**
     * 获取用户信息
     * @private
     */
    _getUserInfo() {
        (async() => {
            let data = await Services.Function10000000(false);
            console.log(data)
            if (!!data) {
                // 结果集
                let results = data.results;
                // 保存用户信息到本地
                await Storage.setItem('USER_INFO', results);

                // 修改用户信息
                this.setState({
                    userInfo: {
                        phone: results.phone,
                        headImg: results.headImg,
                        nickName: results.nickName
                    },
                });
            }
        })();
    }

    /**
     * 判断是否登录
     * @private
     */
    isLogin() {
        (async() => {
            let userInfo = await Services.getLocalUserInfo();
            console.info(userInfo)
            if (!userInfo) {
                // Modal.showAlert('登陆过期，请重新登陆！');
                this.go('/loginregister/LoginView', '用户登录', {});
            }

        })();

    }
}

const styles = StyleSheet.create({
    infoBg: {
        width: pxToDp(750),
        height: pxToDp(410),
        paddingTop: pxToDp(120),
        paddingBottom: pxToDp(70),
        backgroundColor: '#3397fb',
    }, infoBox: {
        flex: 1,
        backgroundColor: '#3397fb',
        alignItems: 'center',
    }, infoHead: {
        width: pxToDp(150),
        height: pxToDp(150),
        borderRadius: pxToDp(75),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    }, headImg: {
        width: pxToDp(150),
        height: pxToDp(150),
        borderRadius: pxToDp(75),
    }, infoText: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: pxToDp(32),
        marginTop: pxToDp(15),
    }, globalBody: {
        marginTop: pxToDp(115),
        borderTopWidth: StyleSheet.getMinLineWidth(),
        borderTopColor: '#CCCCCC',
    }, itemBox: {
        flexDirection: 'row',
        height: pxToDp(88),
        backgroundColor: '#FFF',
        borderBottomColor: '#CCCCCC',
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        borderBottomWidth: StyleSheet.getMinLineWidth(),
    }, itemText: {
        fontSize: pxToDp(34),
        color: '#999999',
    }, titleView: {
        padding: 0,
        paddingTop: pxToDp(30),
    }, titleText: {
        color: '#fff',
        fontSize: pxToDp(40)
    }
});
