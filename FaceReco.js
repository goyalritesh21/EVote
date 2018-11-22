import React from 'react';
import {Button, View, BackHandler, StyleSheet, ActivityIndicator} from 'react-native';
import App from './App'
import {Permissions, ImagePicker} from 'expo';
import axios from 'axios';
import Vote from './Vote';

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
        if (statusCamera !== 'granted' || statusCameraRoll !== 'granted') {
            alert("Permissions Required!");
            await setTimeout(this._handlePermissions, 500);
        }
        else {
            this.setState({hasCameraPermission: true});
        }
    };

    snap = async () => {
        this.setState({uploading: true});
        await this._handlePermissions;
        let img = await ImagePicker.launchCameraAsync({});
        //console.log(img);
        this.setState({tokenImage: img});
        await this._handleImagePicked(img);
    };

    _handleImagePicked = async (pickerResult) => {
        let uploadResult;
        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                //alert(pickerResult.uri);
                uploadResult = await this.uploadImageAsync(pickerResult, this.props.adhaar);
                //console.log("Printed");
                console.log(uploadResult);
                if (uploadResult.ACK !== 'SUCCESS') {
                    alert('Upload failed, sorry')
                }
                else {
                    //alert(uploadResult.id);
                    this.setState({image: uploadResult.ACK, page: 'Vote', id: uploadResult.id});
                }
            }
        } catch (e) {
            //console.log({uploadResponse});
            //console.log({uploadResult});
            console.log({e});
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };

    uploadImageAsync = async (photo, photoName, config) => {
        let apiUrl = 'http://172.31.75.200:8000/upload';
        let uriParts = photo.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('file', {
            uri: photo.uri,
            name: `${photoName}.${fileType}`,
            type: `image/${fileType}`,
        });
        return axios.post(apiUrl, formData)
            .then(response => {return response.data})
            .catch(e => {
                console.log(e)
            })

    };


    render() {
        if (this.state.page === 'FaceReco' && !this.state.uploading) {
            return (
                <View style={styles.container}>
                    <Button title={'Launch Security Check'} onPress={this.snap}/>
                </View>
            );
        }
        else if (this.state.page === 'FaceReco' && this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color="#fff" size="large"/>
                </View>
            );
        }
        else if (this.state.page === 'Vote' && this.state.image === 'SUCCESS') {
            return (
                <Vote adhaar={this.props.adhaar} id={this.state.id}/>
            );
        }
        else {
            return (
                <App/>
            );
        }
    }

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