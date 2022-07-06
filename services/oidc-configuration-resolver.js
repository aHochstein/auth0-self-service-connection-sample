const axios = require('axios').default

const resolveOIDCSettings = async(configUrl) => {
    try {
        var config = await axios.get(configUrl)

        return {
            issuer: config.data.issuer,
            authorization_endpoint : config.data.authorization_endpoint,
            jwks_uri : config.data.jwks_uri
        }
    }
    catch(e) {
        return {}
    }
}

module.exports = resolveOIDCSettings