const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const multer = require('multer');
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new MySQLStore({
	host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
	clearExpired: true,
	checkExpirationInterval: 1209600000, // 2 wekks
	expiration: 2419200000, // 4 weeks
	createDatabaseTable: false
});

const db = mysql.createConnection({
	multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) { console.error(err); return; }
	console.log(`\u001b[32mCONNECTED TO DATABASE || ${process.env.DB_NAME}\u001b[0m`);
});

app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
		cookie: {
			maxAge: 1000 * 60 * 60,
			httpOnly: true,
			sameSite: 'strict'
    	},
	})
);

app.get('/', (req, res) => {
	res.send('hello world!');
});

app.get('/debug', (req,res) => {
	req.session.ball = "test";
	res.send("helo")
	console.log(req.session);
})

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running on http://localhost:${process.env.SERVER_PORT}`);
});
