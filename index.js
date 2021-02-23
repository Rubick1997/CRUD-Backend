const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const UsersModel = require("./models/users");

app.use(express.json());
app.use(cors());

mongoose.connect(
	"mongodb+srv://newuser:3160375@cluster0.owchd.mongodb.net/users?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
	}
);

app.post("/insert", async (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const users = new UsersModel({
		userName: firstName,
		userLastName: lastName,
		userEmail: email,
	});
	try {
		await users.save();
		res.send("inserted data");
	} catch (e) {
		console.log(e);
	}
});

app.listen(3001, () => {
	console.log("Server running on port 3001...");
});
