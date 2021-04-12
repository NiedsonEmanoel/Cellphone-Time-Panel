const mongoose = require('mongoose');
module.exports = {
    async Connect(link) {
        try {
            await mongoose.connect(link, {
                autoReconnect: true,
                useCreateIndex: true,
                useFindAndModify: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }, (err) => {
                if (err) {
                    console.log(' - Error on MongoDB');
                } else {
                    console.log(' - MongoDB connected.')
                    mongoose.Promise = global.Promise;
                }
            });
        } catch (e) {
            console.log(' - Error on MongoDB');
        }
    },

    async Disconnect() {
        await mongoose.disconnect();
        console.log(' - MongoDB disconnected');
    }
}