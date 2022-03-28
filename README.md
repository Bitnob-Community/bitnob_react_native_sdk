# bitnob

The sdk allows user to create bitcoin checkout invoice and pay via bitcoin using lighting or onchain bitcoin wallets like bitnob wallet or BlueWallet.

## ChangeLog

You can find the complete changelog [on this file](/ChangeLog.md).

## Install

```bash
npm i -S bitnob
```

OR

```bash
yarn add bitnob
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
import Bitnob from 'bitnob';
```


## Example
```js
import Bitnob from 'bitnob';

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
              color={'blue'}
              title="Pay"
            />
        }

      </SafeAreaView>
    )
  }
}
```

```
Note: successUrl keep blank.
```

## 📷 Screenshots

| Platform | Screenshot |
| ------------- | ------------- |
| Android | <img height="480" src="https://github.com/bitnob/bitnob_react_native_sdk/blob/main/preview/android_checkout.png"> <img height="480" src="https://github.com/bitnob/bitnob_react_native_sdk/blob/main/preview/android_payment_success.png"> <img height="480" src="https://github.com/bitnob/bitnob_react_native_sdk/blob/main/preview/android_timeout.png"> |
| iOS | <img height="414" src="https://github.com/bitnob/bitnob_react_native_sdk/blob/main/preview/ios_checkout.png"> <img height="414" src="https://github.com/bitnob/bitnob_react_native_sdk/blob/main/preview/ios_payment_success.png">  <img height="414" src="https://github.com/bitnob/bitnob_react_native_sdk/blob/main/preview/ios_timeout1.png"> |

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
