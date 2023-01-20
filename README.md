# bitnob-react-native

Bitnob SDK equips online businesses using react native with the ability to integrate our API features easily. Example are;
-  Checkout: Accept and process bitcoin payments via on-chain or lightning seamlessly.
-  Oauth: Allows you to access Bitnob user details
-  Transfers: Allows businesses to transfer funds to a Bitnob customer, or local mobile money and bank accounts in supported African countries

## ChangeLog

You can find the complete changelog [on this file](/ChangeLog.md).

## Install

```bash
npm i -S bitnob-react-native
```

OR

```bash
yarn add bitnob-react-native
```

## Install required dependencies

```bash
npm i -S react-native-webview
```

OR

```bash
yarn add react-native-webview
```

## Platform Support

| Android | iOS | 
| :-----: | :-: |
|   ✔️    | ✔️  |  

## ⚙️ Android Setup
    No requirement

## ⚙️ Ios Setup
    No requirement

## How to Use

```js
import {InitiateCheckout,InitiateOauth} from 'bitnob-react-native';
```

## How to get "publicKey" to use bitnob SDK?


- Create a [`Sandbox`](https://sandboxapp.bitnob.co/) or [`Production`](https://app.bitnob.co/) Account, See the keys at Setting > Developers tab, See [`Documentation`](https://docs.bitnob.com/docs/api-keys) for more.


## Checkout Example
```js
import {InitiateCheckout} from 'bitnob-react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitiateCheckout: false
    }
  }

  InitiateCheckout = () => {
    return (
      <InitiateCheckout
        mode='sandbox'
        description="test"
        callbackUrl="test"
        successUrl=""
        notificationEmail="customer@gmail.com"
        customerEmail="customer@gmail.com"
        satoshis={2000}
        reference="test116"
        publicKey="your public key"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isInitiateCheckout: false })
        }}
        closeCallback={(res) => {
          this.setState({ isInitiateCheckout: false })
          console.log('------', res)
        }}
        successCallback={(success) => {
          console.log("----success", success)
        }}
      />
    )
  }
  
  render() {
    let { isInitiateCheckout } = this.state
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
        <StatusBar backgroundColor={'transparent'} translucent={false} />
        {
          isInitiateCheckout ?
            this.InitiateCheckout()
            :
            <>
            <Button onPress={() => this.setState({ isInitiateCheckout: true })}
              color={'blue'}
              title="InitiateCheckout"
                />
              </>
        }

      </SafeAreaView>
    )
  }
}
```
```
Note: successUrl keep blank.
```


## How to get cliendID, scope, state to use bitnob OAuth?

- From your dashboard, create an App in Settings > Developers > Oauth apps to get them, See more in our [`OAuth Documentation`](https://docs.bitnob.com/docs/bitnob-for-business-oauth-20).


## OAuth Example
```js
import {InitiateOauth} from 'bitnob-react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitiateOauth:false
    }
  }

 
  InitiateOauth = () => {
    return (
      <InitiateOauth
        mode='sandbox'
        clientId="your clientId"
        scope={[
      "user:custom_ln_address",
        "user:verification_level",
        "user:email",
        "user:username",
        "user:ln_address"
      ]}
        state="test"
        redirectUrl="your redirect url"
        failCallback={(fail) => {
          console.log("------fail", fail)
          this.setState({ isInitiateOauth: false })
        }}
        closeCallback={(res) => {
          this.setState({ isInitiateOauth: false })
          console.log('------', res)
        }}
        successCallback={(success) => {
          console.log("----success", success)
            this.setState({ isInitiateOauth: false })
        }}
      />
    )
  }
  render() {
    let {isInitiateOauth } = this.state
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
        <StatusBar backgroundColor={'transparent'} translucent={false} />
        {
            isInitiateOauth ?
              this.InitiateOauth()
            :
            <>
                <Button
                  onPress={() => this.setState({ isInitiateOauth: true })}
                  color={'blue'}
                  title="InitiateOauth"
              />
              </>
        }

      </SafeAreaView>
    )
  }
}

```

## Transfer Example
```js
import {BitnobTransfer} from 'bitnob-react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBitnobTransfer:false
    }
  }

 
  BitnobTransfer = () => {
    return (
      <BitnobTransfer
        mode='sandbox'
        senderName="sender Name"
        publicKey="your public key"
        redirectUrl="your redirect url"
        closeCallback={(res) => {
          console.log('------', res)
          this.setState({ isBitnobTransfer: false })
        }}
        successCallback={(success) => {
          console.log("----success", success)
          this.setState({ isBitnobTransfer: false })
        }}
      />
    )
  }
  render() {
    let {isBitnobTransfer } = this.state
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }} >
        <StatusBar backgroundColor={'transparent'} translucent={false} />
        {
            isBitnobTransfer ?
              this.BitnobTransfer()
            :
            <>
                <Button
                  onPress={() => this.setState({ isBitnobTransfer: true })}
                  color={'blue'}
                  title="BitnobTransfer"
              />
              </>
        }

      </SafeAreaView>
    )
  }
}

```

## 📷 Checkout Screenshots

| Platform | Screenshot |
| ------------- | ------------- |
| Android | <img height="480" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/android_checkout.png"> <img height="480" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/android_payment_success.png"> <img height="480" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/android_timeout.png"> |
| iOS | <img height="414" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/ios_checkout.png"> <img height="414" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/ios_payment_success.png">  <img height="414" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/ios_timeout1.png"> |


## 📷 OAuth Screenshots

| Platform | Screenshot |
| ------------- | ------------- |
| Android | <img height="480" src="https://js.bitnob.co/assets/android_oauth.png"> <img height="480" src="https://js.bitnob.co/assets/android_oauth_authorize.png"> |
| iOS | <img height="414" src="https://www.js.bitnob.co/assets/ios_oauth.PNG"> <img height="414" src="https://www.js.bitnob.co/assets/ios_oauth_authorize.PNG"> |


## 📷 Transfer Screenshots

| Platform | Screenshot |
| ------------- | ------------- |
| Android | <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/android/1.png"> <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/android/2.png"> <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/android/3.png"> <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/android/4.png"> |
| iOS | <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/ios/1.png"> <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/ios/2.png"> <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/ios/3.png"> <img height="480" src="https://www.js.bitnob.co/assets/transfers_sdk/ios/4.png"> |


# License
```
MIT License

Copyright (c) 2022 bitnob

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
