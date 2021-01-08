const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
	Title: {
		type: String,
		required: true,
	},
	Description: {
		type: String,
		required: true,
	},
	AuthorID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	Tags: [String],
},
{
	timestamps: true,
});

module.exports = mongoose.model('blog list', BlogSchema);
