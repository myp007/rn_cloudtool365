/**
 * 描述: 视图：编辑信息
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 毛耀平
 * 版本: 1.0.0
 * 创建时间: 2017/2/4 13:25
 */
import React from 'react';
import ReactNative from 'react-native';
const {Text, View,Image,TouchableOpacity} = ReactNative;
// 引入blue-book工具包
import {PageComponent, StyleSheet, Components, Icon,ImagePicker, Services,Storage} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;
const {PageView, RowMore} = Components;
export default class EditDataView extends PageComponent {
    constructor(props) {
        super(props);

        let msg = this.getRouteParams()['msg'] || '';

        this.state = {
            // 用户信息
            userInfo:{
                nickName: '',

                filePaths: require('../../assets/images/hand.png')
            },
        };
    }

    componentWillMount() {
        this._getUserInfo();
    }

    render() {
        return (
            <PageView style={{backgroundColor: '#FFFFFF'}}>
                <RowMore
                    style={styles.itemBox}>
                    <View style={styles.styleView}>
                      <Text style={styles.itemText}>头像</Text>
                    <TouchableOpacity
                        onPress={()=>this._selectPicture()}
                        style={[styles.pictureItem, {marginLeft:0}]}>
                         <Image style={styles.headImg} source={{uri: this.state.filePaths}}/>
                    </TouchableOpacity>
                    </View>
                </RowMore>
                <RowMore
                    style={styles.itemBox} onPress={()=>this.go('/personalCenter/EditUserNameView', '编辑用户名')}>
                    <View style={styles.styleView} >
                      <Text style={styles.itemText} >用户名</Text>
                      <Text style={styles.text}>{this.state.userInfo.nickName}</Text>
                    </View>
                </RowMore>
            </PageView>
        );
    }
    /**
     * 获取用户信息
     * @private
     */
    _getUserInfo() {
        (async() => {
            let data = await Services.Function10000000(false);
            if (!!data) {
                // 结果集
                let results = data.results;
                // 保存用户信息到本地
                await Storage.setItem('USER_INFO', results);
                // 修改登陆状态
                this.setState({
                    isLogin: true,
                    userInfo: results,
                });

            }
        })();
    }



    /**
     * 上传图片
     * @returns {Promise.<*>}
     * @private
     */
    async _uploadPicture() {
        // 图片信息
        let info = await ImagePicker.showImagePicker();
        return Services.Function11000140({
            filePath: info.uri
        });
    }

    /**
     * 选择图片
     * @private
     */
    _selectPicture() {
        (async() => {
            console.log('111111111111111111');
            let data = await this._uploadPicture();
            console.log(data)
            if (!!data) {
                this.setState({
                    userInfo: {...this.state, userInfo: {filePaths: data.results.filePath}}

                });
            }
            console.log('123456789')
            console.log(this.state.userInfo)
        })();
    }
}

const styles = StyleSheet.create({
     itemBox: {
        height: pxToDp(88),
        backgroundColor: '#FFFFFF',
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30),
        borderBottomWidth: StyleSheet.getMinLineWidth(),
        borderBottomColor: '#CCCCCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },styleView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },itemText: {
        flex:1,
        fontSize: pxToDp(24),
        color: '#999999',
        alignItems: 'center',
    },text:{
        fontSize:pxToDp(24),
        color:'#333'
    },pictureItem:{
        backgroundColor:'#ccc'
    },headImg:{
        width:pxToDp(50),
        height:pxToDp(50),

    }
});
