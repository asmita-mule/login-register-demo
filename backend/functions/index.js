const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const functions = require('firebase-functions');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Asmita123:Asmita123@cluster0.qgu6jgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000
}).then(() => {
    console.log("connected !!!");
}).catch((err) => {
    console.error("Error in connection: ", err.message);
});

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

// API Routes
app.post('/register', async (req, res, next) => {
    try {
        const { name, dob, email, password } = req.body;

        if (!name || !dob || !email || !password) {
            return res.status(500).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, dob, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.status(201).json({ token, name, dob, email });
    } catch (error) {
        next(error);
    }
});

app.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token, name: user.name, dob: user.dob, email: user.email });
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);



exports.demoApi = functions.https.onRequest(app);

// app.listen(5500, () => {
//     console.log('Server is running on port 5000');
// });