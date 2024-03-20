const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/final-project');

const User = require('./models/user_schema');
const Budget = require('./models/budget_schema');

app.use(cors());
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

const secretKey = 'Unbreakable Key';
const jwtMW = expressjwt({
    secret: secretKey,
    algorithms: ['HS256']
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            let token = jwt.sign({ id: user._id, username: user.username}, secretKey, { expiresIn: '5000'});
            res.json({
                success: true,
                err: null,
                token
            });
        } else {
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or Password is incorrect'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            token: null,
            err: 'Internal server error'
        });
    }
});

app.get('/api/dashboard', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true,
        myContent: 'Secret content that only logged in people can see.'
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
