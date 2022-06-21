import { Text, Button, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import {InitialCheckout,InitiateOauth} from 'bitnob-react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowBitnob: false,
      isShowLogin:false
    }
  }

  createCheckout = () => {
    return (
      <InitialCheckout
        mode='sandbox'
        description="test108"
        callbackUrl="test108"
        successUrl=""
        notificationEmail="test@gmail.com"
        customerEmail="test@gmail.com"
        satoshis={2000}
        reference="test111"
        publicKey="pk.0331f3a.f860370f9e629806ae72e9280e05d4b9"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isShowBitnob: false })
        }}
        closeCallback={(res) => {
          this.setState({ isShowBitnob: false })
          console.log('------', res)
        }}
        successCallback={(success) => {
          console.log("----success", success)
        }}
      />
    )
  }
  Login = () => {
    return (
      <InitiateOauth
        mode='sandbox'
        clientId="daec5775a95da44e7bca"
        scope={[
      "user:custom_ln_address",
        "user:verification_level",
        "user:email",
        "user:username",
        "user:ln_address"
      ]}
        state="dddeeedfsdggs"
        redirectUrl="https://www.google.com/"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isShowLogin: false })
        }}
        closeCallback={(res) => {
          this.setState({ isShowLogin: false })
          console.log('------', res)
        }}
        successCallback={(success) => {
          console.log("----success", success)
            this.setState({ isShowLogin: false })
        }}
      />
    )
  }
  render() {
    let { isShowBitnob,isShowLogin } = this.state
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
        <StatusBar backgroundColor={'transparent'} translucent={false} />
        {
          isShowBitnob ?
            this.createCheckout()
            :
            isShowLogin ?
              this.Login()
            :
            <>
            <Button onPress={() => this.setState({ isShowBitnob: true })}
              color={'blue'}
              title="Pay"
                />
                <View style={{height:10}} ></View>
                <Button
                  onPress={() => this.setState({ isShowLogin: true })}
                  color={'blue'}
                  title="login"
              />
              </>
        }

      </SafeAreaView>
    )
  }
}