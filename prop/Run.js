// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
//import { Location } from 'expo';
import Mapbox from '@react-native-mapbox-gl/maps';
import { point } from '@turf/helpers';
import distance from '@turf/distance';
//import Monitor from './Monitor';
//import Pin from './Pin';

Mapbox.setAccessToken(
    'pk.eyJ1IjoianM5NyIsImEiOiJjandoOTRsY28wdno1NDludnRubDdyeTJlIn0.VgsUXfkp1wI93v1QP5dAbA'
);
//const { Marker, Polyline } = MapBox.MapView;

type Position = {
    coords: {
        accuracy: number,
        altitude: number,
        altitudeAccuracy: number,
        heading: number,
        latitude: number,
        longitude: number,
        speed: number
    },
    timestamp: number
};

type RunProps = {
    distance: number,
    latitude: number,
    longitude: number
};

type RunState = {
    positions: Position[],
    duration: number,
    distance: number
};

const distanceBetween = (from: Position, to: Position) => {
    const options = { units: 'meters' };
    const origin = point([from.coords.longitude, from.coords.latitude]);
    const destination = point([to.coords.longitude, to.coords.latitude]);
    return distance(origin, destination, options);
};

const paceBetween = (distance: number, from: Position, to: Position) => {
    const pace = (to.timestamp - from.timestamp) / distance;
    return pace;
};

export default class Run extends React.PureComponent<RunProps, RunState> {
    //map = React.createRef();

    state = {
        positions: [],
        duration: 0,
        distance: 0
    };

    //interval;

    // watcher: { remove: () => void };

    async componentDidMount() {
        const options = {
            enableHighAccuracy: true,
            timeInterval: 2000,
            distanceInterval: 1
        };
        /*this.watcher = await Location.watchPositionAsync(
            options,
            this.onNewPosition
        );*/
    }

    componentWillUnmount() {
        //this.watcher.remove();
    }

    onNewPosition = (position: Position) => {
        if (position.coords.accuracy >= 50) {
            return;
        }
        this.map.current.animateToCoordinate(position.coords, 1000);
        const { positions } = this.state;
        const duration = positions[0]
            ? position.timestamp - positions[0].timestamp
            : 0;
        const distance = positions[0]
            ? distanceBetween(positions[positions.length - 1], position)
            : 0;
        const pace = positions[0]
            ? paceBetween(distance, positions[positions.length - 1], position)
            : 0;
        this.setState({
            positions: [...positions, position],
            duration,
            distance: this.state.distance + distance,
            pace
        });
    };

    render(): React.Node {
        const { latitude, longitude, distance: totalDistance } = this.props;
        const { positions, distance, pace } = this.state;
        const currentPosition = positions[positions.length - 1];
        coordinate = [this.latitude, this.longitude];
        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    style={styles.map}
                    logoEnabled={false}
                >
                    <Mapbox.Camera
                        centerCoordinate={coordinate}
                        zoomLevel={18}
                    />
                </Mapbox.MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    map: {
        flex: 1
    }
});
