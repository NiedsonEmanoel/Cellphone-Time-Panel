module.exports = {
    main: require('./Main'),
    api: require('./Api'),
    webhooks: require('./Webhooks'),
    listeners: {
        "notFound" : require('./404'),
        "error": require('./Error')
    }
}