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
	const imageUri = req.body.imageUri

	const users = new UsersModel({
		userName: firstName,
		userLastName: lastName,
		userEmail: email,
		imageUri:imageUri
	});
	try {
		await users.save();
		res.send("inserted data");
	} catch (e) {
		console.log(e);
	}
});

app.get("/read", async (req, res) => {
	UsersModel.find({}, (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
});

app.put("/update", async (req, res) => {
	const newEmail = req.body.newUserEmail;
	const id = req.body.id;

	try {
		await UsersModel.findById(id, (err, updatedItem) => {
			updatedItem.userEmail = newEmail;
			updatedItem.save();
			res.send("update");
		});
	} catch (err) {
		console.log(err);
	}
});

app.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;
	await UsersModel.findByIdAndRemove(id).exec();
	res.send("deleted")
});
app.listen(3001, () => {
	console.log("Server running on port 3001...");
});
