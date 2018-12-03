import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, BackHandler, ActivityIndicator, ScrollView} from 'react-native';
import Selector from "./Selector";
import api from "./Connector";
import CountCard from "./CountCard";

const Colors = require('./Colors');

export default class Count extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parties: [],
            voted: false,
            count: 0,
            page: 'Count',
            loading: true,
        };
    }

    async componentDidMount() {
        // noinspection JSCheckFunctionSignatures
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
        if (this.state.parties.length === 0) {
            api.getCount({
                onSuccess: (value) => {
                    this.setState({loading: false, parties: value});
                },
                onFailed: (error) => {
                    // noinspection JSCheckFunctionSignatures
                    console.log(error);
                }
            })
        } else {
            this.setState({loading: false})
        }
    }

    goBack = (screen) => {
        this.setState({page: screen, loading: false});
        return true;
    };

    setUser = () => {
        for (let i = 0; i < this.state.parties.length; i++) {
            if (this.props.adhaar === this.state.parties[i].ID) {
                return (
                    <View style={styles.eventCard}>
                            <View style={{
                                backgroundColor: '#ffffff',
                                height: 80,
                                marginTop: 16,
                                marginBottom: 16,
                                bottom: 0
                            }}>
                                <Text style={styles.eventName}>ID: {this.state.parties[i].ID}</Text>
                            </View>
                            <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                            <View style={{
                                backgroundColor: '#ffffff',
                                height: 80,
                                marginTop: 16,
                                marginBottom: 16,
                                bottom: 0
                            }}>
                                <Text style={styles.eventName}>Timestamp: {this.state.parties[i].timestamp}</Text>
                            </View>
                            <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                            <View style={{
                                backgroundColor: '#ffffff',
                                height: 80,
                                marginTop: 16,
                                marginBottom: 16,
                                bottom: 0
                            }}>
                                <Text style={styles.eventName}>TID: {this.state.parties[i].transactionID}</Text>
                            </View>
                            <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                            <View style={{
                                backgroundColor: '#ffffff',
                                height: 80,
                                marginTop: 16,
                                marginBottom: 16,
                                bottom: 0
                            }}>
                                <Text style={styles.eventName}>Candidate: {this.state.parties[i].CandidateVoted}</Text>
                            </View>
                    </View>
                );
            }
        }
    };

    returnCards = () => {
        let cards = [];
        for (let i = 0; i < this.state.parties.length; i++) {
            cards.push(
                <CountCard key={i}
                           ID={this.state.parties[i].ID}
                           timestamp={this.state.parties[i].timestamp}
                           transactionID={this.state.parties[i].transactionID}
                />
            )
        }
        return cards;
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    <ActivityIndicator size={'large'} color={Colors.teal}/>
                </View>
            )
        }
        else if (this.state.page === 'Count') {
            return (
                <View style={styles.container}>
                    {this.setUser()}
                    <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                    <ScrollView>
                        {this.returnCards()}
                    </ScrollView>
                </View>
            );
        }
        else if (this.state.page === 'Selector') {
            return (
                <Selector from={'App'} adhaar={this.props.adhaar}/>
            )
        }
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
        paddingTop: 16,
        paddingBottom: 2,
    },
    eventName2: {
        color: Colors.teal,
        fontSize: 12,
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
        height: 400,
        justifyContent: 'center'
    },
});