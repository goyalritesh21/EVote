import React from 'react';
import {StyleSheet, Text, View, BackHandler, ActivityIndicator} from 'react-native';
const Colors = require('./Colors');
const md5 = require('md5');

export default class Vote extends React.Component {
    state = {
        page: 'Vote',
    };

    handleClick = (screen) => {
        this.setState({page: screen});
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
    }

    render() {
        if(this.state.page === 'Vote' && this.props.adhaar !== null) {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.textStyleContainer}>
                        <Text style={styles.textStyle}>Welcome to IVOTE</Text>
                        <Text style={styles.textStyle}>Adhaar Card with id = {this.props.id} verified.</Text>
                    </View>
                </View>
            );
        }
        else{
            return(
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color={Colors.teal} size="large"/>
                </View>
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
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
});
