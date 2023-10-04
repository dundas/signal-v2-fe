const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports.dbConnect = () => {
    let isConnected;
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');

    return mongoose.connect(process.env.MONGO_CONN)
        .then(db => {
            isConnected = db.connections[0].readyState;
            console.log("CONNECTED: ", isConnected)
        });
};

module.exports.dbHangUp = () => {
    return (async () => {     
        await mongoose.disconnect()
        console.log("CONNECTION CLOSED.")
    })()
}

