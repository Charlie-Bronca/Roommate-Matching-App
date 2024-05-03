// Import express.js
const express = require("express");

// Create express app
var app = express();

// Use the Pug templating engine
app.set("view engine", "pug");
app.set("views", "./app/views");

// Add static files location for images
app.use(express.static("static"));

//Tanya originally had this commented out because we were not using it
//Hannan without the bodyparser my questionnaire form is not getting the data in body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Code below can be used if we are not using an HTML form to submit
//app.use(express.json());

// Get the functions in the db.js file to use
const db = require("./services/db");

//Get User Class
const { User2 } = require("./models/user2");

//Get Profile Class
const { Profile } = require("./models/profile");

//Get Chat Class
const { Chat } = require("./models/chat");

//Get Review Class
const { Review } = require("./models/review");

//Define the session parameters
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  saveUninitialized: true,
  resave: true,
  rolling: true,
  cookie: { 
    secure: false,
    maxAge: 3600000,
    expires: new Date(Date.now() + 3600000),
    saveUninitialized: true
    },
  saveUninitialized: true,
}));

// Create a route for root - /
app.get("/", function (req, res) {
  res.redirect("/homepage");
});

//Defining a test route
app.get("/flat_buddies_test", function (req, res) {
  var sql = "select * from users";
  db.query(sql).then((results) => {
    // Send the results rows to the all-students template
    // The rows will be in a variable called data
    res.render("flat_buddies_test", { data: results });
  });
});


//Creating a route for homepage
app.get('/homepage', async (req, res) => {
  const reviewIds = ['2', '4', '3'];
  const reviewsData = [];

  // Fetch review details and associated user details
  for (const reviewId of reviewIds) {
    const review = await Review.getReviewById(reviewId);
    if (review) {
      const userId = review.user_id;
      const userProfile = new Profile(userId);
      await userProfile.getProfileDetails();

      reviewsData.push({
        name: userProfile.first_name + ' ' + userProfile.last_name,
        review: review.review,
        userId: userId
      });
    }
  }
  console.log('Review data:', reviewsData);
  res.render('homepage', { reviews: reviewsData });
});




/*app.get("/homepage_test", async function (req, res) {
  const review1 = await Review.getReviewDetails({ id: 5 });
  const review2 = await Review.getReviewDetails({ id: 11 });
  const review3 = await Review.getReviewDetails({ id: 10 });
  let review_id = req.query.review_id;
  let review1 = new Review (review_id);
  let review2 = new Review (review_id);
  let review3 = new Review (review_id);

  await review1.getReviewId([1]);
  await review2.getReviewId([3]);
  await review3.getReviewId([2]);
  
  res.render("homepage_test", {review1, review2, review3});
});*/

//Creating route for questionnaire page
app.get("/questionnaire", function (req, res) {
  req.session.touch()
  console.log("QUEST PAGE KNOWS",req.session.user_id)
  user_id = req.session.user_id
  res.render("questionnaire", {user_id:user_id});
});

//Creating route for an individual user page
app.get("/user_profile/:user_id", async function (req, res) {
  req.session.touch()
  let user_id = req.params.user_id;
  let user = new Profile(user_id)
  await user.getProfileDetails();
  await user.getPreferences();
  console.log(user);
  res.render("user_profile_oop", { user: user });
});


//This section submits the questionnaire form to the database
app.post('/submit_profile', async function (req, res) {
  req.session.touch()
  params = req.body;
  var user = new Profile(params.id);
  console.log("FORM KNOWS ID:", params.id)
  console.log(params)

  try {
    const result = await user.addProfileDetails(params.first_name, params.last_name, params.dob, params.job, params.gender, params.religion, params.politics, params.bio, params.nationality, params.id);
    console.log(params.location, params.age, params.noise, params['gender preference'], params['cleaning-style'],params.smoking, params.Alcohol, params.grocery,params['work-schedule'],params.pets, params['guest-policy'], params.religion_pref, params.politics_pref,params.country,params.id)
    const result2 = await user.addPreferences(params.location, params.age, params.noise, params['gender preference'], params['cleaning-style'],params.smoking, params.Alcohol, params.grocery,params['work-schedule'],params.pets, params['guest-policy'], params.religion_pref, params.politics_pref,params.country,params.id )
    req.session.touch()
    return res.redirect("/questionnaire");
  }
  catch (err) {
    return console.error(`Error while adding newuser `, err.message);
  }
  //res.redirect("/questionnaire");

});


//This section sends a chat buy updating the database
app.post('/send_chat', async function (req, res) {
  req.session.touch()
  params = req.body;
  console.log(params.chat, params.recipient_id, params.sender_id, params.timestamp)
  
  try {
    var sql = "INSERT INTO chats (message, sender_id, recipient_id, timestamp) VALUES (?, ? , ?, ?)";
    const result = await db.query(sql, [params.chat, params.sender_id, params.recipient_id, params.timestamp]);
    res.redirect("/chat/"+params.recipient_id);
  }
  catch (err) {
    console.error(`Error while adding chat `, err.message);
    res.send('error submitting');
  }
})

//This section submits a review by adding it to the database
app.post('/submit_review', async function (req, res) {
  req.session.touch()
  params = req.body;
  console.log(params.review_text, params.user_id, params.date)
  
  try {
    var sql = "INSERT INTO reviews (review, user_id, review_date) VALUES (?, ?, ?)";
    const result = await db.query(sql, [params.review_text, params.user_id, params.date]);
    req.session.touch()
    res.redirect("/profiles");
  }
  catch (err) {
    console.error(`Error while adding chat `, err.message);
    res.send('error submitting');
  }

});

 

