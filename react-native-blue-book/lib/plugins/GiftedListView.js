/**
 * 描述: react-native-gifted-listview(V0.0.15)
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/1/17 11:56
 */
import React from 'react';
import ReactNative from 'react-native';
const {ListView, TouchableHighlight, View, Text, RefreshControl, StyleSheet} = ReactNative;
import GiftedSpinner from './GiftedSpinner';

// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
    for (let p of Object.keys(obj2)) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

class GiftedListView extends React.Component {
    constructor(props) {
        super(props);

        this.mounted = false;

        this._setPage(1);
        this._setRows([]);

        let ds = null;
        if (this.props.withSections === true) {
            ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            });
            this.state = {
                dataSource: ds.cloneWithRowsAndSections(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad'
            };
        } else {
            ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            });
            this.state = {
                dataSource: ds.cloneWithRows(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad'
            };
        }

        // 向外暴露分页控制方法
        if (!!this.props.paginationControl) {
            this.props.paginationControl.refresh = ()=>{
                this._refresh();
            };
        }
    }

    static defaultProps = {
        customStyles: {},
        initialListSize: 10,
        firstLoader: true,
        pagination: true,
        refreshable: true,
        refreshableColors: undefined,
        refreshableProgressBackgroundColor: undefined,
        refreshableSize: undefined,
        refreshableTitle: undefined,
        refreshableTintColor: undefined,
        renderRefreshControl: null,
        headerView: null,
        sectionHeaderView: null,
        scrollEnabled: true,
        withSections: false,
        onFetch(page, callback, options) {
            callback([]);
        },
        paginationFetchingView: null,
        paginationAllLoadedView: null,
        paginationWaitingView: null,
        emptyView: null,
        renderSeparator: null,
    };

    static propTypes = {
        // 分页组件控制
        paginationControl: React.PropTypes.object,
        customStyles: React.PropTypes.object,
        initialListSize: React.PropTypes.number,
        firstLoader: React.PropTypes.bool,
        pagination: React.PropTypes.bool,
        refreshable: React.PropTypes.bool,
        refreshableColors: React.PropTypes.array,
        refreshableProgressBackgroundColor: React.PropTypes.string,
        refreshableSize: React.PropTypes.string,
        refreshableTitle: React.PropTypes.string,
        refreshableTintColor: React.PropTypes.string,
        renderRefreshControl: React.PropTypes.func,
        headerView: React.PropTypes.func,
        sectionHeaderView: React.PropTypes.func,
        scrollEnabled: React.PropTypes.bool,
        withSections: React.PropTypes.bool,
        onFetch: React.PropTypes.func,

        paginationFetchingView: React.PropTypes.func,
        paginationAllLoadedView: React.PropTypes.func,
        paginationWaitingView: React.PropTypes.func,
        emptyView: React.PropTypes.func,
        renderSeparator: React.PropTypes.func,
    };

    _setPage(page) {
        this._page = page;
    }

    _getPage() {
        return this._page;
    }

    _setRows(rows) {
        this._rows = rows;
    }

    _getRows() {
        return this._rows;
    }

    paginationFetchingView() {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView();
        }

        return (
            <View style={[styles.paginationView, this.props.customStyles.paginationView]}>
                <GiftedSpinner />
            </View>
        );
    }

    paginationAllLoadedView() {
        if (this.props.paginationAllLoadedView) {
            return this.props.paginationAllLoadedView();
        }

        return (
            <View style={[styles.paginationView, this.props.customStyles.paginationView]}>
                <Text style={[styles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    ~
                </Text>
            </View>
        );
    }

    paginationWaitingView(paginateCallback) {
        if (this.props.paginationWaitingView) {
            return this.props.paginationWaitingView((...args) => paginateCallback.call(this, ...args));
        }

        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={(...args)=>paginateCallback.call(this, ...args)}
                style={[styles.paginationView, this.props.customStyles.paginationView]}
            >
                <Text style={[styles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    Load more
                </Text>
            </TouchableHighlight>
        );
    }

    headerView() {
        if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView) {
            return null;
        }
        return this.props.headerView();
    }

    emptyView(refreshCallback) {
        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }

        return (
            <View style={[styles.defaultView, this.props.customStyles.defaultView]}>
                <Text style={[styles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
                    Sorry, there is no content to display
                </Text>

                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                >
                    <Text>
                        ↻
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    renderSeparator() {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator();
        }

        return (
            <View style={[styles.separator, this.props.customStyles.separator]}/>
        );
    }

    setNativeProps(props) {
        this.refs.listview.setNativeProps(props);
    }

    _refresh() {
        this._onRefresh({external: true});
    }

    _onRefresh(options = {}) {
        if (this.isMounted()) {
            this.setState({
                isRefreshing: true,
            });
            this._setPage(1);
            this.props.onFetch(this._getPage(), (...args) => this._postRefresh(...args), options);
        }
    }

    _postRefresh(rows = [], options = {}) {
        if (this.isMounted()) {
            this._updateRows(rows, options);
        }
    }

    _onPaginate() {
        if (this.state.paginationStatus === 'allLoaded') {
            return null
        } else {
            this.setState({
                paginationStatus: 'fetching',
            });
            this.props.onFetch(this._getPage() + 1, (...args) => this._postPaginate(...args), {});
        }
    }

    _postPaginate(rows = [], options = {}) {
        this._setPage(this._getPage() + 1);
        let mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRecursive(this._getRows(), rows);
        } else {
            mergedRows = this._getRows().concat(rows);
        }
        this._updateRows(mergedRows, options);
    }

    _updateRows(rows = [], options = {}) {
        if (rows !== null) {
            this._setRows(rows);
            if (this.props.withSections === true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            } else {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            }
        } else {
            this.setState({
                isRefreshing: false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        }
    }

    _renderPaginationView() {
        if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
            return this.paginationFetchingView();
        } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
            return this.paginationWaitingView(this._onPaginate);
        } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
            return this.paginationAllLoadedView();
        } else if (this._getRows().length === 0) {
            return this.emptyView(this._onRefresh);
        } else {
            return null;
        }
    }

    renderRefreshControl() {
        if (this.props.renderRefreshControl) {
            return this.props.renderRefreshControl({onRefresh: this._onRefresh});
        }
        return (
            <RefreshControl
                onRefresh={()=>this._onRefresh()}
                refreshing={this.state.isRefreshing}
                colors={this.props.refreshableColors}
                progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
                size={this.props.refreshableSize}
                tintColor={this.props.refreshableTintColor}
                title={this.props.refreshableTitle}
            />
        );
    }

    isMounted() {
        return this.mounted || false;
    }

    componentDidMount() {
        this.mounted = true;
        this.props.onFetch(this._getPage(), (...args) => this._postRefresh(...args), {firstLoad: true});
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderRow={this.props.rowView}
                renderSectionHeader={this.props.sectionHeaderView}
                renderHeader={()=>this.headerView()}
                renderFooter={()=>this._renderPaginationView()}
                renderSeparator={()=>this.renderSeparator()}

                automaticallyAdjustContentInsets={false}
                scrollEnabled={this.props.scrollEnabled}
                canCancelContentTouches={true}
                refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}
                {...this.props}
                style={this.props.style}
            />
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    actionsLabel: {
        fontSize: 20,
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    defaultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    }
});


export default GiftedListView;
