let mongoose = require('mongoose');

let notifSchema = new mongoose.Schema({
    body: String,
    author: String
});

let notification = mongoose.model('notifications',notifSchema);
module.exports = notification;