import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackHandler,
    ActivityIndicator,
    Button,
    Alert,
    Dimensions
} from 'react-native';
import PartyCard from "./PartyCard";
import App from "./App";

const Colors = require('./Colors');
const md5 = require('md5');
const api = require('./Connector');

export default class LoadList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'LoadList',
            voted: false,
            parties: [],
            loading: true,
        };
    }

    handleClick = async (screen) => {
        if (this.state.page === 'App') {
            BackHandler.exitApp();
            return true;
        }
        Alert.alert(
            'IVote',
            'You will lose the progess?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        for (i = 0; i < this.state.parties.length; i++) {

                        }
                        this.setState({page: screen});
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {
                        this.setState();
                    }
                }
            ]
        );
    };

    async componentDidMount() {
        // noinspection JSCheckFunctionSignatures
        BackHandler.addEventListener('hardwareBackPress', this.handleClick.bind(this, this.props.from));
        this.setState({parties: []});
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

    componentWillUnmount() {
        this.setState(initialstate);
    }

    CastVote = (party) => {
        this.setState({voted: true, party: party});
        const obj = {
            ID: this.props.adhaar,
            timestamp: Date().toString(),
            transactionID: md5(this.props.adhaar),
            CandidateVoted: party
        };
        api.castVote(obj, {
            onSuccess: (result) => {
                this.setState({voted: true});
            },
            onFailed: (error) => {
                Alert.alert('IVote', 'Check your internet connection');
                console.log(error);
            }
        })
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
                                                   this.CastVote(party);
                                                   this.setState({voted: true, party: party});
                                                   Alert.alert('IVote', 'Vote Successfully recorded for\n' + party,
                                                       [{
                                                           text: 'Thank You', onPress: () => {
                                                               //BackHandler.exitApp();
                                                           }
                                                       }]);
                                               }
                                           },
                                           {text: 'Cancel', onPress: () => this.setState({voted: false})},
                                       ],
                                       {cancelable: false}
                                   );

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
                    <Text style={styles.eventName2}>Verifying</Text>
                    <ActivityIndicator size={'large'} color={Colors.teal}/>
                </View>
            )
        }
        else if (this.state.page === 'LoadList' && this.props.adhaar !== null) {
            return (
                <View>
                    <View style={styles.eventCard}>
                        <View>
                            <Text style={styles.eventName2}>Parties in your Constituency</Text>
                            <View style={{backgroundColor: Colors.separator, height: 1,}}/>
                            <View style={{
                                backgroundColor: '#ffffff',
                                height: 20,
                                marginTop: 16,
                                marginBottom: 16,
                                bottom: 0
                            }}>
                            </View>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
                        {this.returnCards()}
                    </ScrollView>
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
        eventName2: {
            color: Colors.teal,
            fontSize: 25,
            fontWeight: 'bold',
            paddingTop: 8,
            paddingBottom: 0,
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
