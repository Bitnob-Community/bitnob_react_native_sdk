# bitnob-react-native

This SDK equips online businesses using react native with the ability to accept and process bitcoin payments via on-chain or lightning seamlessly.

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
    No any requirement

## ⚙️ Ios Setup
    No any requirement

## How to Use

```js
import {InitialCheckout,InitiateOauth} from 'bitnob-react-native';
```


## InitialCheckout
```js
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
```

```
Note: successUrl keep blank.
```

## How to get "publicKey" to use bitnob-react-native?

- Please [`Sign up`](https://app.bitnob.co/accounts/signup) here, Then follow this [`link`](https://docs.bitnob.com/docs/api-keys) to get publicKey.

## 📷 Screenshots

| Platform | Screenshot |
| ------------- | ------------- |
| Android | <img height="480" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/android_checkout.png"> <img height="480" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/android_payment_success.png"> <img height="480" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/android_timeout.png"> |
| iOS | <img height="414" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/ios_checkout.png"> <img height="414" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/ios_payment_success.png">  <img height="414" src="https://bitnobwhmcsplugin.s3.eu-west-2.amazonaws.com/images/ios_timeout1.png"> |

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
