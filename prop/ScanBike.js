import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
class ScanBike extends Component {

    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];

        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
                barcodeFinderVisible: true
            },
            apiResp: {},
        };
    }

    async onBarCodeRead(scanResult) {
        if (scanResult.data != null) {
            const path = "/bikes/object/" + "stockton";
            try {
                const apiResponse = await API.get("propapi10", path);
                //console.error("response from getting note: " + JSON.stringify(apiResponse.bikes.bike_1));
                this.setState({
                    apiResp: apiResponse
                });
                let bike_json = this.state.apiResp.bikes;
                //console.error(JSON.stringify(bike_json.bike_2));
                //console.error(JSON.stringify(bike_json[bike_1]));
                let bikes = [];
                for (var bike in bike_json) {
                    //console.error(JSON.stringify(bike_json[bike]));
                    let bike_n = bike_json[bike];
                    //console.warn(JSON.stringify(bike_n));
                    let bike_link = bike_n.link;
                    if(bike_link == scanResult.data){
                        console.error("asf");
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
        return;
    }

    async takePicture() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    }

    pendingView() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'lightgreen',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Waiting</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    captureAudio={false}
                    barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                    barcodeFinderWidth={280}
                    barcodeFinderHeight={220}
                    barcodeFinderBorderColor="white"
                    barcodeFinderBorderWidth={2}
                    defaultTouchToFocus
                    flashMode={this.state.camera.flashMode}
                    mirrorImage={false}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    onFocusChanged={() => { }}
                    onZoomChanged={() => { }}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    style={styles.preview}
                    type={this.state.camera.type}
                />
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <Button
                        onPress={() => { console.log('scan clicked'); }}
                        style={styles.enterBarcodeManualButton}
                        title="Back"
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    scanScreenMessage: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default ScanBike;