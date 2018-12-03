import React from 'react';
import {StyleSheet, Text, View, BackHandler, Button} from 'react-native';
import FaceReco from "./FaceReco";
import Count from "./Count";
import App from './App';
import api from './Connector'

const Colors = require('./Colors');
const current = Date().now;
export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Selector',
            voted: false
        };
    }

    async componentDidMount() {
        // noinspection JSCheckFunctionSignatures
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
        const user = {
            ID: this.props.adhaar
        };
        api.ifVoted(user, {
            onSuccess: (res) => {
                if (res.ACK === 'SUCCESS') {
                    this.setState({voted: true});
                }
                else {
                    this.setState({voted: false});
                }
            },
            onFailed: (error) => {
                //Alert.alert('IVote', 'Check your internet connection');
                console.log(error);
            }
        })
    }

    goBack = (screen) => {
        this.setState({page: screen});
        return true;
    };

    proceed = () => {
        this.setState({page: 'FaceReco'});
    };

    results = () => {
        this.setState({page: 'Results'});
    };

    render() {
        if (this.state.page === 'Selector') {
            return (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textStyle}>Welcome to IVote</Text>
                        <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                        <View style={{
                            backgroundColor: '#ffffff',
                            height: 40,
                            justifyContent: 'center',
                            marginTop: 16,
                            marginBottom: 16,
                            bottom: 0
                        }}>
                            <Button style={styles.button}
                                    title={'Proceed to Vote'}
                                    onPress={this.proceed}
                                    disabled={this.state.voted}
                            />
                        </View>
                        <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                        <View style={{
                            backgroundColor: '#ffffff',
                            height: 40,
                            justifyContent: 'center',
                            marginTop: 16,
                            marginBottom: 16,
                            bottom: 0
                        }}>
                            <Button style={styles.button}
                                    title={'Check Live Results'}
                                    onPress={this.results}
                            />
                        </View>
                    </View>
                </View>
            );
        }
        else if (this.state.page === 'FaceReco') {
            return (
                <FaceReco from={'Selector'} adhaar={this.props.adhaar}/>
            );
        }
        else if (this.state.page === 'Results') {

            return (
                <Count from={'Selector'} adhaar={this.props.adhaar} timestamp={Date()}/>
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
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontSize: 35,
        fontWeight: 'bold',
        color: Colors.teal
    }
});