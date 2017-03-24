const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
    ScrollView,
    TouchableOpacity
} = ReactNative;

const DefaultTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: View.propTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            backgroundColor: null,
        };
    },

    renderTabOption(name, page) {
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';
        // let buttonStyles = this.props.tabBarBisect !== false ? {flex: 1} : {flex: 1};

        return <TouchableOpacity
            style={[styles.tab, this.props.tabBarItemStyle]}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
                {name}
            </Text>
        </TouchableOpacity>;
    },

    render() {
        return this.props.tabBarBisect === false ? this.renderNotBisect() : this.renderBisect();
    },

    // 等分渲染
    renderBisect() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            backgroundColor: 'navy',
            bottom: 0,
        };

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1,], outputRange: [0, containerWidth / numberOfTabs,],
        });
        return (
            <View
                style={[this.props.tabBarDirection == 'column' ? styles.tabsColumn : styles.tabs, {backgroundColor: this.props.backgroundColor}, this.props.tabBarStyle]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
                {this.props.tabBarDirection != 'column' &&
                <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]}/>}
            </View>
        );
    },

    // 不等分渲染
    renderNotBisect() {
        return (
            <View
                style={[this.props.tabBarDirection == 'column' ? styles.tabsColumn : styles.tabs,this.props.tabBarStyle]}>
                <ScrollView
                    horizontal={this.props.tabBarDirection != 'column'}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[ {flex:1}]}>
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        const renderTab = this.props.renderTab || this.renderTab;
                        return renderTab(name, page, isTabActive, this.props.goToPage);
                    })}
                </ScrollView>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    }, tabs: {
        height: 50,
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
        backgroundColor: '#F00'
    }, tabsColumn: {
        width: 50,
        flexDirection: 'column',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    }
});

module.exports = DefaultTabBar;