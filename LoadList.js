import React from 'react';
import {StyleSheet, Text, View, ScrollView, BackHandler, ActivityIndicator, Button, Alert} from 'react-native';
import PartyCard from "./PartyCard";

const Colors = require('./Colors');
const md5 = require('md5');
const api = require('./Connector');

export default class LoadList extends React.Component {
    state = {
        page: 'LoadList',
        voted: false,
        parties: [],
        loading: true,
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
        if (this.state.parties.length === 0) {
            api.getActivities({
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

    vote = () => {
        this.setState({voted: true});
    };
    returnCards = () => {
        let cards = [];
        for (let i = 0; i < this.state.parties.length; i++) {
            cards.push(
                <PartyCard key={i}
                           name={this.state.parties[i]}
                           voted={this.state.voted}
                           vote={
                               (party) => {
                                   Alert.alert(
                                       'IVote',
                                       'Are you sure, you want to vote for\n' + party,
                                       [
                                           {
                                               text: 'Yes', onPress: () => {
                                                   this.setState({voted: true, party: party});
                                                   Alert.alert('IVote', 'Vote Successfully recorded for\n' + party,
                                                       [{
                                                           text: 'Thank You', onPress: () => {
                                                               BackHandler.exitApp();
                                                           }
                                                       }]);
                                               }
                                           },
                                           {text: 'Cancel', onPress: () => this.setState({voted: false})},
                                       ],
                                       {cancelable: false}
                                   );
                                   this.setState({voted: true, party: party});
                               }
                           }
                               ButtonDisabled={this.state.voted}
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
            else if (this.state.page === 'LoadList' && this.props.adhaar !== null) {
            return (
            <View>
            <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
            {this.returnCards()}
            </ScrollView>
            </View>
            );
        }
            else {
            return (
            <View
            style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
            <ActivityIndicator color={Colors.teal} size="large"/>
            </View>
            );
        }
        }
        }

        const
        styles = StyleSheet.create({
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
