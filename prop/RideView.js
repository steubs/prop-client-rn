import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Run from './Run';
import Mapbox from '@react-native-mapbox-gl/maps';
//import console = require('console');
Mapbox.setAccessToken(
	'pk.eyJ1IjoianM5NyIsImEiOiJjandoOTRsY28wdno1NDludnRubDdyeTJlIn0.VgsUXfkp1wI93v1QP5dAbA'
);

type AppState = {
	ready: Boolean,
	latitude: Number,
	longitude: Number
};

export default class RideView extends Component<{}, AppState> {
	state = {
		ready: false
	};
	async componentDidMount() {
		this.findCoordinates();
	}
	findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = position;
				this.setState({ ready: true });
				this.setState({ latitude: location.coords.latitude });
				this.setState({ longitude: location.coords.longitude });

			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};
	render() {
		const { ready, latitude, longitude } = this.state;
		if (ready) {
			//console.error(this.state.latitude);

			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="white" />
				</View>
			);
		}
		return <Run distance={200} {...{ latitude, longitude }} />;
	}
}

const styles = StyleSheet.create({
	container: {}
});
