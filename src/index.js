import { View, Image, TouchableOpacity, ActivityIndicator, Modal, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { _apiCallForCheckPaymentStatus, _apicallForPayMent } from './utils/APIs'
import WebView from 'react-native-webview'

class InitiateCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewLink: "",
            isPreviewLink: true,
            loader: false
        }
    }
    componentDidMount = () => {
        this.setState({ loader: true })
        const { mode, description, callbackUrl, successUrl, notificationEmail, customerEmail, satoshis, reference, publicKey, } = this.props

        let baseUrl=mode=='sandbox'?'https://sandboxapi.bitnob.co':'https://api.bitnob.co'
        
        _apicallForPayMent(baseUrl, description, callbackUrl, successUrl, notificationEmail, customerEmail, satoshis, reference, publicKey,
            (error) => {
                this.setState({ isPreviewLink: false, loader: false })
                this.props.failCallback(error)
            },
            (res) => {
                if (res) {
                    this.setState({ isPreviewLink: true, })
                    this.setState({ previewLink: res?.data?.previewLink, loader: false })
                    this._apiCallForCheckPayment(res?.data?.id)
                }
            }
        )
    }
    _apiCallForCheckPayment = (id) => {
        const { mode } = this.props
        let baseUrl=mode=='sandbox'?'https://sandboxapi.bitnob.co':'https://api.bitnob.co'
        let myInterval = setInterval(() => {
            if (this.state.isPreviewLink) {
                _apiCallForCheckPaymentStatus(baseUrl, id, (res) => {
                    if (res?.status) {
                        if (res?.data?.status == 'paid') {
                            this.setState({ isPreviewLink: false })
                            clearInterval(myInterval);
                            this.props.successCallback(res)
                        }
                    }
                })
            } else {
                clearInterval(myInterval);
            }
        }, 5000)
    }

    render() {
        return (
            <Modal visible={true} animationType={'slide'} style={{ flex: 1, justifyContent: 'center' }} >
                {this.state.loader ?
                    <View style={{ flex: 1, justifyContent: 'center' }} >
                        <ActivityIndicator size="large" color="#0000ff" style={{ alignSelf: 'center' }} />
                    </View>
                    :
                    <SafeAreaView style={{ flex: 1 }} >
                        <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20,marginTop:10 }} onPress={() => this.props.closeCallback('close call')} >
                            <Image source={require('./helper/close.png')} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        <WebView source={{ uri: this.state.previewLink }}
                            style={{ flex: 1 }}
                            scalesPageToFit={false}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />
                    </SafeAreaView>
                }
            </Modal>
        )
    }
}

class InitiateOauth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewLink: "",
            isPreviewLink: true,
            loader: false,
        }
    }
    componentDidMount = () => {
        this.setState({ loader: true })
        const { mode, scope, callbackUrl, successUrl, clientId, redirectUrl, state } = this.props
        let finalScope=scope.join(" ")
        finalScope = encodeURIComponent (finalScope)
       let baseUrl=mode=='sandbox'?'https://sandbox-oauth.bitnob.co':'https://oauth.bitnob.co'

        var url=`${baseUrl}/login?scope=${finalScope}&clientId=${clientId}&redirectUrl=${redirectUrl}&state=${state}`

        
       this.setState({previewLink:url,loader:false})
    }
    

    onNavigationStateChange = (webViewState) => {
        if (webViewState.url.includes("?error=")) {

            let regex = /[?&]([^=#]+)=([^&#]*)/g,
              params = {},
              match
            while ((match = regex.exec(webViewState.url))) {
              params[match[1]] = match[2]
            }
            const { error } = params

            this.props.failCallback(params['error'])

        } else if (webViewState.url.includes(this.props.redirectUrl) && !webViewState.url.includes("redirectUrl")) {
            this.props.successCallback("success")
        }
  };


    render() {
        return (
            <Modal visible={true} animationType={'slide'} style={{ flex: 1, justifyContent: 'center' }} >
                {this.state.loader ?
                    <View style={{ flex: 1, justifyContent: 'center' }} >
                        <ActivityIndicator size="large" color="#0000ff" style={{ alignSelf: 'center' }} />
                    </View>
                    :
                    <SafeAreaView style={{ flex: 1 }} >
                        <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20,marginTop:10 }} onPress={() => this.props.closeCallback('close call')} >
                            <Image source={require('./helper/close.png')} resizeMode={'contain'} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                        <WebView
                            source={{ uri: this.state.previewLink }}
                            style={{ flex: 1 }}
                            scalesPageToFit={false}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            onNavigationStateChange={this.onNavigationStateChange}
                        />
                    </SafeAreaView>
                }
            </Modal>
        )
    }
}

export { InitiateCheckout,InitiateOauth };