//Creating a route for the page that shows a grid of profiles
app.get("/profiles", function (req, res) {
  req.session.touch()
  console.log("PROFILES PAGE KNOWS",req.session.user_id)
  user_id = req.session.user_id
  var sql = "select * from users where user_id != ? && user_id <=12";
  db.query(sql,[user_id]).then((results) => {
    // Send the results rows to the all-students template
    // The rows will be in a variable called data
    res.render("profiles", { data: results });
  });
});


//Creates a route for the chat page for each profile you are chatting with
app.get("/chat/:user_id", async function (req, res) {
  req.session.touch()
  console.log("CHAT PAGE KNOWS",req.session.user_id)
  user_id = req.session.user_id
  //user_id = 1
  let user = new Profile(user_id);
  //let other_user_id = req.params.user_id;
  let other_user = new Profile(req.params.user_id)
  console.log(user_id, other_user.user_id)
  //console.log(user.user_id, other_user.user_id)
  await user.getProfileDetails();
  //console.log(user)
  await other_user.getProfileDetails();
  //console.log(other_user)
  chats = await user.getChatFromOtherProfile(other_user.user_id);
  //console.log(chats)
  res.render("chat", {user:user, other_user:other_user, chats:chats});
  
});


app.get('/register', function (req, res) {
  res.render('register');
});

// Login
app.get('/login_test', function (req, res) {
  res.render('login_test');
});

app.get('/login_error', function (req, res) {
  res.render('login_error');
});


//Creates a route for the page that lists all the chats you have with people
app.get("/chat_list", async function(req, res) {
  req.session.touch()
  console.log("CHAT LIST PAGE KNOWS",req.session.user_id)
  user_id = req.session.user_id
  //user_id = 1
  //res.render('chat_list');
  let user = new Profile(user_id);
  await user.getProfileDetails();
  await user.getPreferences();
  await user.getChatList();
  console.log(user.chats)
  const the_chats = user.chats

  const people = []
  const other_users = []
  const other_users_chats = []

  for(let i = 0; i < the_chats.length; i++){

    
    if ((the_chats[i].sender_id.valueOf() != user.user_id.valueOf())&&((people.includes(the_chats[i].sender_id.valueOf()))==false)){
      let other_user = new Profile(the_chats[i].sender_id.valueOf())
      await other_user.getProfileDetails();
      other_chats = await user.getChatFromOtherProfile(other_user.user_id);
      other_users.push({profile:other_user, chats:other_chats})
      //other_users_chats.push(other_chats)
      people.push(the_chats[i].sender_id.valueOf())
      //console.log("ADDING: ",the_chats[i].sender_id.valueOf() )
    }
    if ((the_chats[i].recipient_id != user.user_id.valueOf())&&((people.includes(the_chats[i].recipient_id.valueOf()))==false)){
      let other_user = new Profile(the_chats[i].recipient_id.valueOf())
      await other_user.getProfileDetails();
      other_chats = await user.getChatFromOtherProfile(other_user.user_id);
      other_users.push({profile:other_user, chats:other_chats})
      people.push(the_chats[i].recipient_id.valueOf())
      //people.push(the_chats[i].recipient_id.valueOf())
      //console.log("ADDING: ",the_chats[i].recipient_id.valueOf() )
    }
  }
  console.log(other_users)

  

  res.render("chat_list", { user: user , other_users: other_users, other_users_chats });
});




//Create route for reviews page
app.get("/reviews", function(req, res) {
    req.session.touch()
    console.log("REVIEW PAGE KNOWS",req.session.user_id)
    user_id = req.session.user_id
    res.render('reviews',{user_id:user_id} );
});



//This section submits the setting password form from the register page
app.post('/set-password', async function (req, res) {
  params = req.body;
  var user = new User2(params.email);
  try {
      uId = await user.getIdFromEmail();
      if (uId) {
          // If a valid, existing user is found, set the password and redirect to the users single-student page
          await user.setUserPassword(params.password);
          res.redirect('/login_test');
          //console.log(req.session.user_id);
          //res.send('Password set successfully');
      }
      else {
          // If no existing user is found, add a new one
          newId = await user.addUser(params.password);
          res.send('/login_test');
      }
  } catch (err) {
      console.error(`Error while adding password `, err.message);
  }
});


//This section is completed with the login form 
app.post('/authenticate', async function (req, res) {
  params = req.body;
  var user = new User2(params.email);
  try {
      uId = await user.getIdFromEmail();
      if (uId) {
          match = await user.authenticate(params.password);
          if (match) {
              req.session.user_id = uId;
              req.session.loggedIn = true;
              // OPTIONAL: examine the session in the console
              console.log("THIS IS THE SESSION",req.session.user_id);
              //res.redirect('/user_profile/' + uId);
              res.redirect("/profiles")
          }
          else {
              // TODO improve the user journey here
              //res.send('invalid password');
              res.redirect('/login_error')
          }
      }
      else {
        res.redirect('/login_error')
      }
  } catch (err) {
      console.error(`Error while comparing `, err.message);
  }
});

// Logout
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login_test');
});


// Start server on port 3000
app.listen(3000, function () {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
