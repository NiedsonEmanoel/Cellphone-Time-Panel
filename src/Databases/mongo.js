const mongoose = require('mongoose');
module.exports = {
    async Connect(link, options) {
        try {
            await mongoose.connect(link, options, (err) => {
                if (err) {
                    console.log(' - Error on MongoDB');
                } else {
                    console.log(' - MongoDB connected.')
                    mongoose.Promise = global.Promise;
                }
            });
        } catch (e) {
            console.log(' - Error on MongoDB \n'+e);
        }
    },

    async Disconnect() {
        await mongoose.disconnect();
        console.log(' - MongoDB disconnected');
    }
}