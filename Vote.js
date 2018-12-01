import React from 'react';
import {StyleSheet, Text, View, BackHandler, ActivityIndicator, Button} from 'react-native';
import LoadList from './LoadList';

import Colors from "./Colors";

export default class Vote extends React.Component {
    state = {
        page: 'Vote',
    };

    handleClick = (screen) => {
        this.setState({page: screen});
    };

    componentDidMount() {
        // noinspection JSCheckFunctionSignatures
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
            return true;
        });
    }

    render() {
        if (this.state.page === 'Vote' && this.props.adhaar !== null) {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.textStyleContainer}>
                        <View>
                            <Text style={styles.textStyle}>Welcome to IVOTE</Text>
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
                                        onPress={this.handleClick.bind(this, 'LoadList')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        else if (this.state.page === 'LoadList') {
            return (
                <LoadList adhaar={this.props.adhaar} verified={true}/>
            )
        }
        else {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
                    <ActivityIndicator color={Colors.teal} size="large" activities={null}/>
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
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontSize: 35,
        fontWeight: 'bold',
        color: Colors.teal
    },
    button: {
        height: 40,
        color: Colors.teal,
        width: 120,
        right: 0,
        backgroundColor: Colors.teal,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
});
