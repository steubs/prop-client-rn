import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import Run from './Run';

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
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === 'granted') {
			const {
				coords: { latitude, longitude }
			} = await Location.getCurrentPositionAsync();
		} else {
			alert("Couldn't get your location");
		}
	}

	render() {
		const { ready, latitude, longitude } = this.state;
		if (ready) {
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
