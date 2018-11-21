import React from 'react';
import {StyleSheet, Text, View, BackHandler} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import FaceReco from "./FaceReco";
const Colors = require('./Colors');
const UID = '/*uid*/';
const md5 = require('md5');
export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
        page: 'App',
        adhaar : null
    };

    handleClick = (screen) => {
        this.setState({page: screen});
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
    }
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }
    
    handleBarCodeScanned = ({ type, data }) => {
        let uid = (data.split("uid=")[1]).split('"')[1];
        if(uid === null || uid === undefined){
            alert("UID not found");
            return;
        }
        this.setState({adhaar: md5(uid)});
        this.handleClick('FaceReco');
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        if(this.state.page === 'App') {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.textStyleContainer}>
                        <Text style={styles.textStyle}>Welcome to IVOTE</Text>
                        <Text style={styles.textStyle}>Scan Barcode on Adhaar Card.</Text>
                    </View>
                    <View style={{
                        flex: 2,
                        margin: 60,
                        marginBottom: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <BarCodeScanner
                            onBarCodeScanned={this.handleBarCodeScanned}
                            style={StyleSheet.absoluteFill}
                        />
                    </View>
                </View>
            );
        }
        else{
            return(
              <FaceReco from={'App'} adhaar={this.state.adhaar}/>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.teal
    }
});
