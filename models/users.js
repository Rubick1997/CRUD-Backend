const mongoose = require("mongoose");

const validateEmail = function (email) {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const UsersSchema = new mongoose.Schema({
	imageUri:{
		type:String,
		required:true
	},
	userName: {
		type: String,
		required: true,
	},
	userLastName: {
		type: String,
		required: true,
	},
	userEmail: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: "Email address is required",
		validate: [validateEmail, "Please fill a valid email address"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
});

const Users = mongoose.model("UsersData", UsersSchema);

module.exports = Users;
