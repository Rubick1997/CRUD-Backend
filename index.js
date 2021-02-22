const express = require("express");
const mongoose = require("mongoose");
const app = express();

const UsersModel = require("./models/users");

app.use(express.json());

mongoose.connect(
	"mongodb+srv://newuser:3160375@cluster0.owchd.mongodb.net/users?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
	}
);

app.get("/", async (req, res) => {
	const users = new UsersModel({
		userName: "Zeke",
		userLastName: "Yaeger",
		userEmail: "zeke@gmail.com",
	});
	try {
		await users.save();
        res.send("inserted data")
	} catch (e) {
		console.log(e);
	}
});

app.listen(3001, () => {
	console.log("Server running on port 3001...");
});
