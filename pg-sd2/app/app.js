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
const { User } = require("./models/user");
const { User2 } = require("./models/user2");

const { Profile } = require("./models/profile");

//Get Chat Class
const { Chat } = require("./models/chat");

//Get Review Class
const { Review } = require("./models/review");

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

app.get("/flat_buddies_test", function (req, res) {
  var sql = "select * from users";
  db.query(sql).then((results) => {
    // Send the results rows to the all-students template
    // The rows will be in a variable called data
    res.render("flat_buddies_test", { data: results });
  });
});

/*app.get("/homepage_test", function (req, res) {
  res.render("homepage_test");
});*/

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

app.get("/questionnaire", function (req, res) {
  req.session.touch()
  console.log("QUEST PAGE KNOWS",req.session.user_id)
  user_id = req.session.user_id
  res.render("questionnaire", {user_id:user_id});
});

app.get("/user_profile/:user_id", async function (req, res) {
  req.session.touch()
  let user_id = req.params.user_id;
  //let user = new User(user_id);
  let user = new Profile(user_id)
  /*
  await user.getFirstName();
  await user.getLastName();
  await user.getDOB();
  await user.getGender();
  await user.getPolitics();
  await user.getReligion();
  await user.getCountry();
  await user.getBio();
  */
  await user.getProfileDetails();
  await user.getPreferences();
  //await user.getAge();
  console.log(user);
  //res.send(user);
  res.render("user_profile_oop", { user: user });
});

//Data for chat, added for Sprint4
/*
app.get("/chat", async function (req, res) {
  const chatData = {
    chat_id: "chat1",
    sender_id: "user1",
    recipient_id: "user2",
    timestamp: new Date(),
    message: "Hello, Bob!",
  };

  const chat = new Chat(
    chatData.chat_id,
    chatData.sender_id,
    chatData.recipient_id,
    chatData.timestamp,
    chatData.message
  );

  const senderName = await chat.getSenderName();
  const recipientName = await chat.getRecipientName();

  res.render("chat", { senderName, recipientName, chatData });
});
*/

//HANNAN Questionnaire

// app.post("/submit_profile", async function (req, res) {
//   try {
//     // Validate the submitted data (optional but recommended)
//     console.log("this is Body", req.body, "body end");
//     const Data = req.body; // Destructuring for cleaner access
//     if (!Data) {
//       throw new Error("Missing required field: note");
//     }

//     // Create a new user instance with the submitted data
//     const newUser = new User(Data); // Assuming 'id' is a unique identifier

//     // Save the new user to the database using await
//      const savedUser = await newUser.save();


//     if (!savedUser) {
//       throw new Error("Error saving user data");
//     }
//   } catch (err) {
//     console.error("Error creating profile:", err.message);
//     res.status(500).send("Internal server error"); // Informative error response to client
//   }
// });

// HANNAN QUESTIONNAIRE PAGE

// error-message This page was not restored from back/forward cache because a content script from the extension with ID nkbihfbeogaeaoehlefnkodbefgpgknn received a message while the page was cached. This behavior will change shortly which may break the extension. If you are the developer of the extension, see https://developer.chrome.com/blog/bfcache-extension-messaging-changes.

// app.post("/submit_profile", async function (req, res) {
//   try {
//     // Validate the submitted data
//     const { first_name, last_name, dob, gender, religion, politics, bio, country, job } = console.Console.log( req.body);
//     if (!first_name || !last_name || !dob || !gender || !religion || !politics || !bio || !country || !job) {
//       throw new Error("Missing required fields");
//     }

//     // Create a new user instance with the submitted data
//     const newUser = new User({
//       first_name,
//       last_name,
//       dob,
//       gender,
//       religion,
//       politics,
//       bio,
//       country,
//       job
//     });

//     // Save the new user to the database
//     const savedUser = await newUser.save();

//     if (!savedUser) {
//       throw new Error("Error saving user data");
//     }

//     res.status(200).send("User profile saved successfully");
//   } catch (err) {
//     console.error("Error creating profile:", err.message);
//     res.status(500).send("Internal server error");
//   }
// });



// ??? code
/*
app.post("/submit_profile", async function (req, res) {
  try {
      console.log("Submitted Profile Data:", req.body); // Log the submitted profile data

      // Validate the submitted data
      const requiredFields = ['first_name', 'last_name', 'bio']; // Define required fields
      for (const field of requiredFields) {
          if (!req.body[field]) {
              throw new Error(`Missing required field: ${field}`);
          }
      }

      // Create a new user instance with the submitted data
      const newUser = new User();

      // Assign values to user instance properties
      newUser.first_name = req.body.first_name;
      newUser.last_name = req.body.last_name;
      newUser.bio = req.body.bio;


      res.status(200).send("User profile saved successfully");
  } catch (err) {
      console.error("Error creating profile:", err.message);
      res.status(500).send("Internal server error");
  }
});
*/


