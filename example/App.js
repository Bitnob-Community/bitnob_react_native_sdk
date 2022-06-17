import { Text, Button, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import {Bitnob,InitiateOauth} from 'bitnob-react-native';

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
      <Bitnob
        baseUrl={"your base url"}
        description="test108"
        callbackUrl="test108"
        successUrl=""
        notificationEmail="test@gmail.com"
        customerEmail="test@gmail.com"
        satoshis={2000}
        reference="test108"
        publicKey="your public key"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isShowBitnob: false })
        }}
        webViewcallback={(res) => {
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
        baseUrl={"https://staging-oauth.bitnob.co"}
        clientId="fe2b4768b3c5afdb27b2"
        scope="user:ln_address"
        state="dddeee"
        redirectUrl="https://www.google.com/"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isShowLogin: false })
        }}
        webViewcallback={(res) => {
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
              style={styles.payButton}
              color={'blue'}
              title="Pay"
                />
                <View style={{height:10}} ></View>
                <Button
                  onPress={() => this.setState({ isShowLogin: true })}
                  style={styles.payButton}
                  color={'blue'}
                  title="login"
              />
              </>
        }

      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  payButton: {
    height: 40,
    width: '20%',
    borderRadius: 5,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
  },
})