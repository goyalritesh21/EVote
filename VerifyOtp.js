import React from 'react';
import {Text, TextInput, View, BackHandler, TouchableOpacity, KeyboardAvoidingView, StyleSheet} from 'react-native';
import App from './App';

const Colors = require('./Colors');

export default class VerifyOtp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'VerifyOtp',
            otpVerified: false,
        }
    }

    componentDidMount() {
        // noinspection JSCheckFunctionSignatures
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
    }

    goBack = (screen) => {
        this.setState({page: screen});
        return true;
    };

    verify = () => {
        this.setState({otpVerified: true});
    };

    render() {
        if (this.state.page === 'VerifyOtp') {
            return (
                <View style={styles.container}>
                    {/*<View style={styles.loginContainer}>*/}
                    {/*<Image resizeMode="contain" style={styles.logo} source={require('./assets/Logo.jpeg')}/>*/}
                    {/*</View>*/}
                    <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
                        <TextInput style={styles.input}
                                   onChangeText={(otp) => this.setState({otp})}
                                   autoCorrect={false}
                                   keyboardType='phone-pad'
                                   returnKeyType="go"
                                   placeholder='OTP'
                                   placeholderTextColor='rgba(20,20,20,0.7)'/>
                        <TouchableOpacity style={styles.MobileButtonContainer}
                                          onPress={this.verify}>
                            <Text style={styles.buttonText}> Verify OTP </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
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
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.teal
    }
});