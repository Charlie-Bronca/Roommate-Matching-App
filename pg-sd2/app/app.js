// Import express.js
const express = require("express");

// Create express app
var app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

/*
// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Hello world!");
});
*/

/*
// Create a route for root - /
app.get("/", function(req, res) {
    res.render("index", {'title':'My index page', 'heading':'My heading', 'paragraph_text':'This is a paragraph woohoo'});
});
*/

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

app.get("/user_profile", function(req, res) {
    res.render('user_profile');
});

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

app.get("/user_profile/:user_id", function(req, res){
    let user_id = req.params.user_id;
    let one_user_sql = "select * from users where user_id = ?"
    db.query(one_user_sql,[user_id]).then(results => {
        console.log(results)
        res.send(results)
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





/*
app.get("/all_students_pug", function(req, res) {
    var sql = 'select * from Students';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('all_students', {data: results});
    });
});
*/
/*
app.get("/single_student_pug/:id", function(req, res){
    let stID = req.params.id;
    let st_sql = "select s.name as student, ps.name as programme, ps.id as pcode\
    from Students s\
    join Student_Programme sp on sp.id = s.id\
    join Programmes ps on ps.id = sp.programme\
    where s.id = ?"
    let mod_sql = 'select * from Programme_Modules pm\
    join Modules m on m.code = pm.module\
    where programme = ?'
    db.query(st_sql,[stID]).then(results => {
        console.log(results);
        let pCode = results[0].pcode;
        let student = results[0].student
        let programme = results[0].programme
        //res.render("single_student", {'student': results[0].student, 'programme': results[0].programme});
        
        db.query(mod_sql,[pCode]).then(results => {
            console.log(results);
            res.render("single_student", {'student': student, 'programme': programme, 'data': results});
        });
        
        
        //res.render('single_student', {'student': results[0].student, 'programme': results[0].programme})
        
        //output = '';
        //output = output + '<div><b>Student: </b>' + results[0].student +'</div>';
        //output = output + '<div><b>Programme: </b>' + results[0].programme+'</div>';;
        
        //db.query(mod_sql,[pCode]).then(results => {
            //output = output + '<br><table border="1px">';
            //console.log(results);
            //for (var row of results){
                //output = output + "<tr>"
                //output = output + '<td>' + row.module + '</td>'
                //output = output + '<td>'+row.name+'</td>'
                //output = output + "</tr>"
            //}
            //output = output + "</table>";
            //res.send(output);

        //});
        
    });
});


//Task 1
app.get("/all_students", function(req,res){
    let sql = 'select * from Students';
    db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });

})

//Task 2 display a formatted list
app.get("/all_students_formatted", function(req,res){
    let sql = 'select * from Students';
    let output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results){
            output = output + "<tr>"
            output = output + '<td>' + row.id + '</td>'
            output = output + '<td><a href="./single_student/'+row.id+'">' + row.name +'</a></td>'
            output = output + "</tr>"
        }
        output = output + "</table>";
        res.send(output)
    });
})

app.get("/single_student/:id", function(req, res){
    let stID = req.params.id;
    let st_sql = "select s.name as student, ps.name as programme, ps.id as pcode\
    from Students s\
    join Student_Programme sp on sp.id = s.id\
    join Programmes ps on ps.id = sp.programme\
    where s.id = ?"
    let mod_sql = 'select * from Programme_Modules pm\
    join Modules m on m.code = pm.module\
    where programme = ?'
    db.query(st_sql,[stID]).then(results => {
        console.log(results);
        let pCode = results[0].pcode;
        output = '';
        output = output + '<div><b>Student: </b>' + results[0].student +'</div>';
        output = output + '<div><b>Programme: </b>' + results[0].programme+'</div>';;
        
        db.query(mod_sql,[pCode]).then(results => {
            output = output + '<br><table border="1px">';
            console.log(results);
            for (var row of results){
                output = output + "<tr>"
                output = output + '<td>' + row.module + '</td>'
                output = output + '<td>'+row.name+'</td>'
                output = output + "</tr>"
            }
            output = output + "</table>";
            res.send(output);

        });
    });


});


app.get("/pro_json", function(req, res) {
    let pro_sql = "select * from programmes"
    db.query(pro_sql).then(results => {
        console.log(results)
        res.json(results)
    })
});

app.get("/pro_json_formatted", function(req, res) {
    let pro_sql = "select * from programmes"
    let output = '<table border="1px">'
    db.query(pro_sql).then(results => {
        for (var row of results){
            output = output + '<tr>'
            output = output + '<td>' + row.id + '</td>'
            output = output + '<td><a href="./single_pro/'+row.id+'">' + row.name +'</a></td>'
            output = output + '</tr>'
        }
        output = output + '</table>';
        console.log(output)
        res.send(output)
    })
});


app.get("/single_pro/:id", function(req, res){
    let pro_id = req.params.id;
    let pro_page_sql = "select * from programme_modules where programme = ?"
    output = ""
    db.query(pro_page_sql,[pro_id]).then(results => {
        for (var row of results){
            output = output + row.module + '<br>'
        }
    console.log(output)
    res.send(output)
    })


});
*/
/*
// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        //console.log(typeof results)
        let string = ""
        for (let i = 0; i < results.length; i++) {
            string = string + "ID: " + results[i]["id"] + " Name: " + results[i]["name"] + "<br>"
          }

        //
        //let string = ""
        //for(var row of results){
            //string = string + "ID: " + row.id + " Name: " + row.name + "<br>"
        //}
        //
        //console.log(string)
        //res.send(string)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

*/

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});