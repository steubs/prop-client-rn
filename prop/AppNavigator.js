import { createStackNavigator } from 'react-navigation';
import Auth from './Auth';
import MapView from './MapView';
import ScanBike from './ScanBike';

const AppNavigator = createStackNavigator({
    Auth: { screen: Auth },
    ScanBike: { screen: ScanBike },
    MapView: { screen: MapView },
});

export default AppNavigator;