app.post('/submit_profile', async function (req, res) {
  req.session.touch()
  params = req.body;
  var user = new Profile(params.id);
  console.log("FORM KNOWS ID:", params.id)
  console.log(params)
  //res.send('The user is', user);

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

  //var user = new Profile(params.id);
  //console.log("FORM KNOWS ID:", params.id)
  //console.log(params)
  //res.send('The user is', user);
  /*
  try {
    await user.addProfileDetails(params.first_name, params.last_name, params.dob, params.job, params.gender, params.religion, params.politics, params.bio, params.nationality, params.id);
    res.send('form submitted');
  }
  catch (err) {
    console.error(`Error while adding newuser `, err.message);
  }
  */
  //res.send('form submitted');



  // Hannan Reviews Form Setup

/*
  app.post("/submit_review", async function (req, res) {
    try {
        console.log("Review Submitted:", req.body); // Log the submitted review data

        // Validate the submitted data
        const requiredFields = ['review-text']; // Define required fields
        for (const field of requiredFields) {
            if (!req.body[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

    

        res.status(200).send("Review submitted successfully");
    } catch (err) {
        console.error("Error submitting review:", err.message);
        res.status(500).send("Internal server error");
    }
});
*/

  // Define the route for submitting reviews
/*app.post("/submit_review", async function (req, res) {
  try {
    console.log("Received review data:", req.body);
    
    // Validate the submitted data
    const requiredFields = ['user_id', 'rating', 'comment']; // Define required fields for a review
    for (const field of requiredFields) {
      if (!req.body[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Create a new review instance with the submitted data
    const newReview = new Review(req.body);

    // Save the new review to the database
    const savedReview = await newReview.save();
    
    if (!savedReview) {
      throw new Error("Error saving review data");
    }

    res.status(200).send("Review submitted successfully");
  } catch (err) {
    console.error("Error submitting review:", err.message);
    res.status(500).send("Internal server error");
  }
});*/
  

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

app.get("/login", function (req, res) {
  res.render("login");
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

app.get("/user_profile/test/:user_id", async function (req, res) {
  let user_id = req.params.user_id;
  let user = new Profile(user_id);
  /*
  await user.getFirstName();
  await user.getLastName();
  await user.getDOB();
  await user.getGender();
  await user.getPolitics();
  await user.getReligion();
  await user.getCountry();
  await user.getBio();
  */
  await user.getProfileDetails()
  await user.getPreferences();
  //await user.getAge();
  console.log(user);
  //res.send(user);
  res.render("user_profile_post", { user: user });
});

app.get("/homepage_test", function (req, res) {
  res.render("homepage_test");
});

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
  //the_chats.sort(function(a, b){return a.timestamp - b.timestamp});
  //console.log(the_chats)
  const people = []
  const other_users = []
  const other_users_chats = []
  //console.log(user.user_id)
  for(let i = 0; i < the_chats.length; i++){
    //console.log(the_chats[i].sender_id, the_chats[i].recipient_id, user.user_id)
    //console.log(the_chats[i].sender_id.valueOf(),(the_chats[i].sender_id.valueOf() in people))
    /*
    if (the_chats[i].sender_id.valueOf() != user.user_id.valueOf()){
      console.log("This number is not the current user.")
    }
    if ((the_chats[i].sender_id.valueOf in people)==false){
      console.log("This number is not in the list so far.", the_chats[i].sender_id.valueOf(), people.includes('2') )
    }
    */
    
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

app.get("/chat_list/:user_id", async function(req, res) {
  req.session.touch()
  let user_id = req.params.user_id;
  let user = new Profile(user_id);
  await user.getProfileDetails();
  await user.getPreferences();
  await user.getChatList();
  console.log(user.chats)
  const the_chats = user.chats
  the_chats.sort(function(a, b){return a.timestamp - b.timestamp});
  //console.log(the_chats)
  const people = []
  const other_users = []
  //console.log(user.user_id)
  for(let i = 0; i < the_chats.length; i++){
    //console.log(the_chats[i].sender_id, the_chats[i].recipient_id, user.user_id)
    //console.log(the_chats[i].sender_id.valueOf(),(the_chats[i].sender_id.valueOf() in people))
    /*
    if (the_chats[i].sender_id.valueOf() != user.user_id.valueOf()){
      console.log("This number is not the current user.")
    }
    if ((the_chats[i].sender_id.valueOf in people)==false){
      console.log("This number is not in the list so far.", the_chats[i].sender_id.valueOf(), people.includes('2') )
    }
    */
    
    if ((the_chats[i].sender_id.valueOf() != user.user_id.valueOf())&&((people.includes(the_chats[i].sender_id.valueOf()))==false)){
      let other_user = new Profile(the_chats[i].sender_id.valueOf())
      await other_user.getProfileDetails();
      other_users.push(other_user)
      people.push(the_chats[i].sender_id.valueOf())
      //console.log("ADDING: ",the_chats[i].sender_id.valueOf() )
    }
    if ((the_chats[i].recipient_id != user.user_id.valueOf())&&((people.includes(the_chats[i].recipient_id.valueOf()))==false)){
      let other_user = new Profile(the_chats[i].recipient_id.valueOf())
      await other_user.getProfileDetails();
      other_users.push(other_user)
      people.push(the_chats[i].recipient_id.valueOf())
      //people.push(the_chats[i].recipient_id.valueOf())
      //console.log("ADDING: ",the_chats[i].recipient_id.valueOf() )
    }
    
    
  }
  console.log(people)
  res.render("chat_list", { user: user , other_users: other_users, the_chats:the_chats });
});

/*app.get("/reviews", async (req, res) => {
  const user_id = await fetchUserById(req.params.user_id);
  res.render("reviews", { user_id });
});*/

app.get("/reviews", function(req, res) {
    req.session.touch()
    console.log("REVIEW PAGE KNOWS",req.session.user_id)
    user_id = req.session.user_id
    res.render('reviews',{user_id:user_id} );
});

//The line below is just incase we connect this to an HTML form
//app.use(bodyParser.urlencoded({ extended: true }));

//The following will be connected when handling form submission
/*app.post("/reviews", async(req, res) => {
    const { review, date, user_id } = req.body;
    await Review.newReview(review, date, user_id);
    res.send('Thank you for your review!');
});*/

app.post('/add-bio', async function (req, res) {
  params = req.body;
  var user = new User(params.id);
  try {
    await user.addBio(params.bio);
    res.send('form submitted');
   }
   catch (err) {
       console.error(`Error while adding bio `, err.message);
   }
   res.send('form submitted');
});


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
