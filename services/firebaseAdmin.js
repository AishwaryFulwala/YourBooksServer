const admin = require("firebase-admin");

const MONGO_URL = process.env.MONGO_URL;
const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: MONGO_URL
});

module.exports.admin = admin;