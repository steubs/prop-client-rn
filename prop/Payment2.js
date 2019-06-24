import React, { PureComponent } from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import DrawerLayout from 'react-native-drawer-layout-polyfill'
import stripe from 'tipsi-stripe'
import Header from './components/Header'
import MenuItem from './components/MenuItem'
import CardFormScreen from './scenes/CardFormScreen'

import testID from './utils/testID'

stripe.setOptions({
    publishableKey: '<PUBLISHABLE_KEY>',
    merchantId: '<MERCHANT_ID>',
    androidPayMode: 'test',
})

export default class Payment2 extends PureComponent {
    state = {
        index: 0,
        isDrawerOpen: false,
        routes: [
            CardFormScreen,
        ].filter(item => item),
    }

    getCurrentScene = () => this.state.routes[this.state.index]

    handleChangeTab = (index) => {
        this.drawer.closeDrawer()
        this.setState({ index })
    }

    handleDrawerRef = (node) => {
        this.drawer = node
    }

    handleMenuPress = () => {
        if (this.state.isDrawerOpen) {
            this.drawer.closeDrawer()
        } else {
            this.drawer.openDrawer()
        }
    }

    handleDrawerOpen = () => {
        this.setState({ isDrawerOpen: true })
    }

    handleDrawerClose = () => {
        this.setState({ isDrawerOpen: false })
    }

    /* eslint-disable react/no-array-index-key */
    renderNavigation = () => (
        <View style={styles.drawer}>
            {this.state.routes.map((Scene, index) => (
                <MenuItem
                    key={index}
                    title={Scene.title}
                    active={this.state.index === index}
                    onPress={() => this.handleChangeTab(index)}
                    {...testID(Scene.title)}
                />
            ))}
        </View>
    )

    render() {
        //const Scene = this.getCurrentScene()
        return (
            <CardFormScreen />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    drawer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})