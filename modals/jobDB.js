let mongoose = require('mongoose');

let jobschema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    exp : String,
    address : String,
    pakage : Number,
    logo : String,
    deadline : {
        type: Date,
        default: Date.now
    },
    info : String,
    
    type: {
        type: String,
        default:'fulltime'
    },
    appliedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	]
        
    
});

let Job = mongoose.model('jobs',jobschema);
module.exports = Job;