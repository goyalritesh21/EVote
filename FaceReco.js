import React from 'react';
import {Button, View, BackHandler, StyleSheet, ActivityIndicator} from 'react-native';
import App from './App';
import {Permissions, ImagePicker} from 'expo';

const Colors = require('./Colors');

export default class FaceReco extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'FaceReco',
            otpVerified: false,
            statusCamera: null,
            statusCameraRoll: null,
            hasCameraPermission: null,
            FaceDetected: false,
            Captured: false,
            uploading: false,
        }
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
    }

    async componentWillMount() {

    }

    goBack = (screen) => {
        this.setState({page: screen});
        return true;
    };

    _handlePermissions = async () => {
        let {statusCamera} = await Permissions.askAsync(Permissions.CAMERA);
        let {statusCameraRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(statusCamera !== 'granted' || statusCameraRoll !== 'granted' ){
            alert("Permissions Required!");
            await setTimeout(this._handlePermissions, 500);
        }
        else{
            this.setState({hasCameraPermission: true});
        }
    };

    snap = async () => {
        await this._handlePermissions;
        let img = await ImagePicker.launchCameraAsync({});
        this.setState({tokenImage: img});
        await this._handleImagePicked(img);
    };

    _handleImagePicked = async (pickerResult) => {
        let uploadResponse, uploadResult;
        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();

                this.setState({
                    image: uploadResult.location
                });
            }
        } catch (e) {
            console.log({uploadResponse});
            console.log({uploadResult});
            console.log({e});
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };


    render() {
        if (this.state.page === 'FaceReco' && !this.state.uploading) {
            return (
                <View style={styles.container}>
                    <Button title={'Launch Security Check'} onPress={this.snap}/>
                </View>
            );
        }
        else if ( this.state.page === 'FaceReco' && this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            );
        }
        else if (this.state.page === 'Vote') {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            );
        }
        else {
            return (
                <App/>
            );
        }
    }

}

async function uploadImageAsync(uri) {
    let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        textShadowOffset: {
            width: 2,
            height: 2,
        },
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.teal
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },

});