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

        let params = this.getRouteParams();
        console.log(params.headImg)
        this.state = {
            // 用户信息
            userInfo:{
                nickName: params.nickName,
                filePath: params.headImg
            },
        };
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
                        {this._getPictureBy()}
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


    _getPictureBy() {

        let files = this.state.userInfo.filePath;
        console.log(files)
        if (files=='') {
            return <Image style={styles.headImg} source={require('../../assets/images/hand.png')}/>;
        } else  {
            return <Image style={styles.headImg} source={{uri: files}}/>;
        }
        console.log(files)
    }

    /**
     * 选择图片
     * @private
     */
    _selectPicture() {
        (async() => {
            // 图片信息
            let info = await ImagePicker.showImagePicker();
            // 上传图片
            let data = await Services.Function11000140({filePath: info.uri});
            if (!!data) {
                this.setState({
                    userInfo: {...this.state.userInfo, filePath: data.results.filePath}
                });
                // 更改服务器头像
                let headInfo = await Services.Function10000105({headImg: data.results.filePath});
                if (!!headInfo) {
                    this.goBackRoot(true);
                }
            }
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
        fontSize: pxToDp(30),
        color: '#999999',
        alignItems: 'center',
    },text:{
        fontSize:pxToDp(28),
        color:'#333'
    },pictureItem:{
        backgroundColor:'#ccc'
    },headImg:{
        width:pxToDp(50),
        height:pxToDp(50),
        borderRadius:pxToDp(25)
    }
});
