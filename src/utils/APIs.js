const _apicallForPayMent = async (baseUrl, description, callbackUrl, successUrl, notificationEmail, customerEmail, satoshis, reference, publicKey, errorCallback, callback) => {
    var url = `${baseUrl}/api/v1/checkout-inline?description=${description}&callbackUrl=${callbackUrl}&successUrl=${successUrl}&notificationEmail=${notificationEmail}&customerEmail=${customerEmail}&satoshis=${satoshis}&reference=${reference}&publicKey=${publicKey}`

    await fetch(url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },

    }).then((response) => response.json())
        .then((response) => {
            if (response?.status) {
                return callback(response)
            } else {
                return errorCallback(response)
            }
        })
        .catch(async (error) => {
            return errorCallback(error)
        });

}

const _apiCallForCheckPaymentStatus = async (baseUrl, id, callback) => {
    var url = `${baseUrl}/api/v1/checkout-inline/status/${id}`

    await fetch(url, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },

    }).then((response) => response.json())
        .then((response) => {
            if (response?.status) {
                return callback(response)
            } else {
                return callback(response)
            }
        })
        .catch(async (error) => {
            return errorCallback(error)
        });

}


export {
    _apiCallForCheckPaymentStatus,
    _apicallForPayMent,
}