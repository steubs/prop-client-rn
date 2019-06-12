import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MapView from './MapView'
import Authentication from './Auth'
import ScanBike from './ScanBike'
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to auth"
          onPress={() => this.props.navigation.navigate('Authentication')}
        />
        <Button
          title="Go to mapview"
          onPress={() => this.props.navigation.push('MapView')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to mapview"
          onPress={() => this.props.navigation.push('MapView')}
        />
        <Button
          title="Go to auth"
          onPress={() => this.props.navigation.push('Authentication')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    MapView: {
      screen: MapView
    },
    Authentication: {
      screen: Authentication
    },
    ScanBike: {
      screen: ScanBike
    },

  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}