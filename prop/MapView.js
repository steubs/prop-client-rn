import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, Image } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

Mapbox.setAccessToken(
    'pk.eyJ1IjoianM5NyIsImEiOiJjandoOTRsY28wdno1NDludnRubDdyeTJlIn0.VgsUXfkp1wI93v1QP5dAbA'
);

//const bikeList = [[-121.2953, 37.9546], [-121.2955, 37.9546], [-121.2953, 37.9548]];
const coordinate = [-121.2953, 37.9546];

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResp: {},
            bikeList: [],
        };
    }
    async componentDidMount() {
        this.getBike();
    }
    async getBike() {
        const path = "/items/object/" + "stockton";
        try {
            const apiResponse = await API.get("propApiTest2", path);
            console.error("response from getting note: " + apiResponse);
            //this.setState(apiResp: apiResponse);

        } catch (e) {
            console.log(e);
        }
    }
    handleChangeBikeId = (id) => {
        this.setState({ bikeId: id });
    }

    renderBikeList(bikeList) {
        let bike_json = this.state.apiResp.bikes;
        for (let bike in bike_json) {
            this.state.bikesList.push([bike.coord_x, bike.coord_y]);
            //console.error(bike.coord_x);
        }
        return bikeList.map((bikeCoordinate) => {
            return (
                <Mapbox.PointAnnotation
                    coordinate={bikeCoordinate}>
                </Mapbox.PointAnnotation>
            );
        });
    }

    render() {
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
                    {this.renderBikeList(this.state.bikeList)}
                </Mapbox.MapView>
                <View style={styles.bubbleContainer}>
                    <View style={styles.bubble}>
                        <Text style={{ textAlign: 'center', fontSize: 19 }}>
                            {'Ride a water bike \n$2 to start, $0.30 per min'}
                        </Text>
                        <Image
                            style={styles.logo}
                            source={require('./assets/qrhands.png')}
                        />
                        <View style={styles.buttons}>
                            <View style={styles.buttonStyle}>
                                <Button
                                    title="Scan"
                                    onPress={() => this.props.navigation.navigate('ScanBike')}
                                    color="white"
                                />
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
        width: 120,
        height: 80
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