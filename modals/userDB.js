// let mongoose = require('mongoose');
// let passportLocalMongoose = require('passport-local-mongoose');

// let userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     },
//     selected: {
//         type: Boolean,
//         default: false
//     }
// });


// userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
// let user = mongoose.model('user',userSchema);

// module.exports = user;

//

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    cgpa: Number,
	username: {
		type: String,
		required: true,
		unique: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	selected: {
		type: Boolean,
		default: false
	}
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
let user = mongoose.model('user', userSchema);
module.exports = user;