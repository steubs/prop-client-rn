import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken(
    'pk.eyJ1IjoianM5NyIsImEiOiJjandoOTRsY28wdno1NDludnRubDdyeTJlIn0.VgsUXfkp1wI93v1QP5dAbA'
);

const columbusCircleCoordinates = [
    -73.98197650909422, 40.768793007758816
];

const coordinates = [
    [-121.2953, 37.9546],
    [-73.96682739257812, 40.761560925502806],
    [-74.00751113891602, 40.746346606483826]
];

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: coordinates
        };
    }

    renderAnnotations() {
        this.map.moveTo([lng, lat])
        return (
            <Mapbox.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={columbusCircleCoordinates}>
                <View style={styles.annotationContainer}>
                    <View style={styles.annotationFill} />
                </View>
                <Mapbox.Callout title="An annotation here!" />
            </Mapbox.PointAnnotation>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    style={styles.map}
                    logoEnabled={false}>

                </Mapbox.MapView>
                <View style={styles.bubbleContainer}>
                    <View style={styles.bubble}>
                        <Text style={{ textAlign: 'center', fontSize: 22 }}>
                            {'Ride a water bike \n$2 to start, $0.30 per min'}
                        </Text>
                        <Image
                            style={styles.logo}
                            source={require('./assets/qrhands.png')}
                        />
                        <View style={styles.buttons}>
                            <View style={styles.buttonStyle}>
                                <Text style={{ fontSize: 20 }}>Scan</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15
    },
    annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'blue',
        transform: [{ scale: 0.6 }]
    },
    bubbleContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'white',
        shadowRadius: 15,
        shadowOpacity: 0.5,
        shadowColor: 'black',
        borderRadius: 12
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 15,
        fontSize: 22,
        textAlignVertical: 'center',
        alignItems: 'center'
    },
    buttons: {
        alignItems: 'center',
        paddingVertical: 0
        //justifyContent: 'space-between'
    },
    logo: {
        width: 140,
        height: 100
        //alignContent: 'center'
    },
    buttonStyle: {
        backgroundColor: 'rgba(57, 183, 249, 1)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 200,
        //shadowRadius: 5,
        //shadowOpacity: 0.2,
        //shadowColor: 'black',
        width: 200,
        alignItems: 'center'
        //borderWidth: 0.7
    },

});