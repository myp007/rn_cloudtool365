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
        this.state = {
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            stars: []
        }
    }

    static propTypes = {
        // 星星总数
        startSize: React.PropTypes.number,
        // 默认星星数
        defaultNum: React.PropTypes.number,
        // 监听星星个数改变
        onChange: React.PropTypes.func,
        // 是否允许修改
        enableChange: React.PropTypes.bool
    };

    static defaultProps = {
        startSize: 5,
        defaultNum: 0,
        onChange: null,
        enableChange: true
    };

    componentWillMount() {
        let stars = [];
        console.info(this.props);
        for (let i = 0; i < this.props.startSize; i++) {
            stars.push(false);
        }
        this.setState({
            stars: stars
        }, () => {
            this._setStarNum(this.props.defaultNum);
        });
    }

    render() {
        return (
            <ListView
                style={[styles.starBox, this.props.style]}
                contentContainerStyle={{ justifyContent: 'center', alignItems:'center', flex: 1}}
                horizontal={true}
                dataSource={this.state.ds.cloneWithRows(this.state.stars)}
                enableEmptySections={true}
                renderRow={(rowData, sectionID, rowID, highlightRow)=>
                    <TouchableOpacity
                        style={[styles.starButton]}
                        onPress={()=>{
                            if(this.props.enableChange === true) {
                                this._setStarNum(parseInt(rowID)+1);
                                if(this.props.onChange !== null) {
                                    this.props.onChange(parseInt(rowID)+1);
                                }
                            }
                        }}>
                        <Image style={[{width: pxToDp(60),height: pxToDp(60)}, this.props['starStyle']]} source={rowData?Icon.get('ICON_STAR_LIGHT'):Icon.get('ICON_STAR')} />
                    </TouchableOpacity>
                }/>
        );
    }

    /**
     * 设置亮星个数
     * @param num 星星个数
     * @private
     */
    _setStarNum(num) {
        let stars = this.state.stars;
        for (let i = 0; i < stars.length; i++) {
            stars[i] = (i < num);
        }
        this.setState({
            stars: stars
        });
    }
}

const styles = StyleSheet.create({
    starBox: {
        height: pxToDp(200),
        marginTop: pxToDp(10),
        flex: 1
    }, starButton: {
        height: pxToDp(200),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});