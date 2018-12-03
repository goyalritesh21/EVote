import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Button} from 'react-native';

const Colors = require('./Colors');

export default class PartyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: null,
            voted: false
        };
    }

    render() {
        return (
            <View style={styles.eventCard}>
                <View>
                    <Text style={styles.eventName}>{this.props.name}</Text>
                    <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                    <View style={{
                        backgroundColor: '#ffffff',
                        height: 40,
                        alignItems: 'flex-end',
                        marginTop: 16,
                        marginBottom: 16,
                        bottom: 0
                    }}>
                        <Button style={styles.button}
                                title={'Vote for ' + this.props.name}
                                onPress={this.props.vote.bind(this, this.props.name)}
                                disabled={this.props.ButtonDisabled}/>
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
        fontSize: 30,
        paddingTop: 16,
        paddingBottom: 0,
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
        height: 200,
        justifyContent: 'center'
    },
});