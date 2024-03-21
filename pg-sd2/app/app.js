// Import express.js
const express = require("express");

// Create express app
var app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add static files location for images
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    // Set up an array of data
    var test_data = ['one', 'two', 'three', 'four'];
    // Send the array through to the template as a variable called data
    res.render("index", {'title':'My index page', 'heading':'My heading', 'data':test_data});
});


app.get("/flat_buddies_test", function(req, res) {
    var sql = 'select * from users';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('flat_buddies_test', {data: results});
    });
});


app.get("/homepage", function(req, res) {
        res.render('homepage');
});

app.get("/questionnaire", function(req, res) {
    res.render('questionnaire');
});


app.get("/user_profile/56789", function(req, res) {
    var sql = 'SELECT * FROM users JOIN preferences ON users.user_id = preferences.user_id WHERE users.user_id = 27476';
    //var sql = 'select * from users where user_id = 56789';

    db.query(sql).then(results => {
        /*const dataWithAge = results.map(row => {
            const dob = row.dob; 
            const age = calculateAge(dob); 
            return { firstName: row.first_name, age };
        });*/
        console.log(results)
        res.render('user_profile', {data: results});
    });
});



/*
function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const dobMonth = dobDate.getMonth();
    const currentMonth = currentDate.getMonth();
    if (currentMonth < dobMonth || (currentMonth === dobMonth && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }
    return age;
}*/

app.get("/profiles", function(req, res) {
    var sql = 'select * from users';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('profiles', {data: results});
    });
});

app.get("/chat", function(req, res) {
    res.render('chat');
});

app.get("/login", function(req, res) {
    res.render('login');
});

app.get("/user_profile/test/:user_id", function(req, res){
    let user_id = req.params.user_id;
    let one_user_sql = "select * from users where user_id = ?"
    var one_sql = 'SELECT * FROM users JOIN preferences ON users.user_id = preferences.user_id WHERE users.user_id = ?';

    db.query(one_sql,[user_id]).then(results => {
        console.log(results)
        res.render('user_profile', {data: results});
        //res.render("single_student", {'data': results});
    })
});

app.get("/homepage_test", function(req, res) {
    res.render('homepage_test');
});


app.get("/chat_test", function(req, res) {
    res.render('chat_test');
});

app.get("/reviews", function(req, res) {
    res.render('reviews');
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});