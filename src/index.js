import { View, Image, TouchableOpacity, ActivityIndicator, Modal, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { _apiCallForCheckPaymentStatus, _apicallForPayMent } from './utils/APIs'
import WebView from 'react-native-webview'

export default class bitnob extends Component {
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
        const { baseUrl, description, callbackUrl, successUrl, notificationEmail, customerEmail, satoshis, reference, publicKey, } = this.props
        _apicallForPayMent(baseUrl, description, callbackUrl, successUrl, notificationEmail, customerEmail, satoshis, reference, publicKey,
            (error) => {
                this.setState({ isPreviewLink: false, loader: false })
                this.props.failCallback(error)
            },
            (res) => {
                if (res) {
                    this.setState({ isPreviewLink: true, })
                    // this.props.webViewcallback(res)
                    this.setState({ previewLink: res?.data?.previewLink, loader: false })
                    this._apiCallForCheckPayment(res?.data?.id)
                }
            }
        )
    }
    _apiCallForCheckPayment = (id) => {
        const { baseUrl } = this.props
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
                        <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20,marginTop:10 }} onPress={() => this.props.webViewcallback('close call')} >
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