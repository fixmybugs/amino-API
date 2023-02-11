

export default {
    webSocket: (signbody, version) => `wss://ws${version}.narvii.com/?signbody=${signbody}`
}