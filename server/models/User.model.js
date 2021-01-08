const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	FullName: {
		type: String,
		required: true,
	},
	UserName: {
		type: String,
		required: true,
		unique: true,
	},
	Email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	Password: {
		type: String,
		required: true,
		default: null,
	},
	DOB: {
		type: Date,
		default: null,
	},
},
{
	timestamps: true,
});

module.exports = mongoose.model('user list', UserSchema);
