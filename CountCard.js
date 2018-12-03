import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const Colors = require('./Colors');

export default class CountCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.eventCard}>
                <View>
                    <Text style={styles.eventName}>{this.props.ID}</Text>
                    <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                    <View style={{
                        backgroundColor: '#ffffff',
                        height: 60,
                        marginTop: 8,
                        marginBottom: 8,
                        bottom: 0
                    }}>
                        <Text style={styles.eventName}>{this.props.timestamp}</Text>
                    </View>
                    <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                    <View style={{
                        backgroundColor: '#ffffff',
                        height: 40,
                        marginTop: 8,
                        marginBottom: 8,
                        bottom: 0
                    }}>
                        <Text style={styles.eventName}>{this.props.transactionID}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
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
    eventName: {
        color: Colors.teal,
        fontSize: 20,
        paddingTop: 8,
        paddingBottom: 2,
    },

    eventCard: {
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16,
        marginRight: 8,
        marginBottom: 16,
        marginTop: 16,
        marginLeft: 8,
        elevation: 4,
        borderRadius: 4,
        width: Dimensions.get('window').width - 32,
        height: 250,
        justifyContent: 'center'
    },
});