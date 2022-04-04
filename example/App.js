import { Text, Button, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import Bitnob from 'bitnob-react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowBitnob: false
    }
  }

  createCheckout = () => {
    return (
      <Bitnob
        baseUrl={"https://staging-api.flowertop.xyz"}
        description="test108"
        callbackUrl="test108"
        successUrl=""
        notificationEmail="test@gmail.com"
        customerEmail="test@gmail.com"
        satoshis={2000}
        reference="test108"
        publicKey="pk.1a593.b3b0b105da63ff7b70f3310f355ce0"
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
  render() {
    let { isShowBitnob } = this.state
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
        <StatusBar backgroundColor={'transparent'} translucent={false} />
        {
          isShowBitnob ?
            this.createCheckout()
            :
            <Button onPress={() => this.setState({ isShowBitnob: true })}
              style={styles.payButton}
              color={'blue'}
              title="Pay"
            />
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
    justifyContent: 'center'
  },
})