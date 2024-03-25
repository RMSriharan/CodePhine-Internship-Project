// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/yourdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

// Define mongoose schema and model for user
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Express route to handle registration form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Create a new user
    const newUser = new User({
        username,
        email,
        password
    });

    // Save the user to the database
    newUser.save((err, savedUser) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error registering user');
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
