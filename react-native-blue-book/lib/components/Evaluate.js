/**
 * 描述: 评价组件
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2016/12/30 14:02
 */
import React from 'react';
import ReactNative from 'react-native';
const {Image, ListView, TouchableOpacity} = ReactNative;
// 导入blue-book工具包{图标组件}
import {Icon, StyleSheet} from 'react-native-blue-book';
const {pxToDp} = StyleSheet;

export default class Evaluate extends React.Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([false, false, false, false, false])
        }
    }

    render() {
        return (
            <ListView
                style={[styles.starBox, this.props.style]}
                contentContainerStyle={{ justifyContent: 'center', alignItems:'center', flex: 1}}
                horizontal={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID, highlightRow)=>
                    <TouchableOpacity
                        style={[styles.starButton]}
                        onPress={()=>{
                            let states = [false, false, false, false, false];
                            for(let i=0; i<=rowID;i++) {
                                states[i] = true;
                            }
                            this.setState({dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(states)})
                        }}>
                        <Image style={[{width: pxToDp(60),height: pxToDp(60)}, this.props['starStyle']]} source={rowData?Icon.get('ICON_STAR_LIGHT'):Icon.get('ICON_STAR')} />
                    </TouchableOpacity>
                }/>
        );
    }
}

const styles = StyleSheet.create({
    starBox: {
        height: pxToDp(200),
        marginTop: pxToDp(10),
        flex:1
    }, starButton: {
        height: pxToDp(200),
        alignItems: 'center',
        justifyContent:'center',
        flex:1
    }
});